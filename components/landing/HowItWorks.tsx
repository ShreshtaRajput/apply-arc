"use client";

import { motion } from "framer-motion";
import { c, displayFont, g1box, cardReveal } from "@/lib/theme";
import { steps } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section
      style={{ padding: "0 20px 80px", maxWidth: 900, margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ textAlign: "center", marginBottom: 48 }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: 100,
            background: "rgba(34,211,238,.09)",
            border: "1px solid rgba(34,211,238,.22)",
            fontSize: 11.5,
            fontWeight: 600,
            color: c.cyan,
            marginBottom: 14,
          }}
        >
          How It Works
        </div>
        <h2
          style={{
            ...displayFont,
            fontSize: "clamp(22px, 3.5vw, 34px)",
            fontWeight: 700,
            color: c.t1,
            letterSpacing: "-0.025em",
          }}
        >
          From chaos to clarity
          <br />
          in three steps
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
        }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            {...cardReveal}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            style={{ ...g1box, borderRadius: 18, padding: "26px 22px" }}
          >
            <div
              style={{
                ...displayFont,
                fontSize: 34,
                fontWeight: 800,
                color: "rgba(255,255,255,.1)",
                marginBottom: 12,
                lineHeight: 1,
              }}
            >
              {s.n}
            </div>
            <h3
              style={{
                ...displayFont,
                fontSize: 15,
                fontWeight: 600,
                color: c.t1,
                marginBottom: 8,
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: 12.5, color: c.t2, lineHeight: 1.65 }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
