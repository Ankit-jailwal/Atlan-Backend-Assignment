import {Request, Response} from 'express'
import { database } from '../services/Database'

export const GetQuestion = async (req: Request, res: Response) => {
    try {
        const forms = await database.Question.findAll();
        
        if (forms !== null && forms.length > 0) {
            return res.json(forms); 
        }

        return res.json({"message" : "No questions exist"});
    
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const CreateQuestion = async (req: Request, res: Response) => {

    const { formId } = req.params;
    const { text, mandatory } = req.body;
    try {
        const form = await database.Form.findByPk(formId);
        if (!form) {
        return res.status(404).json({ error: 'Form not found.' });
        }

        const question = await database.Question.create({ FormId: formId, text, mandatory });
        
        res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the question.' });
    }
};
