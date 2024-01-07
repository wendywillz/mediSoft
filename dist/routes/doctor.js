"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_1 = require("../controller/doctor");
const router = express_1.default.Router();
// create doctor
router.post("/reg", doctor_1.createDoctor);
// login doctor
router.post("/login", doctor_1.loginDoctor);
// Dashboard of Doctors
router.get("/", doctor_1.getAllDoctors);
router.route("/:id")
    .get(doctor_1.getDoctorDetails)
    .put(doctor_1.editDoctor)
    .delete(doctor_1.deleteDoctor);
//create doctors report
router.post("/report", doctor_1.authenticateToken, doctor_1.createReport);
//get all reports by a doctor
router.get("/report/:doctorId", doctor_1.authenticateToken, doctor_1.getAllReportsByDoctor);
//get patient report
router.get("/report/:doctorId/:reportId", doctor_1.authenticateToken, doctor_1.getReport);
//update patient report
router.put("/report/:reportId", doctor_1.authenticateToken, doctor_1.updateReport);
//delete patient report
router.delete("/report/:reportId", doctor_1.authenticateToken, doctor_1.deleReport);
exports.default = router;
