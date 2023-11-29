import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { v4 as uuidv4 } from "uuid";
import Doctor from "./doctor";


uuidv4();


interface ReportsInterface {
  doctorId: typeof uuidv4;
  patientsId: string;
  Patientsname: string;
  Age: string;
  hostipalName: string;
  weight: string;
  height: string;
  bloodGroup: string;
  genotype: string;
  bloodPressure: string;
  HIV_status: string;
  hepatitis: string;
}

class Notes extends Model<ReportsInterface> {
    public doctorId?: string;

    constructor(doctorId?: string) {
        super();
        this.doctorId = doctorId;
    }
}

Report.init(
{
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false,
      reference:{
        model: Doctor,
        key: 'id'
      },
    },
    patientsId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Patientsname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostipalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genotype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HIV_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hepatitis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Report",
  }
);
Report.belongsTo(Doctor, {foreignKey: 'doctorId'});

export default Report;