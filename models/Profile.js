import mongoose from "mongoose";

/**
 * Profile Schema – Finalized emergency medical identity for VitalPass
 * All medical fields stored as strings for flexibility
 */
const ProfileSchema = new mongoose.Schema(
  {
    // Basic Identity
    fullName: { type: String, required: true },
    relationship: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    bloodGroup: { type: String },

    // Medical Information
    allergies: { type: String },
    medicalConditions: { type: String },
    medications: { type: String },
    disabilities: { type: String },

    // Emergency Contact
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    emergencyContactRelation: { type: String },

    // Optional Medical Support
    doctorName: { type: String },
    hospitalPreference: { type: String },
    insuranceProvider: { type: String },

    // Other
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent model recompilation in development
export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
