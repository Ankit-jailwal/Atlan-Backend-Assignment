import { Identifier } from "sequelize";
import { database } from "../services/Database";
import { GSheetQueue } from "../messagequeue/GSheetQueue";


export const UpdateGoogleSheet = async (responseId: Identifier | undefined) => {

    try {
      const response = await database.Response.findByPk(responseId);
  
      if (!response) {
        console.log('Response not found.');
        return
      }
      
      const form = await database.Form.findByPk(response.FormId);
  
      if (!form) {
        console.log('Form not found.');
      }
  

      const questionsWithAnswers = await database.Question.findAll({
        where: { FormId: form?.id },
        include: [
          {
            model: database.Answer,
            as: 'answers',
            where: { ResponseId: response.id }, 
          },
        ],
      });
  
      
      const responseWithDetails = {
        form: form?.toJSON(),
        questions: questionsWithAnswers,
      };
      
      console.log(responseWithDetails);
      await GSheetQueue(responseWithDetails)
      return
    } catch (error) {
      console.error(error);
      console.log('An error occurred while fetching the response.');
      return
    }
  }