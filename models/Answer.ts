import { Model } from "sequelize";

export interface AnswerModel extends Model {
  id: number;
  ResponseId: number;
  QuestionId: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}