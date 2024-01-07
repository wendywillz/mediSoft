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
exports.authenticateToken = exports.deleReport = exports.updateReport = exports.getReport = exports.getAllReportsByDoctor = exports.createReport = exports.loginDoctor = exports.deleteDoctor = exports.editDoctor = exports.getDoctorDetails = exports.getAllDoctors = exports.createDoctor = void 0;
const doctor_1 = __importDefault(require("../model/doctor"));
const report_1 = __importDefault(require("../model/report"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//generate Access Token function
function generateAccessToken(doctor) {
    const payload = {
        email: doctor.email,
        id: doctor.id,
    };
    const secret = "Your_secret_key";
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
;
function verifyAccessToken(token) {
    const secret = "Your_secret_key";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { success: true, data: decoded };
    }
    catch (error) {
        return { success: false, data: error.message };
    }
}
function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Missing or invalid Authorization header" });
    }
    const token = authHeader.substring("Bearer ".length);
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    const verificationResponse = verifyAccessToken(token);
    if (verificationResponse.success) {
        res.locals.verificationResponse = verificationResponse;
        res.locals.doctor = verificationResponse.data; // Store doctor data in res.locals
        next();
    }
    else {
        return res
            .status(401)
            .json({ message: "Invalid token", error: verificationResponse.data });
    }
}
exports.authenticateToken = authenticateToken;
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctor_1.default.create(req.body);
    const password = req.body.password;
    const hashpassword = bcrypt_1.default.hashSync(password, 10);
    doctor.password = hashpassword;
    yield doctor.save();
    res.redirect("/doctor/login");
    // res
    //   .status(201)
    //   .json({ message: "Doctor Created Successfully", Doctor: doctor });
});
exports.createDoctor = createDoctor;
const getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDoctors = yield doctor_1.default.findAll();
        if (allDoctors) {
            res
                .status(201)
                .json({ message: "All Doctor's Retrieved Successfully", Doctor: allDoctors });
        }
        else {
            res.status(404).json({ message: "No doctors found" });
        }
    }
    catch (error) {
        console.error("Error getting all doctors", error);
        res
            .status(500)
            .json({ message: "Internal server error" });
    }
});
exports.getAllDoctors = getAllDoctors;
// View details of a single doctor
const getDoctorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const doctor = yield doctor_1.default.findOne({ where: { id: doctorId } });
    if (!doctor) {
        res.status(404).json({ message: "Doctors Data not found" });
    }
    else {
        res
            .status(201)
            .json({
            message: "Doctor Retrieved successfully",
            Doctor: doctor,
        });
    }
});
exports.getDoctorDetails = getDoctorDetails;
//Update doctor details
const editDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const doctor = yield doctor_1.default.findOne({ where: { id: doctorId } });
    if (doctor) {
        doctor.doctorsName = req.body.doctorsName;
        doctor.email = req.body.email;
        doctor.password = req.body.password;
        doctor.specialization = req.body.specialization;
        doctor.gender = req.body.gender;
        doctor.phonenumber = req.body.phonenumber;
    }
    yield (doctor === null || doctor === void 0 ? void 0 : doctor.save());
    res
        .status(201)
        .json({ message: "Doctor Updated Successfully", Doctor: doctor });
});
exports.editDoctor = editDoctor;
// Delete a doctor
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const deleteRows = yield doctor_1.default.findOne({ where: { id: doctorId } });
    if (!deleteRows) {
        res.status(404).json({ message: "Doctor not found" });
    }
    else {
        yield deleteRows.destroy();
    }
    res
        .status(201)
        .json({ message: "Doctor deleted successfully", Doctor: deleteRows });
});
exports.deleteDoctor = deleteDoctor;
// used for authentication
const loginDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ message: "Email or password missing" });
    }
    const doctor = yield doctor_1.default.findOne({ where: { email: email } });
    if (!doctor) {
        return res.status(404).send({ message: "Email does not Exist" });
    }
    const Match = bcrypt_1.default.compareSync(password, doctor.password);
    if (!Match) {
        return res.status(404).send({ message: "Invalid Password" });
    }
    const accessToken = generateAccessToken(doctor);
    res.status(200).send({ message: "Login Successful", accessToken: accessToken });
});
exports.loginDoctor = loginDoctor;
// Function to create a report
function createReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const reportData = req.body;
            reportData.doctorId = doctor.id;
            const createdReport = yield report_1.default.create(reportData);
            res
                .status(201)
                .json({ message: "Report created successfully", report: createdReport });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.createReport = createReport;
// Function to get all reports created by a specific doctor
function getAllReportsByDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const reports = yield report_1.default.findAll({ where: { doctorId: doctor.id } });
            res.status(200).json({ message: "Reports retrieved successfully", reports });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.getAllReportsByDoctor = getAllReportsByDoctor;
// Function to retrieve a particular report by reportId for a logged-in authenticated doctor
function getReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const doctorId = req.params.doctorId;
            const reportId = req.params.reportId;
            if (doctor.id !== doctorId) {
                res.status(403).json({ message: "Unauthorized access to doctor's reports" });
                return;
            }
            // Retrieve the report from the database
            const report = yield report_1.default.findOne({
                where: {
                    id: reportId,
                    doctorId: doctorId,
                },
            });
            // Check if the report exists
            if (!report) {
                res.status(404).json({ message: "Report not found" });
                return;
            }
            res.status(200).json({
                message: "Report retrieved successfully",
                report,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.getReport = getReport;
;
function findReportByIdAndAuthorize(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const doctor = res.locals.doctor;
        const reportId = req.params.reportId;
        // Retrieve the report from the database
        const report = yield report_1.default.findByPk(reportId);
        // Check if the report exists and if the doctor's ID matches the one attached to the report
        if (!report || report.doctorId !== doctor.id) {
            res.status(404).json({ message: "Report not found or unauthorized" });
            return null;
        }
        return report;
    });
}
// Function to update a report
function updateReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const report = yield findReportByIdAndAuthorize(req, res);
            if (report) {
                const updatedData = req.body;
                // Update the report
                yield report.update(updatedData);
                res.status(200).json({ message: "Report updated successfully", report });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.updateReport = updateReport;
;
// Function to delete a report
function deleReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const report = yield findReportByIdAndAuthorize(req, res);
            if (report) {
                // Delete the report
                yield report.destroy();
                res.status(200).json({ message: "Report deleted successfully" });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.deleReport = deleReport;
;
