import { UserSignup } from "src/shared/DataTransferObject";
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

    public async createUser(user: UserSignup): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .values([
                { 
                    user_id: user.user_id,
                    password: user.password,
                    email: user.email,
                    nickname: user.nickname
                }
            ])
            .execute()
    }
}