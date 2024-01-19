"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_1 = require("../controller/doctor");
const report_1 = require("../controller/report");
const router = express_1.default.Router();
router.post('/reg', doctor_1.createDoctor);
router.get('/doctors', doctor_1.getAllDoctors);
router.get('/doctors/:id', doctor_1.getDoctorDetails);
router.put('/doctors/:id', doctor_1.updateDoctor);
router.delete('/doctors/:id', doctor_1.deleteDoctor);
router.get('/reports', report_1.getAllReports);
router.get('/reports/:id', report_1.getReport);
router.put('/reports/:id', report_1.updateReport);
router.delete('/reports/:id', report_1.deleteReport);
exports.default = router;
