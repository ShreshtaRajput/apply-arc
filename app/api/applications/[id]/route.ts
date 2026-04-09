import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { redis } from "@/lib/redis";
import { verifyUserAuth } from "@/lib/verifyToken";
import getIO from "@/lib/socket";
import { ApplicationPatchSchema } from "@/lib/validation/application";
import { ratelimit } from "@/lib/ratelimit";

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

    const { success } = await ratelimit.limit(uid);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { id } = await params;
    const body = await req.json();
    const result = ApplicationPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await connectDB();

    const application = await Application.findOneAndUpdate(
      { _id: id, uid }, // uid check ensures users can only edit their own
      { $set: result.data },
      { returnDocument: "after" },
    );

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    try {
      getIO().emit("board:updated", { type: "update", application });
    } catch (socketError) {
      console.error("[Socket emit error]", socketError);
    }

    try {
      await redis.del(`board:${uid}`);
    } catch (redisDelError) {
      console.error(`[Redis DEL Error] Key: board:${uid}`, redisDelError);
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("[Application PATCH Error]", error);

    // Safeguard for malformed JSON payloads
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 },
      );
    }

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

    const { success } = await ratelimit.limit(uid);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { id } = await params;
    await connectDB();

    const application = await Application.findOneAndDelete({
      _id: id,
      uid,
    });

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    try {
      getIO().emit("board:updated", {
        type: "delete",
        application: application._id.toString(),
      });
    } catch (socketError) {
      console.error("[Socket emit error]", socketError);
    }

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
