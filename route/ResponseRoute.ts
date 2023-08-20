import express from "express";
import { GetAllResponse, GetResponseById } from "../controller";



const router = express.Router()

router.get('/', GetAllResponse)
router.get('/:responseId', GetResponseById)

export { router  as ResponseRoute }