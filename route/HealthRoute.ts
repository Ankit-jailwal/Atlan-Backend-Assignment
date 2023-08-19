import express from "express";
import { HealthManager } from "../controller";


const router = express.Router();

router.get('/', HealthManager)

export { router as HealthRoute };