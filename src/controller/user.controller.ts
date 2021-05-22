import { User } from "../entity/model";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { UserService } from "../service/user.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { BadRequestError } from "../shared/exception";

export class UserController {
    private userService: UserService = new UserService(
        UserRepository.getQueryRepository()
    );

    public overlapEmail: BusinessLogic = async (req, res, next) => {
        await this.userService.overlapEmail(req.body.email);
        
    }

    public 
}