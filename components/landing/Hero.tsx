"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { c, g1box, g2box, fadeUp } from "@/lib/theme";
import { mockCards, perks } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden pt-32 pb-15 md:pt-15 lg:pt-25"
    >
      {/* Background Dot Grid */}
      <div
        className="dot-grid absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          // backgroundImage:
          //   "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
          // backgroundSize: "34px 34px",
          // maskImage:
          //   "radial-gradient(ellipse 75% 65% at 50% 30%, black 0%, transparent 100%)",
          // WebkitMaskImage:
          //   "radial-gradient(ellipse 75% 65% at 50% 30%, black 0%, transparent 100%)",
        }}
      />

      {/* Animated Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 26, -18, 0], y: [0, -36, 16, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[560px] h-[560px] rounded-full blur-[72px]"
          style={{
            background:
              "radial-gradient(circle, rgba(129,140,248,.15) 0%, transparent 68%)",
          }}
        />
        <motion.div
          animate={{ x: [0, -32, 20, 0], y: [0, 26, -22, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[5%] -right-[5%] w-[480px] h-[480px] rounded-full blur-[72px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,.12) 0%, transparent 68%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Beta Badge */}
        <motion.div {...fadeUp(0)} className="mb-8 flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-sm"
            style={{
              background: `${c.indigo}15`,
              border: `1px solid ${c.indigo}30`,
              color: c.indigo,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: c.emerald }}
            />
            Real-time collaboration · Beta
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-heading text-5xl md:text-7xl lg:text-[82px] font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          <span style={{ color: c.t1 }}>Track your every</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-gradient-x">
            Job Application.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 opacity-80"
          style={{ color: c.t2 }}
        >
          A premium job tracker with a visual Kanban board, smart analytics, and
          real-time sync. Built for serious job seekers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/board"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all"
              style={{
                background: c.indigo,
                color: "#ffffff",
                boxShadow: `0 8px 25px ${c.indigo}40`,
              }}
            >
              Start Tracking Free <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Perks */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-wrap justify-center gap-5 md:gap-8"
        >
          {perks.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2 text-xs md:text-sm font-medium"
              style={{ color: c.t3 }}
            >
              <CheckCircle2 size={16} color={c.emerald} /> {p}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Product Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-20 px-4 max-w-4xl mx-auto hidden md:block"
      >
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[40px] pointer-events-none -z-10"
          style={{
            background: `radial-gradient(ellipse, ${c.indigo}40 0%, transparent 68%)`,
          }}
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            ...g1box,
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
            transform: "perspective(1100px) rotateX(8deg)",
          }}
        >
          {/* Mockup Window Header */}
          <div
            className="flex items-center justify-between px-4 py-3 bg-white/5 border-b"
            style={{ borderColor: c.b1 }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/90" />
              <div className="w-3 h-3 rounded-full bg-amber-500/90" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
            </div>
            <span
              className="font-heading text-xs font-bold"
              style={{ color: c.t3 }}
            >
              ApplyArc — My Board
            </span>
            <div
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: c.emerald }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: c.emerald }}
              />
              Active
            </div>
          </div>

          {/* Mockup Cards Grid */}
          <div className="p-4 grid grid-cols-3 gap-4 bg-black/20">
            {mockCards.map((card) => (
              <div
                key={card.co}
                className="rounded-xl p-3"
                style={{ ...g2box }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: `${card.ic}15`,
                      border: `1px solid ${card.ic}30`,
                      color: card.ic,
                    }}
                  >
                    {card.i}
                  </div>
                  <div className="overflow-hidden">
                    <div
                      className="text-sm font-bold truncate"
                      style={{ color: c.t1 }}
                    >
                      {card.co}
                    </div>
                    <div
                      className="text-xs truncate opacity-70"
                      style={{ color: c.t3 }}
                    >
                      {card.role}
                    </div>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{
                    color: card.sc,
                    background: card.sbg,
                    border: `1px solid ${card.sbc}`,
                  }}
                >
                  {card.stage}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
