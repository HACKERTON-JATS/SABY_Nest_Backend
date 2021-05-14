import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Room } from "./room";

@Entity("admin_tbl")
export class Admin {
    @PrimaryColumn({ type: "varchar", length: 20, default: "code123" })
    @OneToMany(() => Room, room => room.admin_code)
    code: string;
}