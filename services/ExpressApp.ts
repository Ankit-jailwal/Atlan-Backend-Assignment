import { Application } from "express";
import bodyParser from "body-parser";
import { AdminRoute, FormRoute, QuestionRoute, AnswerRoute } from "../route";


export default async (app: Application) => { 
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    
    app.use('/admin', AdminRoute)
    app.use('/form', FormRoute)
    app.use('/question', QuestionRoute)
    app.use('/answer', AnswerRoute)
}