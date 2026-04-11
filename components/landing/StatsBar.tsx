"use client";

import { motion } from "framer-motion";
import { c, displayFont, g1box } from "@/lib/theme";
import { stats } from "@/lib/constants";

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      style={{ margin: "68px auto 0", maxWidth: 580, padding: "0 20px" }}
    >
      <div
        style={{
          ...g1box,
          borderRadius: 16,
          padding: "24px 0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{ textAlign: "center", position: "relative" }}
          >
            {i > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "15%",
                  bottom: "15%",
                  width: 1,
                  background: c.b2,
                }}
              />
            )}
            <div
              style={{
                ...displayFont,
                fontSize: 27,
                fontWeight: 700,
                color: c.t1,
                letterSpacing: "-0.025em",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 11.5, color: c.t3, marginTop: 3 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
