"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const uuid_1 = require("uuid");
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
Doctor.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: uuid_1.v4,
        primaryKey: true,
    },
    doctorsName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phonenumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Doctor",
});
Doctor.hasMany(Report, { foreignKey: "id", as: "doctor" });
Report.belongsTo(Doctor, { foreignKey: "PatientsId", as: "report" });
console.log(Doctor === database_config_1.default.models.Doctor); // true