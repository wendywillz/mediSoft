"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DoctorSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    doctorsName: String,
    specialization: String,
    gender: String,
    phonenumber: Number,
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
const Doctor = mongoose_1.default.model("Doctor", DoctorSchema);
exports.default = Doctor;
