import {Request, Response} from 'express'

export const GSheetController = async (req: Request, res: Response) => {
    res.json({ "status": "Health OK" });
}