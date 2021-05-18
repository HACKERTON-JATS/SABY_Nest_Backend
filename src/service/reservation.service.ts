import { KidInformationRepository } from "src/entity/entity-repository/kidInformationRepository";
import { ReservationRepository } from "src/entity/entity-repository/reservationRepository";
import { kidInformation } from "src/entity/model";

export class ReservationService {
    constructor(
        private reservationRepository: ReservationRepository,
        private kidInformationRepository: KidInformationRepository
    ) {}

    public async makeReservation(): Promise<> {
        await 
    }
}   