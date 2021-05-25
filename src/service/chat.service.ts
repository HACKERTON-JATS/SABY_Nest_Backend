import { ChatRepository } from "../entity/entity-repository/chatRepository";
import { RoomRepository } from "../entity/entity-repository/roomRepository";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { Chat } from "../entity/model";

export class ChatService {
    constructor(
        private chatRepository: ChatRepository,
        private roomRepository: RoomRepository,
        private userRepository: UserRepository
    ) { }

    public async sendMessage(msg: string, user_id: number, room_id: string): Promise<string> {
        const user = await this.userRepository.findOne(user_id);
        const room = await this.roomRepository.find({
            where: { id: room_id }
        });
        const newChat = await this.chatRepository.create({
            message: msg,
            user_id: user,
            room_id: room 
        })
    }
}