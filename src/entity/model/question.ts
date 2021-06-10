import { Entity, Column } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity("question_tbl")
export class Question extends EntityWithIdColumn {
    @Column({ type: "varchar", length: 300})
    answer: string;
}