import * as Joi from "joi";
import { Socket } from "socket.io";

export default interface SocketTypes extends Socket {
    userId?: number;
    nickname?: string;
    currentRoom?: string;
}

export default interface Payload extends Object {
    [key: string]: any
}

export class UserEmail {
    email: string;
}

export class UserId {
    user_id: string;
}

export class UserNickname {
    nickname: string;
}

export class UserVerifyCode {
    code: string;
}

export class UserSignup {
    user_id: string;
    password: string;
    nickname: string;
    email: string;
}

export class UserLogin {
    user_id: string;
    password: string;
}

export const UserEamilSchema: Joi.ObjectSchema<UserEmail> = Joi.object().keys({
    email: Joi.string().required()
});

export const UserIdSchema: Joi.ObjectSchema<UserId> = Joi.object().keys({
    id: Joi.string().required()
});

export const UserNicknameSchema: Joi.ObjectSchema<UserNickname> = Joi.object().keys({
    nickname: Joi.string().required()
});

export const UserVerifyCodeSchema: Joi.ObjectSchema<UserVerifyCode> = Joi.object().keys({
    code: Joi.string().required()
});

export const UserSignupSchema: Joi.ObjectSchema<UserSignup> = Joi.object().keys({
    user_id: Joi.string().required(),
    password: Joi.string().required(),
    nickname: Joi.string().required(),
    email: Joi.string().required()
})

export const UserLoginSchema: Joi.ObjectSchema<UserLogin> = Joi.object().keys({
    user_id: Joi.string().required(),
    password: Joi.string().required()
})
