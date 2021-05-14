import { Col } from "sequelize/types/lib/utils";
import { Column, Entity } from "typeorm";

@Entity("kid_information_tbl")
export class kidInformation {
    @Column({ type: "datetime" })
    birth_date: Date;

    @Column({ type: "varchar", length: 45 })
    kid_name: string;

    @Column({ type: "varchar", length: 45 })
    vaccination: string;

    @Column({ type: "varchar", length: 45 })
    fetus_name: string;

    @Column({ type: "varchar", length: 200 })
    request: string;

    @Column({ type: "varchar", length: 200 })
    caution: string;

    @Column({ type: "varchar", length: 300 })
    give_later: string;
}