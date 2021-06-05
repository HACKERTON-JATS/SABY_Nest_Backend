import "reflect-metadata";
import * as path from "path";
import * as dotenv from "dotenv";
import { logger } from "./shared/logger";
import { initApplication } from "./loader";

dotenv.config({ path: path.join(__dirname, "../.env") });

initApplication()
    .catch((err) => {
        console.error("server start failed");
        console.log(err);
    });

process.on("uncaughtException", (err: Error) => {
    console.error(err);
    logger.error("uncaughtException");
    logger.error(err);
})