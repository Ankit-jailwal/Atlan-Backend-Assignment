import { DataTypes, Model } from 'sequelize';
import { database } from '../services/Database';

class Question extends Model {}

Question.init(
  {
    text: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize: database.sequelize,
    modelName: 'Question'
  }
);

export const QuestionModel = Question;