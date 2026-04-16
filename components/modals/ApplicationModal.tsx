"use client";

import { Application, Stage } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  updateApplication,
  selectByStage,
  deleteApplication,
} from "@/store/slices/boardSlice";
import { auth } from "@/lib/firebase";
import { c, g1box } from "@/lib/theme";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  application: Application;
}

export default function ApplicationModal({
  isOpen,
  onClose,
  application,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    company: application.company,
    role: application.role,
    jobUrl: application.jobUrl || "",
    salary: application.salary || "",
    location: application.location || "",
    notes: application.notes || "",
    stage: application.stage || "saved",
  });

  // State for the delete operation
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const targetColumnApps = useSelector(selectByStage(formData.stage as Stage));

  const handleSave = () => {
    if (!auth.currentUser) return;

    const finalUpdates: any = {};

    // Standard fields: Only update if changed
    if (formData.company !== application.company)
      finalUpdates.company = formData.company;
    if (formData.role !== application.role) finalUpdates.role = formData.role;

    // Optional fields: Only update if changed, prevents sending "" to the DB
    if (formData.jobUrl !== (application.jobUrl || ""))
      finalUpdates.jobUrl = formData.jobUrl;
    if (formData.salary !== (application.salary || ""))
      finalUpdates.salary = formData.salary;
    if (formData.location !== (application.location || ""))
      finalUpdates.location = formData.location;
    if (formData.notes !== (application.notes || ""))
      finalUpdates.notes = formData.notes;

    // Stage change: Add the new stage AND calculate the target order
    if (formData.stage !== application.stage) {
      finalUpdates.stage = formData.stage;
      finalUpdates.order = targetColumnApps.length;
    }

    // Abort if no changes were actually made
    if (Object.keys(finalUpdates).length === 0) {
      onClose();
      return;
    }

    // Dispatch payload
    dispatch(
      updateApplication({
        id: application._id,
        updates: finalUpdates,
      }),
    );

    onClose();
    // if (!auth.currentUser) return;
    // dispatch(
    //   updateApplication({
    //     id: application._id,
    //     updates: formData,
    //   }),
    // );
    // onClose();
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this application? This cannot be undone.",
    );
    if (!isConfirmed) return;

    setIsDeleting(true);
    setError("");

    try {
      // .unwrap() allows us to catch any errors thrown by the async thunk
      await dispatch(deleteApplication({ id: application._id })).unwrap();
      onClose();
    } catch (err: any) {
      console.error("[Delete Application Error]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Reusable input style object to keep markup clean
  const inputStyle = {
    background: c.g2,
    color: c.t1,
    border: `1px solid ${c.b1}`,
    "--tw-ring-color": `${c.indigo}80`,
  } as React.CSSProperties;

  const labelClass =
    "text-[11px] font-bold uppercase tracking-wider mb-1.5 block";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-0 border-none rounded-[24px] w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        style={{ ...g1box, background: c.g1 }}
      >
        {/* Header Area */}
        <div className="px-6 py-5 border-b" style={{ borderColor: c.b1 }}>
          <DialogHeader>
            <DialogTitle
              className="text-xl font-extrabold tracking-wide"
              style={{ color: c.t1 }}
            >
              Application Details
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-6 overflow-y-auto theme-scrollbar space-y-5">
          {/* Company - Full Width */}
          <div>
            <label className={labelClass} style={{ color: c.t3 }}>
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2"
              style={inputStyle}
            />
          </div>

          {/* Grid Row 1: Role & Stage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={{ color: c.t3 }}>
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2"
                style={inputStyle}
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: c.t3 }}>
                Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) =>
                  setFormData({ ...formData, stage: e.target.value as Stage })
                }
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2 appearance-none cursor-pointer"
                style={inputStyle}
              >
                <option value="saved" className="bg-[#1C1C2E] text-white">
                  Saved
                </option>
                <option value="applied" className="bg-[#1C1C2E] text-white">
                  Applied
                </option>
                <option value="oa" className="bg-[#1C1C2E] text-white">
                  Online Assessment
                </option>
                <option value="interview" className="bg-[#1C1C2E] text-white">
                  Interview
                </option>
                <option value="offer" className="bg-[#1C1C2E] text-white">
                  Offer
                </option>
                <option value="rejected" className="bg-[#1C1C2E] text-white">
                  Rejected
                </option>
              </select>
            </div>
          </div>

          {/* Grid Row 2: Location & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={{ color: c.t3 }}>
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g. Remote, NY"
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2"
                style={inputStyle}
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: c.t3 }}>
                Salary / Comp
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
                placeholder="e.g. $120k - $140k"
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Job URL - Full Width */}
          <div>
            <label className={labelClass} style={{ color: c.t3 }}>
              Job URL
            </label>
            <input
              type="text"
              value={formData.jobUrl}
              onChange={(e) =>
                setFormData({ ...formData, jobUrl: e.target.value })
              }
              placeholder="https://..."
              className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2 text-blue-400 placeholder:text-white/20"
              style={inputStyle}
            />
          </div>

          {/* Notes - Full Width */}
          <div>
            <label className={labelClass} style={{ color: c.t3 }}>
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Jot down interview details, recruiter names, etc."
              className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 resize-y min-h-[100px]"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Footer Action Area */}
        <div
          className="px-6 py-5 border-t flex justify-end gap-3"
          style={{ background: c.g2, borderColor: c.b1 }}
        >
          <button
            onClick={handleDelete}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] hover:brightness-110"
            style={{ color: c.t2, border: `1px solid ${c.b2}` }}
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] shadow-lg hover:brightness-110"
            style={{ background: c.indigo, color: "#ffffff" }}
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
