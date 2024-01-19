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
exports.loginDoctor = exports.deleteDoctor = exports.updateDoctor = exports.getDoctorDetails = exports.getAllDoctors = exports.createDoctor = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const doctor_1 = __importDefault(require("../validation/doctor"));
const authentication_1 = require("../middleware/authentication");
const doctor_2 = __importDefault(require("../model/doctor"));
const zod_1 = require("zod");
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = doctor_1.default.parse(req.body);
        const hashPassword = bcrypt_1.default.hashSync(validatedData.password, 10);
        validatedData.password = hashPassword;
        const newDoctor = new doctor_2.default(validatedData);
        yield newDoctor.save();
        res
            .redirect("/admin/dashboard");
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const validationErrors = error.errors.reduce((acc, validationError) => {
                const { message, path } = validationError;
                acc[path.join(".")] = message;
                return acc;
            }, {});
            res
                .status(400)
                .json({ message: "Validation Error", errors: validationErrors });
        }
        else {
            console.error("Error creating doctor:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
});
exports.createDoctor = createDoctor;
const getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_2.default.find({ isAdmin: false });
        res.status(200).json({ message: "Doctors Retrived Succefully", doctors });
    }
    catch (error) {
        // Handle errors
        console.error("Error getting doctors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllDoctors = getAllDoctors;
// View details of a single doctor
const getDoctorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    try {
        const doctor = yield doctor_2.default.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    }
    catch (error) {
        console.error("Error getting doctor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getDoctorDetails = getDoctorDetails;
const updateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const updates = req.body;
    try {
        const doctor = yield doctor_2.default.findByIdAndUpdate(doctorId, updates, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor Updated Successfully", doctor });
    }
    catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateDoctor = updateDoctor;
// Delete a doctor
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    try {
        const doctor = yield doctor_2.default.findByIdAndDelete(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor Deleted Successfully", doctor });
    }
    catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteDoctor = deleteDoctor;
// used for authentication
const loginDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ message: "Email or password missing" });
    }
    try {
        const doctor = yield doctor_2.default.findOne({ email });
        if (!doctor) {
            return res.status(404).send({ message: "Email does not Exist" });
        }
        const passwordCheck = bcrypt_1.default.compareSync(password, doctor.password);
        if (!passwordCheck) {
            return res.status(404).send({ message: "Invalid Password" });
        }
        const accessToken = (0, authentication_1.generateAccessToken)(doctor);
        const doctorId = doctor.id;
        const doctorsName = doctor.doctorsName;
        console.log("Doctor", doctor);
        const isAdmin = doctor.isAdmin;
        req.session.token = accessToken;
        req.session.doctorId = doctorId;
        req.session.doctorsName = doctorsName;
        req.session.isAdmin = isAdmin;
        console.log("Session after Login", req.session);
        next();
    }
    catch (error) {
        console.error("Error logging in doctor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.loginDoctor = loginDoctor;
