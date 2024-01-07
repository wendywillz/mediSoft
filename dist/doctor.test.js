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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
describe("GET, POST, PUT, DELETE and LOGIN operations on Doctor Routes", () => {
    let accessToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const loginCredentials = {
            email: "test@example.com",
            password: "testpassword",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/doctor/login")
            .send(loginCredentials);
        accessToken = response.body.accessToken;
    }));
    it("should GET all doctors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/doctor");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it("should POST a new doctor", () => __awaiter(void 0, void 0, void 0, function* () {
        const newDoctor = {
            doctorsName: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            specialization: "Surgeon",
            gender: "Male",
            phonenumber: "1234567890",
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/doctor/reg").send(newDoctor);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    }));
    it("should PUT a doctor", () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorToUpdate = {
            doctorsName: "Updated Name",
            email: "updated@example.com",
        };
        const existingDoctorId = "5948026e-e0be-4d36-9fbf-0702c8ad51e8";
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/doctor/${existingDoctorId}`)
            .send(doctorToUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("doctorsName", doctorToUpdate.doctorsName);
    }), 10000);
    it("should DELETE a doctor", () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorToDeleteId = "2b565232-627b-4d2a-8133-415643dec9f4";
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/doctor/${doctorToDeleteId}`);
        expect(response.status).toBe(204);
    }));
    it("should LOGIN a doctor", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginCredentials = {
            email: "john.doe@example.com",
            password: "password123",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/doctor/login")
            .send(loginCredentials);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
    }));
});
