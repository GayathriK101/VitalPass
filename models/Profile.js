import mongoose from "mongoose";

/**
 * Profile Schema
 * Emergency medical identity profile for VitalPass
 */
const ProfileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    relationship: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    bloodGroup: { type: String },
    allergies: { type: [String], default: [] },
    medicalConditions: { type: [String], default: [] },
    medications: { type: [String], default: [] },
    disabilities: { type: [String], default: [] },
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent model recompilation in development
export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
