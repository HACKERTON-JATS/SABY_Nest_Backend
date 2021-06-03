import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Room } from "../model/room";

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {

    static getQueryRepository() {
        return getCustomRepository(RoomRepository);
    }

    public async createRoom(room: Room): Promise<void> {
        await this.createQueryBuilder("room")
            .insert()
            .values([
                {
                    admin: room.admin,
                    user: room.user
                }
            ])
            .execute()
    }
}