import { Column, Entity, OneToMany } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from "./user";

@Entity("chat_tbl")
export class Chat extends EntityWithIdColumn {
    @Column({ type: "varchar", length: 512})
    message: string;

    @Column({ type: "datetime"})
    created_at: Date;

    @Column({ type: "varchar", length: 512, nullable: true})
    title: string;

    @Column()
    @OneToMany(() => User, user => user.id)
    user_id: User;
}