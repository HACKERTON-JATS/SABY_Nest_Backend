import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Admin } from "./admin";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from "./user";

@Entity("room_tbl")
export class Room extends EntityWithIdColumn {
    @PrimaryColumn()
    @ManyToOne(() => Admin, admin => admin.code)
    @JoinColumn({ name: "admin_code"})
    admin_code: Admin;

    @PrimaryColumn()
    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id"})
    user_id: User;
}