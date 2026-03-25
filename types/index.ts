// this is what Redux and the components will use (not the Mongoose doc directly)

export type Stage =
  | "saved"
  | "applied"
  | "oa"
  | "interview"
  | "offer"
  | "rejected";

export interface Application {
  _id: string;
  uid: string;
  company: string;
  role: string;
  stage: Stage;
  order: number;
  jobUrl?: string;
  salary?: string;
  location?: string;
  notes?: string;
  contacts?: string;
  deadline?: string;
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const STAGES: Stage[] = [
  "saved",
  "applied",
  "oa",
  "interview",
  "offer",
  "rejected",
];

export const STAGE_LABELS: Record<Stage, string> = {
  saved: "Saved",
  applied: "Applied",
  oa: "OA",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};
