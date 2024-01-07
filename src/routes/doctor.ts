import express from "express";
import { getAllDoctors, getDoctorDetails, editDoctor, deleteDoctor, createDoctor, loginDoctor, createReport, getAllReportsByDoctor, getReport, updateReport, deleReport,authenticateToken } from "../controller/doctor";


const router = express.Router();

// create doctor
router.post("/reg", createDoctor);
// login doctor
router.post("/login", loginDoctor);

// Dashboard of Doctors


router.get("/", getAllDoctors);


router.route("/:id")
    .get(getDoctorDetails)
    .put(editDoctor)
    .delete(deleteDoctor)
//create doctors report
router.post("/report", authenticateToken, createReport);

//get all reports by a doctor
router.get("/report/:doctorId", authenticateToken, getAllReportsByDoctor);

//get patient report
router.get("/report/:doctorId/:reportId", authenticateToken, getReport);

//update patient report
router.put("/report/:reportId", authenticateToken, updateReport);

//delete patient report
router.delete("/report/:reportId", authenticateToken, deleReport);

export default router;
