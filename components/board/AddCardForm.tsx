"use client";

import { useState } from "react";
import { Stage } from "@/types";

interface Props {
  stage: Stage;
  onAdd: (company: string, role: string) => void;
}

export default function AddCardForm({ stage, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If empty, just close the form without adding
    if (!company.trim() || !role.trim()) return;
    onAdd(company, role); //Add the input to prop
    // Reset form and close
    setCompany("");
    setRole("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-white/25 hover:text-white/50 text-xs py-2 rounded-lg hover:bg-white/5 transition-all text-left px-2"
      >
        + Add card
      </button>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-1">
      <input
        autoFocus
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-lg px-3 py-2 text-xs outline-none focus:border-white/25"
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-lg px-3 py-2 text-xs outline-none focus:border-white/25"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-[#FF5533] text-white text-xs py-1.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 text-white/40 text-xs py-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
