import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { redis } from "@/lib/redis";
import { verifyUserAuth } from "@/lib/verifyToken";

// PATCH /api/applications/:id — update stage, order, or any field
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // const uid = req.headers.get("x-user-uid");
    const uid = await verifyUserAuth(req);
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const application = await Application.findOneAndUpdate(
      { _id: id, uid }, // uid check ensures users can only edit their own
      { $set: body },
      { returnDocument: "after" },
    );

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    try {
      await redis.del(`board:${uid}`);
    } catch (redisDelError) {
      console.error(`[Redis DEL Error] Key: board:${uid}`, redisDelError);
    }

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}

// DELETE /api/applications/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // const uid = req.headers.get("x-user-uid");
    const uid = await verifyUserAuth(req);
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectDB();

    const application = await Application.findOneAndDelete({
      _id: id,
      uid,
    });

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    try {
      await redis.del(`board:${uid}`);
    } catch (redisDelError) {
      console.error(`[Redis DEL Error] Key: board:${uid}`, redisDelError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
