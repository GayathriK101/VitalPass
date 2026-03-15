import Link from "next/link";

/**
 * VitalPass Homepage
 * Single entry point – Manage Family Profiles
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
        Emergency Medical Identity System
      </p>

      <Link
        href="/dashboard"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: 500,
        }}
      >
        Manage Family Profiles
      </Link>
    </div>
  );
}
