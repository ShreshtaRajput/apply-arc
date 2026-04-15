import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserProfile from "@/models/userModel";
import { connectDB } from "@/lib/mongodb";
import { verifyUserAuth } from "@/lib/verifyToken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Authenticate Request
    let uid: string;
    try {
      uid = await verifyUserAuth(req);
    } catch (authError: any) {
      // If verifyUserAuth throws, catch it and return 401
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    // Fetch the profile
    const profile = await UserProfile.findOne({ uid });
    // Return empty object if no profile exists yet
    return NextResponse.json(profile || {});
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Authenticate Request
    let uid: string;
    try {
      uid = await verifyUserAuth(req);
    } catch (authError: any) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    const body = await req.json();

    // Prevent users from manually overriding their uid in the database
    delete body.uid;

    // Find by UID and update, or create a new document if one isn't found (upsert: true)
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { uid },
      { $set: body },
      { new: true, upsert: true, runValidators: true },
    );

    return NextResponse.json(updatedProfile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
