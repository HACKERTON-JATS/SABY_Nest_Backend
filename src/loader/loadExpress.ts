import * as fs from "fs";
import { NextFunction, Request, Response, Application } from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as cors from "cors";
import * as redis from "redis";
import { Server } from "socket.io";
import SocketApp from "../socketApp";
import { config } from "../config";
import { HttpError, NotFoundError } from "../shared/exception";
import { sabyRouter } from "../router";
import { logger } from "../shared/logger";

export const loadExpress = (app: Application) => {
    app.set("port", config.ServicePort || "3000");

    app.use(morgan("combined", {
        stream: fs.createWriteStream("./logs/log.log", { encoding: "utf8" }),
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.use("/", sabyRouter());
    
    const client = redis.createClient(6379, "127.0.0.1");

    client.on("error", function (err) {
        console.log("Error " + err);
    })
    
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError(req.url));
    });

    app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        logger.info(err.message);
        const statusCode: number = err.statusCode || 500;
        res.status(statusCode)
        .json({
            statusCode: statusCode,
            message: err.message,
            timeStamp: new Date(),
        });  
    });

    const server = app.listen(app.get("port"), () => {
        console.log("server on", app.get("port"));
        socketServer();
    });

    const socketServer = () => {
        const socketApp = new SocketApp();
        const io = new Server(server, {
            cors: {
                origin: "*",
            }
        });
        socketApp.start(io);
    }
}