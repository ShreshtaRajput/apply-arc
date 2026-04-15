"use client";

import { motion } from "framer-motion";
import { c, g1box, cardReveal } from "@/lib/theme";
import { steps } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 pb-20 max-w-[900px] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-12"
      >
        <div
          className="inline-block px-3.5 py-1 rounded-full text-[11.5px] font-bold tracking-wide mb-3.5 shadow-sm"
          style={{
            background: `rgba(34,211,238,.09)`,
            border: `1px solid rgba(34,211,238,.22)`,
            color: c.cyan,
          }}
        >
          How It Works
        </div>

        {/* APPLIED: font-heading */}
        <h2
          className="font-heading text-3xl md:text-4xl font-bold tracking-tight leading-tight"
          style={{ color: c.t1 }}
        >
          From chaos to clarity
          <br />
          in three steps
        </h2>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            {...cardReveal}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{ ...g1box }}
          >
            {/* Step Number (Ghost Text) */}
            <div
              className="font-heading text-[40px] font-extrabold leading-none mb-3"
              style={{ color: "rgba(255,255,255,.05)" }}
            >
              {s.n}
            </div>

            {/* APPLIED: font-heading */}
            <h3
              className="font-heading text-[15px] font-bold mb-2"
              style={{ color: c.t1 }}
            >
              {s.title}
            </h3>

            <p
              className="text-[12.5px] leading-relaxed opacity-80"
              style={{ color: c.t2 }}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
