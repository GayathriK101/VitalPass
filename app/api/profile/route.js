import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

/**
 * GET /api/profile
 * Fetches all profiles from MongoDB, sorted by createdAt descending
 */
export async function GET() {
  try {
    await connectDB();
    const profiles = await Profile.find({}).sort({ createdAt: -1 }).lean();
    return Response.json(profiles);
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return Response.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/profile
 * Creates a new profile from request body and saves to MongoDB
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const profileData = {
      fullName: body.fullName,
      relationship: body.relationship,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      gender: body.gender,
      bloodGroup: body.bloodGroup,
      allergies: body.allergies,
      medicalConditions: body.medicalConditions,
      medications: body.medications,
      disabilities: body.disabilities,
      emergencyContactName: body.emergencyContactName,
      emergencyContactPhone: body.emergencyContactPhone,
      emergencyContactRelation: body.emergencyContactRelation,
      doctorName: body.doctorName,
      hospitalPreference: body.hospitalPreference,
      insuranceProvider: body.insuranceProvider,
      notes: body.notes,
    };

    const profile = new Profile(profileData);
    await profile.save();

    return Response.json({
      success: true,
      profile: { _id: profile._id, fullName: profile.fullName },
    });
  } catch (error) {
    console.error("POST /api/profile error:", error);
    return Response.json(
      { error: error.message || "Failed to create profile" },
      { status: 500 }
    );
  }
}
