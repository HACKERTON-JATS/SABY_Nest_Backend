import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Reservation } from "../model/reservation";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {

    static getQueryRepository() {
        return getCustomRepositorty(ReservationRepository)
    }

    public async makeReservation()
}