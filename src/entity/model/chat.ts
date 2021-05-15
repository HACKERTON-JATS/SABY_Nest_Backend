import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
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
    @OneToMany(() => Room, room => room.id)
    room_id: Room;

    @JoinColumn({ name: "user_id"})
    @OneToMany(() => User, user => user.id)
    user_id: User;
}