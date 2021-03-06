import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Room } from "./room";
import { User } from "./user";

@Entity("chat_tbl")
export class Chat extends EntityWithIdColumn {
    @Column({ type: "varchar", length: 512})
    message: string;

    @Column({ type: "datetime"})
    created_at: Date;

    @JoinColumn({ name: "room_id" })
    @ManyToOne(() => Room, room => room.chats)
    room: Room;

    @JoinColumn({ name: "user_id"})
    @ManyToOne(() => User, user => user.chats)
    user: User;

    @Column({ type: "tinyint" })
    is_admin: boolean
}