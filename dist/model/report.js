"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const doctor_1 = __importDefault(require("./doctor"));
const ReportSchema = new mongoose_1.default.Schema({
    doctorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: doctor_1.default },
    patientsName: String,
    Age: Number,
    hospitalName: String,
    weight: String,
    height: String,
    bloodGroup: String,
    genotype: String,
    bloodPressure: String,
    HIV_status: String,
    hepatitis: String,
    createdAt: { type: Date, default: Date.now },
});
const Report = mongoose_1.default.model("Report", ReportSchema);
exports.default = Report;
