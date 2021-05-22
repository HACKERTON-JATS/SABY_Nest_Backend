import { ReservationRepository } from "../entity/entity-repository/reservationRepository";
import { KidInformationRepository } from "../entity/entity-repository/kidInformationRepository";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { ReservationService } from "../service/reservation.service";

export class ReservationController {
    private reservationService: ReservationService = new ReservationService(
        ReservationRepository.getQueryRepository(),
        KidInformationRepository.getQueryRepository()
    );

    public makeReservation: BusinessLogic = async (req, res, next) => {
        await this.reservationService.makeReservation(req.body.kidInformation, req.body.reservation);
        res.status(200).json({
            message: "success"
        })
    }
}