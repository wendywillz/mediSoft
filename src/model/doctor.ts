import mongoose from "mongoose";


const DoctorSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  doctorsName: String,
  specialization: String,
  gender: String,
  phonenumber: { type: Number, unique: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;