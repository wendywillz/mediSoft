"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const DoctorSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" })
        .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
    })
        .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
    })
        .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
    })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character",
    }),
    doctorsName: zod_1.z
        .string()
        .refine((value) => typeof value === "string" && value.length > 0, {
        message: "Doctor's Name must be a non-empty string",
    }),
    specialization: zod_1.z
        .string()
        .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
    gender: zod_1.z.enum(["Male", "Female"]),
    phonenumber: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password must not exceed 20 characters" }),
    isAdmin: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date().default(() => new Date()),
});
exports.default = DoctorSchema;
