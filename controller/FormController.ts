import {Request, Response} from 'express'
import { database } from '../services/Database'
import { FormModel, QuestionModel, ResponseModel } from '../models';
import { UpdateGoogleSheet } from '../postprocessing/UpdateGoogleSheet';
import { GSheetQueue } from '../messagequeue/GSheetQueue';
import { SendMessage } from '../postprocessing/SendMessage';

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
        const { formId } = req.params;
      
        try {
          const form = await database.Form.findByPk(formId, {
            include: [
              { model: database.Question, as: 'questions' },
            ],
          });
      
          if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
          }
      
          res.status(200).json(form);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching the form.' });
        }
    
}

export const FillForm = async (req: Request, res: Response) => {
    const { formId } = req.params;
    const { answers } = req.body;
  
    try {
      const form = await database.Form.findByPk(formId, {
        include: [
          { model: database.Question, as: 'questions' },
        ],
      });

  
      if (!form) {
        return res.status(404).json({ error: 'Form not found.' });
      }
      
      const formWithQuestions = form as FormModel & { questions: QuestionModel[] };

      const response = await database.Response.create({ FormId: formId }) as ResponseModel;

  
      for (const answerData of answers) {
        const { QuestionId, text } = answerData;
        const question = formWithQuestions.questions.find(q => q.id === QuestionId);
        
        if (!question) {
          return res.status(400).json({ error: `Question with ID ${QuestionId} not found in the form.` });
        }
  
        await database.Answer.create({ ResponseId: response.id, QuestionId, text });
      }
      
      // SMS Service
      await SendMessage(form)
      // Update GoogleSheet
      await UpdateGoogleSheet(response.id)
      
      res.status(201).json({ message: 'Questions answered successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while answering questions.' });
    }
  }
