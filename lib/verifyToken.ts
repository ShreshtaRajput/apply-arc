import { adminAuth } from "./firebaseAdmin";
import { NextRequest } from "next/server";
import { connectDB } from "./mongodb";
import Application from "@/models/Application";
import UserProfile from "@/models/userModel";

export async function verifyUserAuth(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  // Extracting just the token part from the header
  const token = authHeader.split(" ")[1];

  let uid: string = "";
  // Extracting the uid from the firebase token
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64").toString(),
    );
    uid = decodedPayload.user_id; // Firebase raw tokens store the uid as 'user_id'
  } catch (error) {
    throw new Error("Unauthorized: Malformed token");
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch (error: any) {
    console.error("Error code:", error.code);
    if (error.code === "auth/user-not-found") {
      console.log(`User ${uid} deleted. Cleaning up MongoDB data...`);
      await connectDB();
      await Application.deleteMany({ uid });
      await UserProfile.deleteOne({ uid });
    } else {
      console.error("Token verification failed:", error);
      throw new Error("Unauthorized: Invalid token");
    }

    // Throw so the route still returns 401
    throw new Error("Unauthorized: Invalid or expired token");
  }
}
