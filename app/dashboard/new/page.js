import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";

/**
 * Add Profile page – Renders ProfileForm for creating a new profile
 */
export default function NewProfilePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <Link
        href="/dashboard"
        style={{
          display: "inline-block",
          marginBottom: "1.5rem",
          color: "#0070f3",
          textDecoration: "none",
          fontSize: "0.95rem",
        }}
      >
        ← Back to Dashboard
      </Link>
      <h1 style={{ marginBottom: "0.5rem", fontSize: "1.75rem" }}>Add Profile</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Create a new emergency medical profile.
      </p>
      <ProfileForm />
    </div>
  );
}
