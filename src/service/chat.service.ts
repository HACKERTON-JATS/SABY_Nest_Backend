import { ChatRepository } from "../entity/entity-repository/chatRepository";
import { RoomRepository } from "../entity/entity-repository/roomRepository";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { AdminRepository } from "../entity/entity-repository/adminRepository";
import { BadRequestError } from "../shared/exception";

export class ChatService {
    constructor(
        private chatRepository: ChatRepository,
        private roomRepository: RoomRepository,
        private userRepository: UserRepository,
        private adminRepository: AdminRepository                                                                                                                                                                                                                                                                                                                 
    ) { }

    public async makeRoom(userId: number): Promise<string> {
        const existRoom = await this.roomRepository.findOne({
            where: { user: userId }
        });
        if(existRoom) {
            throw new BadRequestError('더 이상 방을 만들 수 없습니다.');
        }
        const user = await this.userRepository.findOne(userId);
        const admin = await this.adminRepository.findOne();
        const newRoom = this.roomRepository.create({
            user: user,
            admin: admin
        });
        await this.roomRepository.save(newRoom);
        return String(newRoom.id);
    }

    public async sendMessage(msg: string, userId: number, roomId: string): Promise<string> {
        const user = await this.userRepository.findOne(userId);
        const room = await this.roomRepository.findOne(roomId);
        const newChat = this.chatRepository.create({
            message: msg,
            user: user,
            room: room
        });
        await this.chatRepository.save(newChat);

        return newChat.message;
    }

    public async getList() {
        const 
    }
}