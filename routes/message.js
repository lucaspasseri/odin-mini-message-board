import { Router } from "express";
import { getMessageDetails } from "../controllers/message.js";

const router = Router();

router.get("/:messageId", getMessageDetails);

export default router;
