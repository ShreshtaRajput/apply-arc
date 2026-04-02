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
  });
  const uid = auth.currentUser?.uid;

  const handleSave = () => {
    if (!uid) return;
    dispatch(
      updateApplication({
        id: application._id,
        uid,
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
      <DialogContent className="bg-[#1C1C2E] border border-white/10 p-6 rounded-xl w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold mb-1">
            {application.company}
          </DialogTitle>
        </DialogHeader>
        <p className="text-white/60">{application.role}</p>
        <p className="text-white/60">Job URL: {application.jobUrl}</p>
        <div>
          <label className="text-white/60 text-sm">Job URL</label>
          <input
            type="text"
            value={formData.jobUrl}
            onChange={(e) =>
              setFormData({ ...formData, jobUrl: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-white/60 text-sm">Salary</label>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-white/60 text-sm">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full bg-[#2A2A3A] border border-white/10 rounded-md px-3 py-2 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className="mt-4 w-full"
          >
            {" "}
            Save Changes{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
