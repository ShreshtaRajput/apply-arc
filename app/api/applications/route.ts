import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

// GET /api/applications — fetch all apps for a user
export async function GET(req: NextRequest) {
  try {
    const uid = req.headers.get("x-user-uid");
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const applications = await Application.find({ uid }).sort({
      stage: 1,
      order: 1,
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}

// POST /api/applications — create a new application
export async function POST(req: NextRequest) {
  try {
    const uid = req.headers.get("x-user-uid");
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { company, role, stage = "saved" } = body;

    if (!company || !role) {
      return NextResponse.json(
        { error: "Company and role are required" },
        { status: 400 },
      );
    }

    await connectDB();

    // Place new card at the end of its column
    const lastInStage = await Application.findOne({ uid, stage }).sort({
      order: -1,
    });
    const order = lastInStage ? lastInStage.order + 1 : 0;

    const application = await Application.create({
      uid,
      company,
      role,
      stage,
      order,
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}
