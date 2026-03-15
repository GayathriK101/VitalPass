"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";

/**
 * Edit Profile page – Fetches profile by ID and renders ProfileForm in edit mode
 */
export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      try {
        const response = await fetch(`/api/profile/${id}`);
        if (!response.ok) {
          if (response.status === 404) setError("Profile not found");
          else throw new Error("Failed to load profile");
          return;
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <p style={{ color: "#666" }}>Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{ padding: "2rem" }}>
        <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error || "Profile not found"}</p>
        <Link href="/dashboard" style={{ color: "#0070f3", textDecoration: "none" }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

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
      <h1 style={{ marginBottom: "0.5rem", fontSize: "1.75rem" }}>Edit Profile</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Update emergency medical profile for {profile.fullName}.
      </p>
      <ProfileForm initialData={profile} profileId={id} />
    </div>
  );
}
