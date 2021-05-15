import { ConnectionOptions } from "typeorm";
import { config } from "./config";
import { Admin, Chat, kidInformation, Reservation, Room, User } from "./entity/model";

export const createOptions: ConnectionOptions = {
    type: "mysql",
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    synchronize: config.dbSynchronize,
    logging: config.dbLogging,
    entities: [
        Admin, Chat, kidInformation, Reservation, Room, User
    ]
}