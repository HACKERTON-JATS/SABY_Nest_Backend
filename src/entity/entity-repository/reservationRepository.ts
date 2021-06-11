import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../model";
import { Reservation } from "../model/reservation";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {

    static getQueryRepository() {
        return getCustomRepository(ReservationRepository)
    }

    public async makeReservation(reservation: Reservation, user: User): Promise<void> {
        await this.createQueryBuilder("reservation")
            .insert()
            .values([
                {
                    time: reservation.time,
                    is_reservation: true,
                    user: user
                }
            ])
            .execute()
    }

    public async getReservationId(time: Date): Promise<number> {
        return await this.createQueryBuilder("reservation")
            .select("reservation.id", "id")
            .where("reservation.time = :time", { time: time })
            .getRawOne()
    }

    public async getReservationTime(user_id: number): Promise<Date[]> {
        return await this.createQueryBuilder("reservation")
            .select("reservation.time", "time")
            .where("reservation.user_id = :id", { id: user_id })
            .getRawMany()
    }

    public async isReservation(): Promise<Date[]> {
        return await this.createQueryBuilder("reservation")
            .select("reservation.time", "time")
            .getRawMany()
    }
}