"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { c } from "@/lib/theme";
import { stages } from "@/lib/constants";

export default function StagesRow() {
  return (
    <section
      style={{
        padding: "0 20px 72px",
        maxWidth: 720,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: ".1em",
            color: c.t4,
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          SIX PIPELINE STAGES
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {stages.map((s, i) => (
            <div
              key={s.label}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <motion.span
                whileHover={{ scale: 1.07 }}
                style={{
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: s.color,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  cursor: "default",
                }}
              >
                {s.label}
              </motion.span>
              {i < stages.length - 1 && <ChevronRight size={13} color={c.t4} />}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
