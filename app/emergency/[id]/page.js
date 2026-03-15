/**
 * Emergency Profile Page
 * Target for QR code scans: /emergency/{id}
 * For now, simply confirms the profile ID from the QR code URL.
 */
export default function EmergencyProfilePage({ params }) {
  const { id } = params;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Emergency Profile
      </h1>
      <p className="text-slate-600">
        Profile ID: <span className="font-mono">{id}</span>
      </p>
    </div>
  );
}

