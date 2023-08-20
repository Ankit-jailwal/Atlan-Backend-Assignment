import { Application } from "express";
import bodyParser from "body-parser";
import { HealthRoute, FormRoute, QuestionRoute, ResponseRoute } from "../route";


export default async (app: Application) => { 
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/health', HealthRoute)
    app.use('/form', FormRoute)
    app.use('/question', QuestionRoute)
    app.use('/response', ResponseRoute)
    // app.use('/answer', AnswerRoute)
}