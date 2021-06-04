import { ChatRepository } from "../entity/entity-repository/chatRepository";
import { RoomRepository } from "../entity/entity-repository/roomRepository";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { AdminRepository } from "../entity/entity-repository/adminRepository";
import { BadRequestError } from "../shared/exception";
import { Chat, Room } from "src/entity/model";

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
        if (existRoom) {
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

    public async getUserList(): Promise<Room[]> {
        const rooms = await this.roomRepository.find({});
        return rooms;
    }

    public async joinRoom(roomId: number): Promise<Chat[]> {
        const room = await this.roomRepository.findOne({
            where: { id: roomId }
        });
        if (!room) {
            throw new BadRequestError('존재하지 않는 방입니다.');
        }
        const chats = await this.chatRepository.find({
            where: { room: roomId },
            order: {
                id: "DESC"
            }
        });

        return chats;
    }

    public async deleteRoom(roomId: number): Promise<void> {
        const room = await this.roomRepository.findOne({
            where: { id: roomId }
        });
        const chat = await this.chatRepository.find({
            where: { id: roomId }
        });
        if(!room) {
            throw new BadRequestError('존재하지 않는 방입니다.');
        }
        await this.roomRepository.remove(room);
        await this.chatRepository.remove(chat);
    }
}