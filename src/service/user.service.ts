import { User } from "src/entity/model";
import { UserRepository } from "../entity/entity-repository/userRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }

    public async checkEmail(email: string): Promise<boolean> {
        const checkEmail: User = await this.userRepository.findOne({
            where: { email: email }
        });

        return !checkEmail;   // email이 존재하면 false를 반환
    }

    public async checkCode(code: string): Promise<boolean> {
        const checkCode: User = await this.userRepository.findOne({
            // 인증 코드 확인 구현
        })

        return !checkCode;
    }

    public async checkId(id: string): Promise<boolean> {
        const checkId: User = await this.userRepository.findOne({
            where: { id: id }
        })

            return !checkId;   // id가 존재하면 false를 반환
    }

    public async checkNickname(nickname: string): Promise<boolean> {
        const checkNickname: User = await this.userRepository.findOne({
            where: { nickname: nickname }                      
        })

        return !checkNickname;   // nickname이 존재하면 false를 반환
    }

    public async createUser(user: User): Promise<void> {
        await this.userRepository.manager.save(user);
    }
}