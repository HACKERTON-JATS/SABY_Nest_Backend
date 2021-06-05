import { UserRepository } from "../entity/entity-repository/userRepository";
import { UserService } from "../service/user.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as redis from "redis";

export class UserController {
    private userService: UserService = new UserService(
        UserRepository.getQueryRepository()
    );
    private client = redis.createClient(6379, "127.0.0.1");

    public overlapEmail: BusinessLogic = async (req, res, next) => {
        if(await this.userService.overlapEmail(req.body.email)) {
            res.status(200).json({
                message: "pass"
            });
        } else {
            res.status(409).json({
                message: "이미 가입된 이메일입니다."
            })
        }
    }

    public checkVerifyCode: BusinessLogic = async (req, res, next) => {
        this.client.get("verifyCode", async function (err, data) {
            if(err) {
                res.status(400);
            }
            if(req.body.code === data) {
                res.status(200).json({
                    message: "correct"
                });
            } else if(data === null) {
                res.status(410).json({
                    message: "done"
                });
            } else {
                res.status(409).json({
                    message: "unlike"
                });
            }
        });
    }

    public overlapId: BusinessLogic = async (req, res, next) => {
        if(await this.userService.overlapId(req.body.user_id)) {
            res.status(200).json({
                message: "pass"
            })
        } else {
            res.status(409).json({
                message: "이미 가입된 아이디입니다."
            })
        }
    }

    public overlapNickname: BusinessLogic = async (req, res, next) => {
        if(await this.userService.overlapNickname(req.body.nickname)) {
            res.status(200).json({
                message: "pass"
            })
        } else {
            res.status(409).json({
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
        await this.userService.sendCode(req.body.email);
        res.status(200).json({
            message: "success"
        })
    }

    public login: BusinessLogic = async (req, res, next) => {
        const token = await this.userService.login(req.body);
        res.status(200).json({
            message: "success",
            token
        })
    }

    public logout: BusinessLogic = async (req, res, next) => {
        res.status(200).json({
            message: "success"
        })
    }
}