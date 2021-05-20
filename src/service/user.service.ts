import { User } from "src/entity/model";
import nodemailer from "nodemailer";
import crypto from "crypto";
import redis from "redis";
import { UserRepository } from "../entity/entity-repository/userRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) { }
    
    private client = redis.createClient(6379, "127.0.0.1");

    public async checkEmail(email: string): Promise<boolean> {
        const checkEmail: User = await this.userRepository.findOne({
            where: { email: email }
        });

        return !checkEmail;   // email이 존재하면 false를 반환
    }

    public async checkCode(code: string): Promise<boolean> {
        const checkCode: string = this.client.get("verifyCode", function (err, data) {
            console.log(data.toString());
            return JSON.parse(data);
        });
        if(checkCode === code) {
            return true;    // code가 일치하면 true를 반환
        } else {
            return false;
        }
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
                from: `"SABY TEAM <${process.env.NODEMAILER_USER}>`,
                to: email,
                subject: 'SABY Auth Number',
                text: code,
                html: `<b>${code}</b>`,
            });
    
            console.log('Message send: %s', info.messageId);

            this.client.set("verifyCode", code);
            this.client.expire(code, 60 * 3);        
        }
        catch (err) {
                console.log(err);
            }
        }
}