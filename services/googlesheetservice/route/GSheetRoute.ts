import express from "express";
import { GSheetController } from "../controller/GSheetController";


const router = express.Router()

router.get('/', GSheetController)

export {router as GSheetRoute}