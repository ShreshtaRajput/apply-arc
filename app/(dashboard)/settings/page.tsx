"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { c, displayFont, g1box, fadeUp } from "@/lib/theme";
import {
  RxBell,
  RxDashboard,
  RxDownload,
  RxTrash,
  RxLockClosed,
} from "react-icons/rx";

// Reusable Toggle Component
const Toggle = ({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
    }}
  >
    <div>
      <div
        style={{ fontSize: 14, color: c.t1, fontWeight: 500, marginBottom: 2 }}
      >
        {label}
      </div>
      {description && (
        <div style={{ fontSize: 12, color: c.t3 }}>{description}</div>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: enabled ? c.emerald : "rgba(255,255,255,0.08)",
        border: `1px solid ${enabled ? "transparent" : c.b1}`,
        display: "flex",
        alignItems: "center",
        padding: 2,
        cursor: "pointer",
        transition: "background 0.2s ease, border-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  </div>
);

export default function SettingsPage() {
  // Local state for UI toggles (can be moved to Redux/DB later)
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserPush, setBrowserPush] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [hideRejected, setHideRejected] = useState(false);

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
    fontWeight: 600,
    color: c.t1,
    borderBottom: `1px solid ${c.b1}`,
    paddingBottom: 12,
    marginBottom: 16,
  };

  return (
    <div
      style={{
        padding: "40px 30px",
        maxWidth: 760,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 40 }}>
        <h1
          style={{
            ...displayFont,
            fontSize: 32,
            fontWeight: 700,
            color: c.t1,
            marginBottom: 8,
          }}
        >
          Settings
        </h1>
        <p style={{ color: c.t2, fontSize: 15 }}>
          Customize your board view, notifications, and data preferences.
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Board Preferences */}
        <motion.section
          {...fadeUp(0.1)}
          style={{ ...g1box, borderRadius: 16, padding: 24 }}
        >
          <h2 style={sectionHeaderStyle}>
            <RxDashboard color={c.indigo} size={18} /> Board Preferences
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Toggle
              label="Compact Board View"
              description="Reduce the size of cards to see more applications at once."
              enabled={compactMode}
              onChange={setCompactMode}
            />
            <div style={{ height: 1, background: c.b1, margin: "4px 0" }} />
            <Toggle
              label="Hide Rejected Applications"
              description="Automatically hide applications moved to the 'Rejected' column."
              enabled={hideRejected}
              onChange={setHideRejected}
            />
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section
          {...fadeUp(0.2)}
          style={{ ...g1box, borderRadius: 16, padding: 24 }}
        >
          <h2 style={sectionHeaderStyle}>
            <RxBell color={c.amber} size={18} /> Notifications
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Toggle
              label="Email Alerts"
              description="Receive weekly summaries and upcoming deadline reminders."
              enabled={emailAlerts}
              onChange={setEmailAlerts}
            />
            <div style={{ height: 1, background: c.b1, margin: "4px 0" }} />
            <Toggle
              label="Browser Push Notifications"
              description="Get real-time alerts when board collaborators make changes."
              enabled={browserPush}
              onChange={setBrowserPush}
            />
          </div>
        </motion.section>

        {/* Data & Security */}
        <motion.section
          {...fadeUp(0.3)}
          style={{ ...g1box, borderRadius: 16, padding: 24 }}
        >
          <h2 style={sectionHeaderStyle}>
            <RxLockClosed color={c.emerald} size={18} /> Data & Security
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginTop: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: c.t1,
                    fontWeight: 500,
                    marginBottom: 2,
                  }}
                >
                  Export Data
                </div>
                <div style={{ fontSize: 12, color: c.t3 }}>
                  Download a CSV of all your tracked applications.
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "transparent",
                  border: `1px solid ${c.b2}`,
                  color: c.t1,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
              >
                <RxDownload size={15} /> Export CSV
              </motion.button>
            </div>

            <div style={{ height: 1, background: c.b1 }} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: c.rose,
                    fontWeight: 500,
                    marginBottom: 2,
                  }}
                >
                  Delete Account
                </div>
                <div style={{ fontSize: 12, color: c.t3 }}>
                  Permanently remove your account and all data.
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(248,113,113,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "transparent",
                  border: `1px solid rgba(248,113,113,0.3)`,
                  color: c.rose,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                <RxTrash size={15} /> Delete
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
