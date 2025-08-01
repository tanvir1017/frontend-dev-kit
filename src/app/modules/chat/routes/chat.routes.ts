import { Router } from "express";
import { authGuard } from "../../../middleware/auth";

const router = Router();

// create conversation and messages
router.route("/new").get(authGuard("SUPER_ADMIN", "ADMIN", "USER"));

export const chatRoutes = router;
