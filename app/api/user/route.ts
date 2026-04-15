import { NextRequest, NextResponse } from "next/server";
import { verifyUserAuth } from "@/lib/verifyToken";
import { redis } from "@/lib/redis";
import { ratelimit } from "@/lib/ratelimit";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import UserProfile from "@/models/userModel";

export async function DELETE(req: NextRequest) {
  try {
    const uid = await verifyUserAuth(req);
    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting to prevent abuse
    const { success } = await ratelimit.limit(uid);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    await connectDB();

    // Wipe all applications tied to this user
    await Application.deleteMany({ uid });

    // Wipe the user's profile document
    await UserProfile.findOneAndDelete({ uid });

    // Clear their Kanban board cache from Redis
    try {
      await redis.del(`board:${uid}`);
    } catch (redisDelError) {
      console.error(`[Redis DEL Error] Key: board:${uid}`, redisDelError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[User Deletion Error]", error);
    return NextResponse.json(
      { error: "Failed to delete user data" },
      { status: 500 },
    );
  }
}
