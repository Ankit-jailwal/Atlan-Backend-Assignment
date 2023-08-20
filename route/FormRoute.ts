import express from "express";
import { GetForm, CreateForm, GetFormByID, FillForm } from "../controller/FormController";
import { CreateQuestion } from "../controller/QuestionController";


const router = express.Router()

router.get('/', GetForm)
router.post('/create', CreateForm)
router.get('/:formId', GetFormByID)
// router.post('/:id', FillForm)
router.post('/:formId/create', CreateQuestion)
router.post('/:formId', FillForm)

export {router as FormRoute}

