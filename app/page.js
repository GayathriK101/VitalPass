import Link from "next/link";

/**
 * VitalPass Homepage
 * Entry point with options to create profile or manage family profiles
 */
export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>VitalPass</h1>
      <p style={{ color: "#666", marginBottom: "2rem", fontSize: "1.125rem" }}>
        Your Emergency Medical Identity
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href="/create-profile"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: 500,
          }}
        >
          Create Profile For Yourself
        </Link>
        <Link
          href="/dashboard"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#333",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: 500,
          }}
        >
          Manage Family Profiles
        </Link>
      </div>
    </div>
  );
}
