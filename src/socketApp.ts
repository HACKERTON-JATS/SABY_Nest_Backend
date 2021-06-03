import { NextFunction } from "express";
import { Server } from "socket.io";
import { config } from "./config";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { TokenPayload } from "./shared/TokenPayloadInterface";
import { UnAuthorizedTokenError, GoneError } from "./shared/exception";
import { ChatService } from "./service/chat.service";
import { UserService } from "./service/user.service";
import SocketTypes from "./shared/DataTransferObject";
import Payload from "./shared/DataTransferObject";
import { UserRepository } from "./entity/entity-repository/userRepository";
import { ChatRepository } from "./entity/entity-repository/chatRepository";
import { RoomRepository } from "./entity/entity-repository/roomRepository";
import { AdminRepository } from "./entity/entity-repository/adminRepository";

export default class SocketApp {
    private chatService: ChatService = new ChatService(
        ChatRepository.getQueryRepository(),
        RoomRepository.getQueryRepository(),
        UserRepository.getQueryRepository(),
        AdminRepository.getQueryRepository()
    );

    public async start(io: Server) {
        io.use(async (socket: SocketTypes | any, next: NextFunction | any) => {
            try {
                const token: string = socket.handshake.query.token;
                const splitToken = token.split(' ');
                if (splitToken[0] !== "Bearer") {
                    throw new UnAuthorizedTokenError();
                }
                jwt.verify(
                    splitToken[1],
                    config.jwtSecret,
                    (err: Error, payload: Payload) => {
                        socket.userId = payload.id;
                        socket.nickname = payload.nickname;
                        next();
                    }
                );
            } catch (err) {
                if (err instanceof TokenExpiredError) {
                    throw new GoneError();
                }
                next(err);
            }
        });

        io.on('connect', (socket: SocketTypes) => {
            console.log('connect: ' + socket.userId);

            socket.on("makeRoom", async () => {
                const roomId = await this.chatService.makeRoom(socket.userId);

                await socket.join(roomId);
                socket.currentRoom = roomId;
                console.log(`${socket.nickname} make room ${roomId}`);
            });

            socket.on("joinRoom", async () => {
                
            })
        })
    }
}