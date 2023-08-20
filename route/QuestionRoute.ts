import express from "express";
import { GetQuestion } from "../controller/QuestionController";


const router = express.Router()


router.post('/', GetQuestion)

export {router as QuestionRoute}