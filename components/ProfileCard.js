"use client";

import Link from "next/link";

/**
 * ProfileCard – Displays emergency summary and Edit/Delete actions
 * Shows: Full Name, Relationship, Blood Group, Allergies, Medical Conditions, Emergency Contact
 */
export default function ProfileCard({ profile, onDelete }) {
  const {
    _id,
    fullName,
    relationship,
    bloodGroup,
    allergies,
    medicalConditions,
    emergencyContactName,
    emergencyContactPhone,
  } = profile;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the profile for ${fullName}? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/profile/${_id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      onDelete?.();
    } catch (err) {
      alert(err.message || "Failed to delete profile");
    }
  };

  const cardStyle = {
    padding: "1.25rem",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const fieldStyle = {
    margin: "0.25rem 0",
    color: "#555",
    fontSize: "0.9rem",
  };

  const btnStyle = {
    marginRight: "0.5rem",
    marginTop: "0.75rem",
    padding: "0.4rem 0.75rem",
    fontSize: "0.875rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem" }}>{fullName}</h3>
      <p style={fieldStyle}><strong>Relationship:</strong> {relationship || "—"}</p>
      <p style={fieldStyle}><strong>Blood Group:</strong> {bloodGroup || "—"}</p>
      <p style={fieldStyle}><strong>Allergies:</strong> {allergies ? (allergies.length > 60 ? allergies.slice(0, 60) + "…" : allergies) : "—"}</p>
      <p style={fieldStyle}><strong>Medical Conditions:</strong> {medicalConditions ? (medicalConditions.length > 60 ? medicalConditions.slice(0, 60) + "…" : medicalConditions) : "—"}</p>
      <p style={fieldStyle}><strong>Emergency Contact:</strong> {emergencyContactName || "—"}</p>
      <p style={fieldStyle}><strong>Emergency Phone:</strong> {emergencyContactPhone || "—"}</p>

      <div>
        <Link
          href={`/dashboard/edit/${_id}`}
          style={{
            ...btnStyle,
            backgroundColor: "#0070f3",
            color: "white",
          }}
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          style={{
            ...btnStyle,
            backgroundColor: "#dc2626",
            color: "white",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
