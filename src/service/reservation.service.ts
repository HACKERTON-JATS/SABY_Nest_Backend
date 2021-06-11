import { KidInformationRepository } from "../entity/entity-repository/kidInformationRepository";
import { ReservationRepository } from "../entity/entity-repository/reservationRepository";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { kidInformation, Reservation } from "src/entity/model";
import { BadRequestError } from "../shared/exception";

export class ReservationService {
    constructor(
        private reservationRepository: ReservationRepository,
        private kidInformationRepository: KidInformationRepository,
        private userRepository: UserRepository
    ) {}

    public async makeReservation(kidInformation: kidInformation, reservation: Reservation, user_id: number): Promise<void> {
        const existReservation = await this.reservationRepository.findOne({
            where: { time: reservation.time }
        });
        if(existReservation) {
            throw new BadRequestError("이미 예약된 시간입니다.");
        }
        const user = await this.userRepository.findOne({
            where: { id: user_id }
        });
        await this.reservationRepository.makeReservation(reservation, user);
        const id = this.reservationRepository.getId();
        const reservationId = await this.reservationRepository.getReservationId(id[0]);
        await this.kidInformationRepository.createInformation(reservationId, kidInformation);
    }

    public async getReservation(user_id: number): Promise<Date[]> {
        const time = await this.reservationRepository.getReservationTime(user_id);
        return time;
    }

    public async isReservation(): Promise<Date[]> {
        const time = await this.reservationRepository.isReservation();
        return time;
    }
}   