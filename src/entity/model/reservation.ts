import { Column, Entity } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity("reservation_tbl")
export class Reservation extends EntityWithIdColumn {
    @Column({ type: "datetime"})
    time: Date;

    @Column({ type: "tinyint", default: false })
    take: boolean;

    @Column({ type: "tinyint", default: false })
    reservation: boolean;
}