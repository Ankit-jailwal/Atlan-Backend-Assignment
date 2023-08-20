import { Model } from "sequelize";
import { QuestionModel } from ".";

export interface FormModel extends Model {
  id: number;
  title: string;
  email: string | null;
  created_by: string | null;
  questions?: QuestionModel[];
  createdAt?: Date;
  updatedAt?: Date;
}