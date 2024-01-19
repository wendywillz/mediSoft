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
exports.deleteReport = exports.updateReport = exports.getReport = exports.getAllReports = exports.deleteDoctorReport = exports.updateDoctorReport = exports.getDoctorReportDetails = exports.getDoctorReports = exports.getReportDetails = exports.createReport = void 0;
const report_1 = __importDefault(require("../model/report"));
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = req.session.doctorId;
        if (!doctorId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Doctor not logged in" });
        }
        const reportData = Object.assign(Object.assign({}, req.body), { doctorId });
        const report = new report_1.default(reportData);
        yield report.save();
        res.redirect("/doctor/dashboard");
    }
    catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createReport = createReport;
// View details of a single report
const getReportDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportId = req.params.id;
    try {
        const report = yield report_1.default.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    }
    catch (error) {
        console.error("Error getting report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getReportDetails = getReportDetails;
// Import necessary modules and models
// Fetch reports created by the logged-in doctor
const getDoctorReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = req.session.doctorId;
        if (!doctorId) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Doctor not logged in" });
        }
        const reports = yield report_1.default.find({ doctorId });
        res.status(200).json({ message: "Reports Retrieved Successfully", reports });
    }
    catch (error) {
        console.error("Error getting doctor's reports:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getDoctorReports = getDoctorReports;
//view a single report created by the logged-in doctor
const getDoctorReportDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.session.doctorId;
    const reportId = req.params.id;
    try {
        const report = yield report_1.default.findOne({ _id: reportId, doctorId });
        if (!report) {
            return res.status(404).json({ message: "Report not found or unauthorized" });
        }
        res.status(200).json(report);
    }
    catch (error) {
        console.error("Error getting doctor's report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getDoctorReportDetails = getDoctorReportDetails;
// Import necessary modules and models
// Update a report created by the logged-in doctor
const updateDoctorReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.session.doctorId;
    const reportId = req.params.id;
    const updates = req.body;
    try {
        const report = yield report_1.default.findOneAndUpdate({ _id: reportId, doctorId }, updates, { new: true });
        if (!report) {
            return res.status(404).json({ message: "Report not found or unauthorized" });
        }
        res.status(200).json({ message: "Report Updated Successfully", report });
    }
    catch (error) {
        console.error("Error updating doctor's report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateDoctorReport = updateDoctorReport;
// Delete a report created by the logged-in doctor
const deleteDoctorReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.session.doctorId;
    const reportId = req.params.id;
    try {
        const report = yield report_1.default.findOneAndDelete({ _id: reportId, doctorId });
        if (!report) {
            return res.status(404).json({ message: "Report not found or unauthorized" });
        }
        res.status(200).json({ message: "Report Deleted Successfully" });
    }
    catch (error) {
        console.error("Error deleting doctor's report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteDoctorReport = deleteDoctorReport;
// Fetch all reports
const getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield report_1.default.find();
        res.status(200).json({ message: "Reports Retrived Succefully", reports });
    }
    catch (error) {
        console.error("Error getting reports:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllReports = getAllReports;
// View details of a single report
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportId = req.params.id;
    try {
        const report = yield report_1.default.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    }
    catch (error) {
        console.error("Error getting report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getReport = getReport;
// Update a report
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportId = req.params.id;
    const updates = req.body;
    try {
        const report = yield report_1.default.findByIdAndUpdate(reportId, updates, { new: true });
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json({ message: "Report Updated Successfully", report });
    }
    catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateReport = updateReport;
// Delete a report
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportId = req.params.id;
    try {
        const report = yield report_1.default.findByIdAndDelete(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json({ message: "Report Deleted Successfully" });
    }
    catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteReport = deleteReport;
