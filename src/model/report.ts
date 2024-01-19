import mongoose from "mongoose";
import Doctor from "./doctor";



const ReportSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: Doctor },
  patientsName: String,
  Age: Number,
  hospitalName: String,
  weight: String,
  height: String,
  bloodGroup: String,
  genotype: String,
  bloodPressure: String,
  HIV_status: String,
  hepatitis: String,
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", ReportSchema);

export default Report;
