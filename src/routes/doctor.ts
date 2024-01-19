import express from "express";
import { createReport, getDoctorReports, updateDoctorReport, deleteDoctorReport, getDoctorReportDetails } from "../controller/report";
import { loginDoctor } from "../controller/doctor";

const router = express.Router();



router.post("/report", createReport);
router.get("/reports", getDoctorReports);
router.get("/reports/:id", getDoctorReportDetails);
router.put("/reports/:id", updateDoctorReport);
router.delete("/reports/:id", deleteDoctorReport);


// login Doctor and Admin
router.post("/login", loginDoctor, async (req, res) => {
  if ((req.session as any).isAdmin === true) {
    return res.redirect("/admin/dashboard");
  } else {
    return res.redirect("/doctor/dashboard");
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      const err = new Error("Internal Server Error");
      return next(err);
    } else {
      console.log("did you see me");
      res.redirect("/");
    }
  });
});

export default router;
