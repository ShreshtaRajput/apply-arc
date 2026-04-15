import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserProfile extends Document {
  uid: string;
  displayName?: string;
  about?: string;
  gender?: "male" | "female" | "non-binary" | "prefer-not-to-say";
  phone?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    uid: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, trim: true },
    about: { type: String, trim: true, maxlength: 300 },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer-not-to-say"],
    },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

const UserProfile: Model<IUserProfile> =
  mongoose.models.UserProfile ||
  mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);

export default UserProfile;
