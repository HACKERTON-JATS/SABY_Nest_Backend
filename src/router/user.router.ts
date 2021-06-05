import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { UserController } from "../controller/user.controller";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { validationRequest } from "../middleware/validationRequest";
import { UserEamilSchema, UserIdSchema, UserNicknameSchema, UserVerifyCodeSchema, UserSignupSchema, UserLoginSchema } from "../shared/DataTransferObject";

const router: Router = Router();
export const userServiceRouter = (app: Router) => {
    const userController: UserController = new UserController();

    app.use("/", router);

    router.post(
        "/signup",
        validationRequest(UserSignupSchema),
        errorHandler(userController.createUser)
    );

    router.get(
        "/members/email",
        validationRequest(UserEamilSchema),
        errorHandler(userController.overlapEmail)
    );

    router.get(
        "/members/id",
        validationRequest(UserIdSchema),
        errorHandler(userController.overlapId)
    );

    router.get(
        "/members/nickname",
        validationRequest(UserNicknameSchema),
        errorHandler(userController.overlapNickname)
    );

    router.post(
        "/sms-certification/sends",
        validationRequest(UserEamilSchema),
        errorHandler(userController.sendCode)
    );

    router.get(
        "/sms-certification/confirms",
        validationRequest(UserVerifyCodeSchema),
        errorHandler(userController.checkVerifyCode)
    );

    router.post(
        "/login",
        validationRequest(UserLoginSchema),
        errorHandler(userController.login)
    );

    router.get(
        "/logout",
        verifyTokenMiddleware,
        errorHandler(userController.logout)
    )
}