import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Admin } from "./admin";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from "./user";

@Entity("room_tbl")
export class Room extends EntityWithIdColumn {
    @JoinColumn({ name: "admin_code"})
    @ManyToOne(() => Admin, admin => admin.rooms)
    admin_code: Admin;

    @JoinColumn({ name: "user_id" })
    @OneToOne(() => User, user => user.id)
    user_id: User;
}