import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Chat } from "./chat";
import { Room } from "./room";

@Entity("admin_tbl")
export class Admin {
    @PrimaryColumn({ type: "varchar", length: 20, default: "code123"})
    code: string;

    @OneToMany(() => Room, room => room.admin)
    rooms: Room[];
}