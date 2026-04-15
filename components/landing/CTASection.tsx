"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { c } from "@/lib/theme";

export default function CTASection() {
  return (
    <section className="px-5 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="max-w-[640px] mx-auto text-center py-14 px-8 md:px-11 rounded-[28px] relative overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${c.indigo}15, ${c.violet}15, ${c.cyan}10)`,
          border: `1px solid ${c.indigo}30`,
        }}
      >
        {/* Bottom Glow */}
        <div
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-1/2 h-[170px] blur-[32px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${c.indigo}40 0%, transparent 68%)`,
          }}
        />

        {/* APPLIED: font-heading */}
        <h2
          className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3 relative z-10"
          style={{ color: c.t1 }}
        >
          Ready to land your dream job?
        </h2>

        <p
          className="text-[14.5px] mb-8 relative z-10 opacity-90"
          style={{ color: c.t2 }}
        >
          Join thousands of job seekers who track smarter with ApplyArc.
        </p>

        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block relative z-10"
        >
          <Link
            href="/board"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14.5px] font-bold transition-all shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
              color: "white",
              boxShadow: `0 4px 30px ${c.indigo}60`,
            }}
          >
            Get Started — It&apos;s Free <ArrowRight size={15} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
