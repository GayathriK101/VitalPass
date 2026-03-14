/**
 * Profile Detail Page
 * Displays a single emergency medical profile by ID
 */
export default function ProfilePage({ params }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Profile Details</h1>
      <p style={{ marginTop: "1rem", color: "#666" }}>
        Profile view for ID: {params.id}
      </p>
    </div>
  );
}
