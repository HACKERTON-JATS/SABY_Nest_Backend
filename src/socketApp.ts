import { NextFunction } from "express";
import { Server } from "socket.io";
import { config } from "./config";
import { HttpError } from "./shared/exception";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { TokenPayload } from "./shared/TokenPayloadInterface";
import { ChatService } from "./service/chat.service";
import { UserService } from "./service/user.service";
import SocketTypes from "./shared/DataTransferObject";
import { UserRepository } from "./entity/entity-repository/userRepository";
import { ChatRepository } from "./entity/entity-repository/chatRepository";
import { RoomRepository } from "./entity/entity-repository/roomRepository";

export default class SocketApp {
    private socketService: ChatService = new ChatService(
        ChatRepository.getQueryRepository(),
        RoomRepository.getQueryRepository(),
        UserRepository.getQueryRepository()
    );
    
    
}