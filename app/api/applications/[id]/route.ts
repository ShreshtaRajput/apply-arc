import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

// PATCH /api/applications/:id — update stage, order, or any field
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const uid = req.headers.get("x-user-uid");
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await connectDB();

    const application = await Application.findOneAndUpdate(
      { _id: params.id, uid }, // uid check ensures users can only edit their own
      { $set: body },
      { new: true },
    );

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

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
  { params }: { params: { id: string } },
) {
  try {
    const uid = req.headers.get("x-user-uid");
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const application = await Application.findOneAndDelete({
      _id: params.id,
      uid,
    });

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
