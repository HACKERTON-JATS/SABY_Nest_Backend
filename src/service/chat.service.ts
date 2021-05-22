import { ChatRepository } from "../entity/entity-repository/chatRepository";
import { Chat } from "../entity/model/chat";
import socketio from "socket.io";

export class ChatService {
    constructor(
        private chatRepository: ChatRepository
    ) { }

    
}