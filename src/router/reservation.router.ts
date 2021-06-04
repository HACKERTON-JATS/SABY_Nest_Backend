import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { ReservationController } from "../controller/reservation.controller";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const router: Router = Router();
export const reservationServiceRouter = (app: Router) => {
    const reservationController: ReservationController = new ReservationController();

    app.use("/", router);

    router.post(
        "/reservation",
        verifyTokenMiddleware,
        errorHandler(reservationController.makeReservation)
    );
}