import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  uid: string; // Firebase user id — every doc is scoped to a user
  company: string;
  role: string;
  stage: "saved" | "applied" | "oa" | "interview" | "offer" | "rejected";
  order: number; // position within the column for drag-and-drop ordering

  // Optional details
  jobUrl?: string;
  salary?: string;
  location?: string;
  notes?: string;
  contacts?: string;
  deadline?: Date;

  appliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    uid: { type: String, required: true, index: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    stage: {
      type: String,
      enum: ["saved", "applied", "oa", "interview", "offer", "rejected"],
      default: "saved",
    },
    order: { type: Number, default: 0 },

    // Optional fields
    jobUrl: { type: String },
    salary: { type: String },
    location: { type: String },
    notes: { type: String },
    contacts: { type: String },
    deadline: { type: Date },
    appliedAt: { type: Date },
  },
  {
    timestamps: true, // auto-manages createdAt + updatedAt
  },
);

// Prevents model re-compilation on hot reload
const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
