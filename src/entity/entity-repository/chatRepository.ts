import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Chat } from "../model/chat";

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {

    static getQueryRepository() {
        return getCustomRepository(ChatRepository);
    }

    public async viewMessage(room_id: number): Promise<Chat[]> {
        return this.createQueryBuilder("chat")
            .select("chat.message", "message")
            .addSelect("chat.created_at", "created_at")
            .orderBy("DESC")
            .where("chat.room_id = :id", { id: room_id })
            .getMany();
    }

    public async sendMessage(chat: Chat): Promise<void> {
        await this.createQueryBuilder("chat")
            .insert()
            .values([
                { message: chat.message }
            ])
            .execute()
    }
}