import { Application } from "express";
import bodyParser from "body-parser";
import { GSheetRoute } from "../route/GSheetRoute";


export default async (app: Application) => { 
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/googleSheet', GSheetRoute)
}