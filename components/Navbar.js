import Link from "next/link";

/**
 * Navbar Component
 * Displays app name and provides navigation
 */
export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e5e5e5",
        backgroundColor: "#fff",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#333",
          textDecoration: "none",
        }}
      >
        VitalPass
      </Link>
    </nav>
  );
}
