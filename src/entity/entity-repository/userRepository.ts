import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../model/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    static getQueryRepository() {
        return getCustomRepository(UserRepository)
    }

    public async getNickname(userId: number): Promise<string> {
        return this.createQueryBuilder("user")
            .select("user.nickname", "nickname")
            .where("user.id = :id", { id: userId })
            .getRawOne()
    }
}