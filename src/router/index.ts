import { Router } from "express";
import { userServiceRouter } from "./user.router";
import { reservationServiceRouter } from "./reservation.router";

export const sabyRouter = () => {
    const app = Router();

    userServiceRouter(app);
    reservationServiceRouter(app);

    return app;
}