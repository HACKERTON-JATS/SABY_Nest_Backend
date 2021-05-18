import { User } from "src/entity/model";
import { UserRepository } from "../entity/entity-repository/userRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }

    public async createUser(user: User): Promise<void> {
         
    }

    public async checkOverlap(email: string): Promise<boolean> {
        const emails: string[] = await this.userRepository.selectEmail();
        for(let i = 0; i < emails.length; i++) {
            if(emails[i] === email) {
                return false;
            }
        }
        return true;
    }
}