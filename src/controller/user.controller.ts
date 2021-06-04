import { UserRepository } from "../entity/entity-repository/userRepository";
import { UserService } from "../service/user.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";

export class UserController {
    private userService: UserService = new UserService(
        UserRepository.getQueryRepository()
    );

    public overlapEmail: BusinessLogic = async (req, res, next) => {
        if(!await this.userService.overlapEmail(req.body.email)) {
            res.status(200).json({
                message: "pass"
            });
        } else {
            res.status(400).json({
                message: "이미 가입된 이메일입니다."
            })
        }
    }

    public checkVerifyCode: BusinessLogic = async (req, res, next) => {
        const code = await this.userService.checkVerifyCode(req.body.code);
        if(code === "correct") {
            res.status(200).json({
                message: "correct"
            })
        } else if(code === "done") {
            res.status(410).json({
                message: "done"
            })
        } else {
            res.status(400).json({
                message: "unlike"
            })
        }
    }

    public overlapId: BusinessLogic = async (req, res, next) => {
        if(!await this.userService.overlapId(req.body.id)) {
            res.status(200).json({
                message: "pass"
            })
        } else {
            res.status(400).json({
                message: "이미 가입된 아이디입니다."
            })
        }
    }

    public overlapNickname: BusinessLogic = async (req, res, next) => {
        if(!await this.userService.overlapNickname(req.body.nickname)) {
            res.status(200).json({
                message: "pass"
            })
        } else {
            res.status(400).json({
                message: "이미 가입된 닉네임입니다."
            })
        }
    }

    public createUser: BusinessLogic = async (req, res, next) => {
        await this.userService.createUser(req.body);
        res.status(200).json({
            message: "success"
        })
    }

    public sendCode: BusinessLogic = async (req, res, next) => {
        await this.userService.sendCode(req.email);
        res.status(200).json({
            message: "success"
        })
    }

    public login: BusinessLogic = async (req, res, next) => {
        await this.userService.login(req.body);
        res.status(200).json({
            message: "success"
        })
    }

    public logout: BusinessLogic = async (req, res, next) => {
        res.status(200).json({
            message: "success"
        })
    }
}