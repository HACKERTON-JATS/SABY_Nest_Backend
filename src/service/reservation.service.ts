import { KidInformationRepository } from "src/entity/entity-repository/kidInformationRepository";
import { ReservationRepository } from "src/entity/entity-repository/reservationRepository";
import { kidInformation, Reservation } from "src/entity/model";

export class ReservationService {
    constructor(
        private reservationRepository: ReservationRepository,
        private kidInformationRepository: KidInformationRepository
    ) {}

    public async makeReservation(kidInformation: kidInformation, reservation: Reservation): Promise<void> {
        await this.kidInformationRepository.createInformation(kidInformation);
        await this.reservationRepository.makeReservation(reservation);
    }
}   