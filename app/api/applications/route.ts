import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { IApplication } from "@/models/Application";
import { redis } from "@/lib/redis";
import { verifyUserAuth } from "@/lib/verifyToken";
import getIO from "@/lib/socket";
import { ApplicationPostSchema } from "@/lib/validation/application";
import { ratelimit } from "@/lib/ratelimit";

// GET /api/applications — fetch all apps for a user
export async function GET(req: NextRequest) {
  try {
    // const uid = req.headers.get("x-user-uid");
    const uid = await verifyUserAuth(req);
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { success } = await ratelimit.limit(uid);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const cacheKey = `board:${uid}`;

    try {
      const cachedData = await redis.get<IApplication[]>(cacheKey);
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    } catch (redisGetError) {
      console.error(`[Redis GET Error] Key: ${cacheKey}`, redisGetError);
    }

    await connectDB();
    const applications = await Application.find({ uid }).sort({
      stage: 1,
      order: 1,
    });

    try {
      await redis.set(cacheKey, applications, { ex: 60 });
    } catch (redisSetError) {
      console.error(`[Redis SET Error] Key: ${cacheKey}`, redisSetError);
    }

    return NextResponse.json(applications);
  } catch (error) {
    console.error("[GET /api/applications Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}

// POST /api/applications — create a new application
export async function POST(req: NextRequest) {
  try {
    // const uid = req.headers.get("x-user-uid");
    const uid = await verifyUserAuth(req);
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { success } = await ratelimit.limit(uid);
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const result = ApplicationPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { company, stage, role } = result.data;

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

    try {
      getIO().emit("board:updated", { type: "create", application });
    } catch (socketError) {
      console.error("[Socket emit error]", socketError);
    }

    try {
      await redis.del(`board:${uid}`);
    } catch (redisDelError) {
      console.error(`[Redis DEL Error] Key: board:${uid}`, redisDelError);
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("[Application POST Error]", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}
