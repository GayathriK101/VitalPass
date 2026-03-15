"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

/**
 * Family Profiles Dashboard
 * Fetches all profiles from GET /api/profile and displays cards with Edit/Delete
 */
export default function DashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profiles");
      const data = await response.json();
      setProfiles(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <div style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Family Profiles</h1>
        <Link
          href="/dashboard/new"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Add Profile
        </Link>
      </div>

      {loading && <p style={{ color: "#666" }}>Loading profiles...</p>}

      {error && (
        <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p>
      )}

      {!loading && !error && profiles.length === 0 && (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            border: "1px dashed #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            No profiles yet. Add your first emergency medical profile.
          </p>
          <Link
            href="/dashboard/new"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#0070f3",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: 500,
            }}
          >
            Add Profile
          </Link>
        </div>
      )}

      {!loading && !error && profiles.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              onDelete={fetchProfiles}
            />
          ))}
        </div>
      )}
    </div>
  );
}
