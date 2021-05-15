import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { kidInformation } from "./kid_information";
import { User } from "./user";

@Entity("reservation_tbl")
export class Reservation extends EntityWithIdColumn {
    @Column({ type: "datetime"})
    time: Date;

    @Column({ type: "tinyint", default: false })
    take: boolean;

    @Column({ type: "tinyint", default: false })
    reservation: boolean;

    @JoinColumn({ name: "user_id"})
    @ManyToOne(() => User, user => user.id)
    user_id: User;

    @OneToOne(() => kidInformation, kidinformation => kidinformation.reservation_id)
    kidInformation: kidInformation;
}