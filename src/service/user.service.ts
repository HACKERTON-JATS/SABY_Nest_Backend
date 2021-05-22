import { User } from "src/entity/model";
import nodemailer from "nodemailer";
import crypto from "crypto";
import redis from "redis";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError } from "../shared/exception";
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

    public async checkVerifyCode(code: string): Promise<string> {
        this.client.get("verifyCode", function (err, data) {
            console.log(data);
            this.verifyCode = data;
        });

        if(this.verifyCode === code) {
            return "correct";    
        } else if(this.verifyCode === undefined) {
            return "done";   
        } else {
            return "unlike";
        }
    }

    public async overlapId(id: string): Promise<boolean> {
        const checkId: User = await this.userRepository.findOne({
            where: { id: id }
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
        try {
            await this.userRepository.manager.save(user);
        } catch(err) {
            console.log(err);
            throw new err;       // exception 로직으로 수정
        }
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
                throw new err;     // exception 로직으로 수정
            }
        }

    public async issuanceToken(user_id: string): Promise<string> {
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
            where: { user_id: user.id }
        });

        if(!existUser) {
            throw new BadRequestError();
        }

        const isMatch = await bcrypt.compare(user.password, existUser.password);

        if(isMatch) {
            return { 
                  "access_token": await this.issuanceToken(existUser.user_id)
            };
        } else {
            throw new BadRequestError();
        }
    }
}