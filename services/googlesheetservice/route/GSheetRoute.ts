import express from "express";
import { GSheetController } from "../controller/GSheetController";


const router = express.Router()

router.post('/', GSheetController)

export {router as GSheetRoute}