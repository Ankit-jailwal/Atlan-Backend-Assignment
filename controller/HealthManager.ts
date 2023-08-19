import {Request, Response} from 'express'

export const HealthManager = async (req: Request, res: Response) => {
    res.json({ "status": "Health OK" });
}