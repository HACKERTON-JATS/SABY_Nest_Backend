import { ReservationRepository } from "../entity/entity-repository/reservationRepository";
import { KidInformationRepository } from "../entity/entity-repository/kidInformationRepository";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { ReservationService } from "../service/reservation.service";
import { UserRepository } from "../entity/entity-repository/userRepository";

export class ReservationController {
    private reservationService: ReservationService = new ReservationService(
        ReservationRepository.getQueryRepository(),
        KidInformationRepository.getQueryRepository(),
        UserRepository.getQueryRepository()
    );

    public makeReservation: BusinessLogic = async (req, res, next) => {
        await this.reservationService.makeReservation(req.body.kidInformation, req.body.reservation, req.decoded.sub);
        res.status(200).json({
            message: "success"
        })
    }

    public getReservation: BusinessLogic = async (req, res, next) => {
        const time = await this.reservationService.getReservation(req.decoded.sub);
        res.status(200).json(time);
    }

    public isReservation: BusinessLogic = async (req, res, next) => {
        const time = await this.reservationService.isReservation();
        res.status(200).json(time);
    }
}