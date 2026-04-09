import { z } from "zod";

export const ApplicationPostSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  stage: z
    .enum(["saved", "applied", "oa", "interview", "offer", "rejected"])
    .default("saved"),
});

export const ApplicationPatchSchema = z.object({
  company: z.string().min(1, "Company is required").optional(),
  role: z.string().min(1, "Role is required").optional(),
  stage: z
    .enum(["saved", "applied", "oa", "interview", "offer", "rejected"])
    .optional(),
  jobUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  salary: z.number().positive("Salary must be a positive number").optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  contacts: z.string().optional(),
  deadline: z.string().optional(),
  appliedAt: z.string().optional(),
  order: z.number().int().min(0).optional(),
});
