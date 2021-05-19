import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../model/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    static getQueryRepository() {
        return getCustomRepository(UserRepository)
    }

    public async createUser(user: User): Promise<User> {
        const newUser: User = new User();
        newUser.nickname = user.nickname;
        return this.manager.save(newUser);
    }
}