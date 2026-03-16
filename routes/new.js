import express, { Router } from "express";
import { getForm, postForm } from "../controllers/new.js";

const router = Router();

router.get("/", getForm);
router.post("/", express.urlencoded({ extended: true }), postForm);

export default router;
