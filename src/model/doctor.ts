import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { v4 as uuidv4 } from "uuid";
import Report from "./report";


interface DoctorsInterface {
  id: string;
  doctorsName: string;
  email: string;
  password: string;
  specialization: string;
  gender: string;
  phonenumber: string;
}

export class Doctor extends Model<DoctorsInterface> {}
Doctor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    doctorsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Doctor",
  }
);
Doctor.hasMany(Report, {foreignKey: 'DoctorId'});


export default Doctor;