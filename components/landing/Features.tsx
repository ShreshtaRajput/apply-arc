"use client";

import { motion } from "framer-motion";
import { c, displayFont, g1box, cardReveal } from "@/lib/theme";
import { features } from "@/lib/constants";

export default function Features() {
  return (
    <section
      id="features"
      style={{ padding: "80px 20px", maxWidth: 900, margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ textAlign: "center", marginBottom: 44 }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: 100,
            background: "rgba(129,140,248,.1)",
            border: "1px solid rgba(129,140,248,.24)",
            fontSize: 11.5,
            fontWeight: 600,
            color: c.indigo,
            marginBottom: 14,
          }}
        >
          Features
        </div>
        <h2
          style={{
            ...displayFont,
            fontSize: "clamp(24px, 4vw, 38px)",
            fontWeight: 700,
            color: c.t1,
            marginBottom: 10,
            letterSpacing: "-0.025em",
          }}
        >
          Everything you need to
          <br />
          land your next role
        </h2>
        <p
          style={{
            fontSize: 14.5,
            color: c.t2,
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          Purpose-built tools that go far beyond a spreadsheet.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
        }}
      >
        {features.map((f, i) => {
          const Icon = f.Icon;
          return (
            <motion.div
              key={f.title}
              {...cardReveal}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4, background: c.g2, borderColor: c.b2 }}
              style={{
                ...g1box,
                borderRadius: 18,
                padding: "24px 20px",
                position: "relative",
                overflow: "hidden",
                transition: "background .2s, border-color .2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -32,
                  right: -32,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: f.color,
                  filter: "blur(52px)",
                  opacity: 0.13,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 11,
                  background: `${f.color}16`,
                  border: `1px solid ${f.color}26`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <Icon size={18} color={f.color} />
              </div>
              <h3
                style={{
                  ...displayFont,
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: c.t1,
                  marginBottom: 7,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 12.5, color: c.t2, lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
