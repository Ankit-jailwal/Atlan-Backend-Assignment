import {Request, Response} from 'express'
import { database } from '../services/Database'

export const GetForm = async (req: Request, res: Response) => {
    try {
        const forms = await database.Form.findAll();
        
        if (forms !== null && forms.length > 0) {
            return res.json(forms); 
        }

        return res.json({"message" : "No Forms exist"});
    
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const CreateForm = async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const { title, email, created_by } = req.body;

      const form = await database.Form.create({ title, email, created_by });

      res.status(201).json(form);

    } catch (error) {

      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the form.' });

    }
  };

export const GetFormByID = async (req: Request, res: Response) => {
    // try {
    //     const forms = await database.Form.findByPk();
        
    //     if (forms !== null && forms.length > 0) {
    //         return res.json(forms); 
    //     }

    //     return res.json({"message" : "No Forms exist"});
        
    //   } catch (error) {
    //     res.status(500).json({ error: error});
    //   }
    
}