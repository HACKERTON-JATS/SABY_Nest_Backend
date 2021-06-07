import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Chat } from ".";
import { Admin } from "./admin";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from "./user";

@Entity("room_tbl")
export class Room extends EntityWithIdColumn {
    @JoinColumn({ name: "admin_code"})
    @ManyToOne(() => Admin, admin => admin.rooms)
    admin: Admin;

    @JoinColumn({ name: "user_id" })
    @OneToOne(() => User, user => user.room)
    user: User;

    @OneToMany(() => Chat, chat => chat.room)
    chats: Chat[];
}