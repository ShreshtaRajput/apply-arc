"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Loader2, X, CheckCircle2, AlertTriangle, Mail } from "lucide-react";
import { c, g1box } from "@/lib/theme";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
      setMessage("Check your inbox! We've sent a secure reset link.");
      //setEmail("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(
        err.code === "auth/user-not-found"
          ? "No account found with that email address."
          : "Failed to send reset email. Please try again.",
      );
    }
  };

  // Reset state when modal closes
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
      setEmail("");
    }, 300);
  };

  const inputStyle = {
    background: c.g2,
    color: c.t1,
    border: `1px solid ${c.b1}`,
    "--tw-ring-color": `${c.indigo}80`,
  } as React.CSSProperties;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 backdrop-blur-sm bg-black/60"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md p-6 rounded-2xl relative pointer-events-auto shadow-2xl"
              style={{ ...g1box, background: "rgba(12, 12, 20, 0.95)" }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: c.t3 }}
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Mail size={24} />
                </div>
                <h2
                  className="font-heading text-xl font-bold"
                  style={{ color: c.t1 }}
                >
                  Reset Password
                </h2>
                <p className="text-sm mt-1" style={{ color: c.t3 }}>
                  Enter your email address and we'll send you a link to get back
                  into your account.
                </p>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl flex gap-3 items-start bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-emerald-400 font-medium">
                    {message}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl flex gap-3 items-start bg-rose-500/10 border border-rose-500/20">
                  <AlertTriangle
                    size={18}
                    className="text-rose-400 shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-rose-400 font-medium">{message}</p>
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label
                    className="text-[11px] font-bold uppercase tracking-wider mb-1.5 block"
                    style={{ color: c.t3 }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:brightness-110 active:scale-[0.98]"
                  style={{ background: c.indigo, color: "#ffffff" }}
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
