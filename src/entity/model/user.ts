import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Reservation } from "./reservation";
import { Room } from "./room";

@Entity("user_tbl")
export class User extends EntityWithIdColumn{
    @Column({ type: "varchar", length: 50 })
    email: string;

    @Column({ type: "varchar", length: 50 })
    password: string;

    @Column({ type: "varchar", length: 8 })
    nickname: string;

    @OneToOne(() => Room, room => room.user_id)
    room: Room;

    @OneToMany(() => Chat, chat => chat.user_id)
    chats: Chat[];

    @OneToMany(() => Reservation, reservation => reservation.user_id)
    reservations: Reservation[];
}