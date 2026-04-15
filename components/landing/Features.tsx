"use client";

import { motion } from "framer-motion";
import { c, g1box, cardReveal } from "@/lib/theme";
import { features } from "@/lib/constants";

export default function Features() {
  return (
    <section id="features" className="py-15 px-5 max-w-[900px] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-center mb-11"
      >
        <div
          className="inline-block px-3.5 py-1 rounded-full text-[11.5px] font-bold tracking-wide mb-3.5 shadow-sm"
          style={{
            background: `${c.indigo}15`,
            border: `1px solid ${c.indigo}30`,
            color: c.indigo,
          }}
        >
          Features
        </div>

        {/* APPLIED: font-heading */}
        <h2
          className="font-heading text-3xl md:text-4xl lg:text-[38px] font-bold tracking-tight leading-tight mb-3"
          style={{ color: c.t1 }}
        >
          Everything you need to
          <br />
          land your next role
        </h2>

        <p
          className="text-[14.5px] max-w-[400px] mx-auto opacity-80"
          style={{ color: c.t2 }}
        >
          Purpose-built tools that go far beyond a spreadsheet.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {features.map((f, i) => {
          const Icon = f.Icon;
          return (
            <motion.div
              key={f.title}
              {...cardReveal}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4, background: c.g2, borderColor: c.b2 }}
              className="relative overflow-hidden rounded-2xl p-6 transition-colors duration-200"
              style={{ ...g1box }}
            >
              {/* Corner Glow Effect */}
              <div
                className="absolute -top-8 -right-8 w-[100px] h-[100px] rounded-full blur-[52px] opacity-[0.13] pointer-events-none"
                style={{ background: f.color }}
              />

              {/* Icon Container */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-sm"
                style={{
                  background: `${f.color}16`,
                  border: `1px solid ${f.color}26`,
                }}
              >
                <Icon size={18} color={f.color} />
              </div>

              {/* APPLIED: font-heading */}
              <h3
                className="font-heading text-[14.5px] font-bold mb-2"
                style={{ color: c.t1 }}
              >
                {f.title}
              </h3>

              <p
                className="text-[12.5px] leading-relaxed opacity-80"
                style={{ color: c.t2 }}
              >
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
