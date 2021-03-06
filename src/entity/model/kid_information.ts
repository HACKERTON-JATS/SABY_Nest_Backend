import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Reservation } from "./reservation";

@Entity("kid_information_tbl")
export class kidInformation {
    @PrimaryColumn()
    reservation_id: number;
    @JoinColumn({ name: "reservation_id" })
    @OneToOne(() => Reservation, reservation => reservation.id)
    reservation: Reservation;

    @Column({ type: "datetime" })
    birth_date: Date;

    @Column({ type: "varchar", length: 45 })
    kid_name: string;

    @Column({ type: "varchar", length: 45 })
    vaccination: string;

    @Column({ type: "varchar", length: 45, nullable: true})
    fetus_name: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    request: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    caution: string;
}