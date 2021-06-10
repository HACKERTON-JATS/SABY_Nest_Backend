import { User } from "src/entity/model";
import * as nodemailer from "nodemailer";
import * as crypto from "crypto";
import * as redis from "redis";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { BadRequestError, NotFoundError } from "../shared/exception";
import { config } from "../config";
import { UserRepository } from "../entity/entity-repository/userRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) { }
    
    private client = redis.createClient(6379, "127.0.0.1");
    private verifyCode: string;
    public async overlapEmail(email: string): Promise<boolean> {
        const checkEmail: User = await this.userRepository.findOne({
            where: { email: email }
        });

        return !checkEmail;   // email이 존재하면 false를 반환
    }

    public async overlapId(user_id: string): Promise<boolean> {
        const checkId: User = await this.userRepository.findOne({
            where: { user_id: user_id }
        })

        return !checkId;   // id가 존재하면 false를 반환
    }

    public async overlapNickname(nickname: string): Promise<boolean> {
        const checkNickname: User = await this.userRepository.findOne({
            where: { nickname: nickname }
        })

        return !checkNickname;   // nickname이 존재하면 false를 반환
    }

    public async createUser(user: User): Promise<void> {
        const hashPassword = await bcrypt.hash(user.password, 12);
        user.password = hashPassword;
        await this.userRepository.createUser(user);
    }

    public async sendCode(email: string): Promise<void> {
        try {
            const code = crypto.randomBytes(3).toString('hex');

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'stmp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: `TEAM JATS ${process.env.NODEMAILER_USER}`,
                to: email,
                subject: 'SABY Auth Number',
                text: code,
                html: `<b>${code}</b>`,
            });
            
            console.log('Message send: %s', info.messageId);

            transporter.close();

            this.client.set("verifyCode", code, function (err, data) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
            this.client.expire("verifyCode", 60);
        }
        catch (err) {
                console.log(err);
                throw new err;     
            }
        }

    public async issuanceToken(user_id: number): Promise<string> {
        return jwt.sign({
            sub: `${user_id}`,
            type: "access",
        }, config.jwtSecret, {
            algorithm: "HS256",
            expiresIn: "2h",
        });
    }

    public async login(user: User) {    
        const existUser = await this.userRepository.findOne({
            where: { user_id: user.user_id }
        });

        if(!existUser) {
            throw new NotFoundError('존재하지 않는 아이디입니다.');
        }
        const isCorrect = await bcrypt.compare(user.password, existUser.password)
        if(!isCorrect) {
            throw new BadRequestError("비밀번호가 일치하지 않습니다.");
        }
        return { 
            "access_token": await this.issuanceToken(existUser.id)
      };
    }

    public async getNickname(userId: number): Promise<string> {
        const nickname = await this.userRepository.getNickname(userId);
        return nickname;
    }
}   