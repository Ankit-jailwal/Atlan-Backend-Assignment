import express from "express";
import { GetForm, CreateForm, GetFormByID } from "../controller/FormController";


const router = express.Router()

router.get('/', GetForm)
router.post('/create', CreateForm)
router.get('/:id', GetFormByID)

export {router as FormRoute}

