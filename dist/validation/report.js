"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ReportSchema = zod_1.z.object({
    patientsName: zod_1.z.string(),
    Age: zod_1.z.number(),
    hospitalName: zod_1.z.string(),
    weight: zod_1.z.string(),
    height: zod_1.z.string(),
    bloodGroup: zod_1.z.string(),
    genotype: zod_1.z.string(),
    bloodPressure: zod_1.z.string(),
    HIV_status: zod_1.z.string(),
    hepatitis: zod_1.z.string(),
    createdAt: zod_1.z.date().default(() => new Date()),
});
exports.default = ReportSchema;
