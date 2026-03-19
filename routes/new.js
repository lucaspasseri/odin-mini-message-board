import express, { Router } from "express";
import { getForm, postNewMessage } from "../controllers/new.js";

const router = Router();

router.get("/", getForm);
router.post("/", express.urlencoded({ extended: true }), postNewMessage);

export default router;
