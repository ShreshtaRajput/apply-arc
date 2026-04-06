"use client";

import { Application } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateApplication } from "@/store/slices/boardSlice";
import { auth } from "@/lib/firebase";

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

  const handleSave = () => {
    if (!auth.currentUser) return;
    dispatch(
      updateApplication({
        id: application._id,
        updates: formData,
      }),
    );
    onClose();
  };

  // const handleSave = () => {
  //   dispatch(
  //     updateApplication({
  //       id: application._id,
  //       updates: formData,
  //     }),
  //   );
  //   onClose();
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C2E] border border-white/10 p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold mb-1">
            Edit Application
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <label className="text-white/60 text-sm">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-white/60 text-sm">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-white/60 text-sm">Stage</label>
          <select
            value={formData.stage}
            onChange={(e) =>
              setFormData({ ...formData, stage: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="oa">OA</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <label className="text-white/60 text-sm">Job URL</label>
          <input
            type="text"
            value={formData.jobUrl}
            onChange={(e) =>
              setFormData({ ...formData, jobUrl: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-white/60 text-sm">Salary</label>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-white/60 text-sm">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-white/60 text-sm">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className="mt-2 w-full"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
