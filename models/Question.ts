import { Model } from "sequelize";

export interface QuestionModel extends Model {
  id: number;
  text: string;
  mandatory: boolean;
}
