"use client";

import { Application } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C2E] border border-white/10 p-6 rounded-xl w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold mb-1">
            {application.company}
          </DialogTitle>
        </DialogHeader>
        <p className="text-white/60 mb-6">{application.role}</p>
      </DialogContent>
    </Dialog>
  );
}
