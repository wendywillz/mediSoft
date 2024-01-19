import {z} from "zod";

const ReportSchema = z.object({
    patientsName: z.string(),
    Age: z.number(),
    hospitalName: z.string(),
    weight: z.string(),
    height: z.string(),
    bloodGroup: z.string(),
    genotype: z.string(),
    bloodPressure: z.string(),
    HIV_status: z.string(),
    hepatitis: z.string(),
    createdAt: z.date().default(() => new Date()),
});


export default ReportSchema;