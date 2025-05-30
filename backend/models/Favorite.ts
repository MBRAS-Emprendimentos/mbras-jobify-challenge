import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Favorite extends Model {
  public id!: number;
  public jobId!: number;
  public title!: string;
  public company!: string;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'favorites',
    sequelize,
  }
);
