import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

/**
 * Helper: Convert array values to comma-separated strings
 * This prevents Mongoose CastError when frontend sends arrays
 */
function normalizeField(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value;
}

/**
 * GET /api/profile/[id]
 * Fetch a single profile
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const id = params.id;
    const profile = await Profile.findById(id).lean();

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json(profile);
  } catch (error) {
    console.error("GET /api/profile/[id] error:", error);
    return Response.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile/[id]
 * Update a profile
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const id = params.id;
    const body = await request.json();

    const updateData = {
      fullName: body.fullName,
      relationship: body.relationship,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      gender: body.gender,
      bloodGroup: body.bloodGroup,

      allergies: normalizeField(body.allergies),
      medicalConditions: normalizeField(body.medicalConditions),
      medications: normalizeField(body.medications),
      disabilities: normalizeField(body.disabilities),

      emergencyContactName: body.emergencyContactName,
      emergencyContactPhone: body.emergencyContactPhone,
      emergencyContactRelation: body.emergencyContactRelation,

      doctorName: body.doctorName,
      hospitalPreference: body.hospitalPreference,
      insuranceProvider: body.insuranceProvider,

      notes: body.notes,
    };

    const profile = await Profile.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ success: true, profile });
  } catch (error) {
    console.error("PUT /api/profile/[id] error:", error);
    return Response.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/profile/[id]
 * Delete a profile
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const id = params.id;
    const profile = await Profile.findByIdAndDelete(id);

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/profile/[id] error:", error);
    return Response.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}