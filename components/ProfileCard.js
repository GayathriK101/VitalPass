"use client";

import { useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";

/**
 * ProfileCard
 * Displays a single profile summary with actions and optional QR code.
 *
 * QR GENERATION:
 * - The "Generate QR" button toggles a QR code specific to this profile.
 * - The QR encodes: http://localhost:3000/emergency/{profileId}
 * - Each card owns its own QR visibility state so toggling affects only that card.
 *
 * QR DOWNLOAD:
 * - The "Download QR" button (visible only when QR is shown) captures the QR
 *   container and downloads it as a PNG image using html-to-image.
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

  // Local state to show/hide the QR code for this specific profile card.
  const [showQr, setShowQr] = useState(false);

  // Convert the QR container to a PNG and trigger a download.
  const handleDownloadQr = async () => {
    try {
      const node = document.getElementById(`qr-${profile._id}`);
      if (!node) return;

      const dataUrl = await htmlToImage.toPng(node);
      const link = document.createElement("a");
      link.download = `vitalpass-${profile._id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download QR:", error);
    }
  };

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

  const emergencyUrl = `http://localhost:3000/emergency/${_id}`;

  const truncate = (str, len = 60) =>
    str && str.length > len ? `${str.slice(0, len)}…` : str || "—";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition duration-200 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{fullName}</h3>

      <div className="space-y-1 text-sm text-slate-600 mb-4">
        <p>
          <span className="font-medium">Relationship:</span>{" "}
          <span>{relationship || "—"}</span>
        </p>
        <p>
          <span className="font-medium">Blood Group:</span>{" "}
          <span>{bloodGroup || "—"}</span>
        </p>
        <p>
          <span className="font-medium">Allergies:</span>{" "}
          <span>{truncate(allergies)}</span>
        </p>
        <p>
          <span className="font-medium">Medical Conditions:</span>{" "}
          <span>{truncate(medicalConditions)}</span>
        </p>
        <p>
          <span className="font-medium">Emergency Contact:</span>{" "}
          <span>{emergencyContactName || "—"}</span>
        </p>
        <p>
          <span className="font-medium">Emergency Phone:</span>{" "}
          <span>{emergencyContactPhone || "—"}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Link
          href={`/dashboard/edit/${_id}`}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => setShowQr((prev) => !prev)}
          className="border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-sm hover:bg-slate-50 transition"
        >
          {showQr ? "Hide QR" : "Generate QR"}
        </button>
      </div>

      {showQr && (
        <div className="mt-2 flex flex-col items-center gap-2">
          {/* QR container with unique ID used for PNG download */}
          <div id={`qr-${_id}`} className="bg-white p-2 rounded">
            <QRCode value={emergencyUrl} size={120} />
          </div>
          <p className="text-xs text-slate-600 text-center max-w-[220px]">
            Scan in emergency to access medical information
          </p>
          <button
            type="button"
            onClick={handleDownloadQr}
            className="mt-1 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 transition"
          >
            Download QR
          </button>
        </div>
      )}
    </div>
  );
}

