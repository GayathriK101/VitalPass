"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * ProfileForm – Reusable form for creating and editing emergency medical profiles
 * When initialData is provided, runs in edit mode (PUT). Otherwise create mode (POST).
 */
export default function ProfileForm({ initialData = null, profileId = null }) {
  const router = useRouter();
  const isEditMode = Boolean(profileId && initialData);

  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [medications, setMedications] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalPreference, setHospitalPreference] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (!initialData) return;
    setFullName(initialData.fullName || "");
    setRelationship(initialData.relationship || "");
    setDateOfBirth(
      initialData.dateOfBirth
        ? new Date(initialData.dateOfBirth).toISOString().slice(0, 10)
        : ""
    );
    setGender(initialData.gender || "");
    setBloodGroup(initialData.bloodGroup || "");
    setAllergies(initialData.allergies || "");
    setMedicalConditions(initialData.medicalConditions || "");
    setMedications(initialData.medications || "");
    setDisabilities(initialData.disabilities || "");
    setEmergencyContactName(initialData.emergencyContactName || "");
    setEmergencyContactPhone(initialData.emergencyContactPhone || "");
    setEmergencyContactRelation(initialData.emergencyContactRelation || "");
    setDoctorName(initialData.doctorName || "");
    setHospitalPreference(initialData.hospitalPreference || "");
    setInsuranceProvider(initialData.insuranceProvider || "");
    setNotes(initialData.notes || "");
  }, [initialData]);

  const buildPayload = () => ({
    fullName,
    relationship: relationship || undefined,
    dateOfBirth: dateOfBirth || undefined,
    gender: gender || undefined,
    bloodGroup: bloodGroup || undefined,
    allergies: allergies || undefined,
    medicalConditions: medicalConditions || undefined,
    medications: medications || undefined,
    disabilities: disabilities || undefined,
    emergencyContactName: emergencyContactName || undefined,
    emergencyContactPhone: emergencyContactPhone || undefined,
    emergencyContactRelation: emergencyContactRelation || undefined,
    doctorName: doctorName || undefined,
    hospitalPreference: hospitalPreference || undefined,
    insuranceProvider: insuranceProvider || undefined,
    notes: notes || undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const url = isEditMode ? `/api/profile/${profileId}` : "/api/profile";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save profile");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const formSectionStyle = { marginBottom: "2rem" };
  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 500,
    fontSize: "0.95rem",
  };
  const inputStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };
  const textareaStyle = { ...inputStyle, minHeight: "80px", resize: "vertical" };
  const selectStyle = { ...inputStyle, cursor: "pointer" };
  const sectionTitleStyle = {
    fontSize: "1.125rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#333",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
      {/* Basic Identity */}
      <section style={formSectionStyle}>
        <h2 style={sectionTitleStyle}>Basic Identity</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="fullName" style={labelStyle}>Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="relationship" style={labelStyle}>Relationship</label>
          <select
            id="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select relationship</option>
            <option value="Self">Self</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Child">Child</option>
            <option value="Sibling">Sibling</option>
            <option value="Grandparent">Grandparent</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="dateOfBirth" style={labelStyle}>Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="gender" style={labelStyle}>Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="bloodGroup" style={labelStyle}>Blood Group</label>
          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </section>

      {/* Medical Information */}
      <section style={formSectionStyle}>
        <h2 style={sectionTitleStyle}>Medical Information</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="allergies" style={labelStyle}>Allergies</label>
          <textarea
            id="allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            style={textareaStyle}
            placeholder="List any allergies"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="medicalConditions" style={labelStyle}>Medical Conditions</label>
          <textarea
            id="medicalConditions"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            style={textareaStyle}
            placeholder="Known medical conditions"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="medications" style={labelStyle}>Medications</label>
          <textarea
            id="medications"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            style={textareaStyle}
            placeholder="Current medications"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="disabilities" style={labelStyle}>Disabilities</label>
          <textarea
            id="disabilities"
            value={disabilities}
            onChange={(e) => setDisabilities(e.target.value)}
            style={textareaStyle}
            placeholder="Disabilities or special needs"
          />
        </div>
      </section>

      {/* Emergency Contact */}
      <section style={formSectionStyle}>
        <h2 style={sectionTitleStyle}>Emergency Contact</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="emergencyContactName" style={labelStyle}>Emergency Contact Name</label>
          <input
            id="emergencyContactName"
            type="text"
            value={emergencyContactName}
            onChange={(e) => setEmergencyContactName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="emergencyContactPhone" style={labelStyle}>Emergency Contact Phone</label>
          <input
            id="emergencyContactPhone"
            type="tel"
            value={emergencyContactPhone}
            onChange={(e) => setEmergencyContactPhone(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="emergencyContactRelation" style={labelStyle}>Emergency Contact Relation</label>
          <input
            id="emergencyContactRelation"
            type="text"
            value={emergencyContactRelation}
            onChange={(e) => setEmergencyContactRelation(e.target.value)}
            style={inputStyle}
            placeholder="e.g. Spouse, Parent"
          />
        </div>
      </section>

      {/* Optional Medical Support */}
      <section style={formSectionStyle}>
        <h2 style={sectionTitleStyle}>Optional Medical Support</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="doctorName" style={labelStyle}>Doctor Name</label>
          <input
            id="doctorName"
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="hospitalPreference" style={labelStyle}>Hospital Preference</label>
          <input
            id="hospitalPreference"
            type="text"
            value={hospitalPreference}
            onChange={(e) => setHospitalPreference(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="insuranceProvider" style={labelStyle}>Insurance Provider</label>
          <input
            id="insuranceProvider"
            type="text"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
            style={inputStyle}
          />
        </div>
      </section>

      {/* Notes */}
      <section style={formSectionStyle}>
        <h2 style={sectionTitleStyle}>Other</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="notes" style={labelStyle}>Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ ...textareaStyle, minHeight: "100px" }}
            placeholder="Additional notes or special instructions"
          />
        </div>
      </section>

      {error && (
        <p style={{ color: "#dc2626", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: isSubmitting ? "#94a3b8" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: 500,
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Saving..." : isEditMode ? "Update Profile" : "Save Medical Profile"}
      </button>
    </form>
  );
}
