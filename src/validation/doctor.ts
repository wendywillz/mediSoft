import { z } from "zod";

const DoctorSchema = z.object({
  email: z.string().email(),
  password: z
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

  doctorsName: z
    .string()
    .refine((value) => typeof value === "string" && value.length > 0, {
      message: "Doctor's Name must be a non-empty string",
    }),

  specialization: z
    .string()
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),

  gender: z.enum(["Male", "Female"]),

  phonenumber: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" }),
  
  isAdmin: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export default DoctorSchema;
