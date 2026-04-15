"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "firebase/auth";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
import { c, g1box, g2box } from "@/lib/theme";
import {
  Target,
  Download,
  AlertTriangle,
  Save,
  Loader2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { auth } from "@/lib/firebase";

export default function Settings() {
  const { user } = useAuth();
  const router = useRouter();
  const applications = useAppSelector((state) => state.board.applications);

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;

    const isConfirmed = window.confirm(
      "Are you absolutely sure you want to delete your account? This will wipe all your data and cannot be undone.",
    );

    if (!isConfirmed) return;

    try {
      const idToken = await auth.currentUser.getIdToken();

      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend Error Response:", errorData);
        throw new Error(errorData.error || "Failed to delete database records");
      }

      await deleteUser(auth.currentUser);
      router.push("/login");
    } catch (error: any) {
      console.error("Error deleting account:", error);

      if (error.code === "auth/requires-recent-login") {
        alert(
          "For security reasons, please log out and log back in before deleting your account.",
        );
      } else {
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  // --- JOB PREFERENCES STATE ---
  const [prefs, setPrefs] = useState({
    currency: "USD ($)",
    weeklyGoal: "10",
    defaultLocation: "Remote",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePrefs = () => {
    setIsSaving(true);
    // Simulate API call to save preferences to Firebase
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  // --- EXPORT FUNCTION ---
  const handleExportData = () => {
    if (applications.length === 0) {
      alert("Your board is empty. Nothing to export!");
      return;
    }
    const headers = [
      "Company",
      "Role",
      "Stage",
      "Location",
      "Salary",
      "Job URL",
      "Notes",
    ];
    const csvRows = applications.map((app) =>
      [
        `"${app.company.replace(/"/g, '""')}"`,
        `"${app.role.replace(/"/g, '""')}"`,
        `"${app.stage}"`,
        `"${(app.location || "").replace(/"/g, '""')}"`,
        `"${(app.salary || "").replace(/"/g, '""')}"`,
        `"${(app.jobUrl || "").replace(/"/g, '""')}"`,
        `"${(app.notes || "").replace(/"/g, '""')}"`,
      ].join(","),
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `ApplyArc_Export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sectionClass =
    "p-6 rounded-2xl relative overflow-hidden transition-colors duration-300";
  const inputStyle = {
    background: c.g2,
    color: c.t1,
    border: `1px solid ${c.b1}`,
    "--tw-ring-color": `${c.indigo}80`,
  } as React.CSSProperties;

  return (
    <div
      className="p-5 md:p-8 max-w-3xl mx-auto min-h-screen pb-24 transition-colors duration-300"
      style={{ background: c.bg0 }}
    >
      {/* HEADER & THEME TOGGLE */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="font-heading text-3xl font-bold tracking-tight"
            style={{ color: c.t1 }}
          >
            Settings
          </h1>
          <p className="text-sm mt-1" style={{ color: c.t3 }}>
            Manage your workflow and data.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* JOB TRACKING PREFERENCES */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={sectionClass}
          style={{ ...g1box, border: `1px solid ${c.b1}` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Target size={20} />
            </div>
            <div>
              <h2
                className="font-heading font-bold text-lg"
                style={{ color: c.t1 }}
              >
                Application Preferences
              </h2>
              <p className="text-xs" style={{ color: c.t3 }}>
                Set your targets and defaults for new cards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                className="text-[11px] font-bold uppercase tracking-wider mb-1.5 block"
                style={{ color: c.t3 }}
              >
                Weekly App Goal
              </label>
              <input
                type="number"
                value={prefs.weeklyGoal}
                onChange={(e) =>
                  setPrefs({ ...prefs, weeklyGoal: e.target.value })
                }
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                className="text-[11px] font-bold uppercase tracking-wider mb-1.5 block"
                style={{ color: c.t3 }}
              >
                Default Location
              </label>
              <select
                value={prefs.defaultLocation}
                onChange={(e) =>
                  setPrefs({ ...prefs, defaultLocation: e.target.value })
                }
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all focus:ring-2 appearance-none"
                style={inputStyle}
              >
                <option value="Remote" className="bg-[#1C1C2E] text-white">
                  Remote
                </option>
                <option value="Hybrid" className="bg-[#1C1C2E] text-white">
                  Hybrid
                </option>
                <option value="On-site" className="bg-[#1C1C2E] text-white">
                  On-site
                </option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={handleSavePrefs}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-lg hover:brightness-110 active:scale-[0.98]"
              style={{ background: c.indigo, color: "#ffffff" }}
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save Preferences
            </button>
          </div>
        </motion.section>

        {/* DATA EXPORT */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={sectionClass}
          style={{ ...g1box, border: `1px solid ${c.b1}` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Download size={20} />
            </div>
            <div>
              <h2
                className="font-heading font-bold text-lg"
                style={{ color: c.t1 }}
              >
                Data Export
              </h2>
              <p className="text-xs" style={{ color: c.t3 }}>
                Download a backup of your Kanban board.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl"
            style={{ ...g2box, border: `1px solid ${c.b1}` }}
          >
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: c.t1 }}>
                Export as CSV
              </div>
              <div className="text-xs" style={{ color: c.t3 }}>
                Includes all applications, stages, salaries, and notes.
              </div>
            </div>
            <button
              onClick={handleExportData}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] shrink-0"
              style={{
                color: c.t1,
                background: c.g1,
                border: `1px solid ${c.b2}`,
              }}
            >
              <Download size={16} />
              Download CSV
            </button>
          </div>
        </motion.section>

        {/* DANGER ZONE */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={sectionClass}
          style={{
            background: "rgba(225, 29, 72, 0.03)",
            border: "1px solid rgba(225, 29, 72, 0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-rose-600 dark:text-rose-400">
                Danger Zone
              </h2>
              <p className="text-xs text-rose-600/70 dark:text-rose-400/70">
                Irreversible actions for your account.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-rose-600/80 dark:text-rose-400/80 max-w-sm font-medium">
              Permanently delete your account and wipe all job application data
              from our servers.
            </div>
            <button
              onClick={handleDeleteAccount}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 active:scale-[0.98] shrink-0"
            >
              Delete Account
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
