import { NextFunction } from "express";
import { Server } from "socket.io";
import { config } from "./config";
import jwt, { TokenExpiredError } from "jsonwebtoken";
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
    private userService: UserService = new UserService(
        UserRepository.getQueryRepository()
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
                        next();
                    }
                );
                const nickname: string = await this.userService.getNickname(socket.userId);
                socket.nickname = nickname;
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

            socket.on("joinRoom", async (roomId) => {
                await socket.join(roomId);
                const chat = await this.chatService.joinRoom(roomId);
                socket.currentRoom = roomId;
                console.log(`${socket.nickname} join room ${roomId}`);
                socket.broadcast.to(socket.currentRoom).emit('joinRoom', chat);
            });

            socket.on("leaveRoom", async (roomId) => {
                console.log(`${socket.nickname} is leave room ${socket.currentRoom}`);
                socket.leave(socket.currentRoom);
                socket.broadcast.to(socket.currentRoom).emit("leaveRoom", socket.nickname);
                await this.chatService.deleteRoom(roomId);
            });

            socket.on('sendMessage', async (msg: string) => {
                const newChat = await this.chatService.sendMessage(
                    msg,
                    socket.userId,
                    socket.currentRoom
                );
                socket.broadcast
                    .in(socket.currentRoom)
                    .emit("receiveMessage", msg, socket.nickname);
                console.log(`${socket.nickname}: ${newChat}`);
            });

            socket.on("disconnect", () => {
                socket.in(socket.currentRoom).emit("leaveRoom", socket.nickname);
                socket.leave(socket.currentRoom);
            })
        })
    }
}