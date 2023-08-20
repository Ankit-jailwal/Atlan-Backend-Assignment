import express from "express";
import { GetQuestion } from "../controller/QuestionController";


const router = express.Router()


router.get('/', GetQuestion)

export {router as QuestionRoute}