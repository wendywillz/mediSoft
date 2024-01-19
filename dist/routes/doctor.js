"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const report_1 = require("../controller/report");
const doctor_1 = require("../controller/doctor");
const router = express_1.default.Router();
router.post("/report", report_1.createReport);
router.get("/reports", report_1.getDoctorReports);
router.get("/reports/:id", report_1.getDoctorReportDetails);
router.put("/reports/:id", report_1.updateDoctorReport);
router.delete("/reports/:id", report_1.deleteDoctorReport);
// login Doctor and Admin
router.post("/login", doctor_1.loginDoctor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.isAdmin === true) {
        return res.redirect("/admin/dashboard");
    }
    else {
        return res.redirect("/doctor/dashboard");
    }
}));
router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            const err = new Error("Internal Server Error");
            return next(err);
        }
        else {
            console.log("did you see me");
            res.redirect("/");
        }
    });
});
exports.default = router;
