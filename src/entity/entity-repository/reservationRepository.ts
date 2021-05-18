import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Reservation } from "../model/reservation";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {

    static getQueryRepository() {
        return getCustomRepository(ReservationRepository)
    }

    public async makeReservation(reservation: Reservation): Promise<void> {
        await this.createQueryBuilder("reservation")
            .insert()
            .values([
                {
                    time: reservation.time,
                    reservation: true,
                    user_id: reservation.user_id
                }
            ])
            .execute()
    }
}