import { Model } from 'sequelize';

interface ResponseAttributes {}

interface ResponseModel extends Model<ResponseAttributes> {
  id: number;
  FormId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export {
  ResponseAttributes,
  ResponseModel
};