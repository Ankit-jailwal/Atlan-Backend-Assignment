import { DataTypes, Sequelize } from 'sequelize';
import  { FormModel, ResponseModel }  from '../models';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432, 
  username: 'postgres',
  password: 'may13@1993',
  database: 'atlandb',
});

const Form = sequelize.define<FormModel>('Form', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Response = sequelize.define<ResponseModel>('Response', {});

const Question = sequelize.define('Question', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mandatory: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Answer = sequelize.define('Answer', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Associations
Form.hasMany(Question, { onDelete: 'CASCADE', as: 'questions' });
Question.belongsTo(Form);

Form.hasMany(Response, { onDelete: 'CASCADE', as: 'responses' });
Response.belongsTo(Form);
Response.belongsTo(Question);
Response.hasMany(Answer, { onDelete: 'CASCADE', as: 'answers' });
Answer.belongsTo(Response);
Question.hasMany(Answer, { onDelete: 'CASCADE', as: 'answers' });
Answer.belongsTo(Question);

export const database = {
  sequelize,
  Question,
  Answer,
  Form,
  Response
};