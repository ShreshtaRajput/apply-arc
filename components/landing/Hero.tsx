"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { c, displayFont, g1box, g2box, fadeUp } from "@/lib/theme";
import { mockCards, perks } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      style={{ position: "relative", overflow: "hidden", paddingBottom: 80 }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 30%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 30%, black 0%, transparent 100%)",
        }}
      />

      {/* Animated blobs */}
      <motion.div
        animate={{ x: [0, 26, -18, 0], y: [0, -36, 16, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-8%",
          left: "-12%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(129,140,248,.22) 0%, transparent 68%)",
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, -32, 20, 0], y: [0, 26, -22, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "-10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,.18) 0%, transparent 68%)",
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, 12, 0], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "38%",
          right: "10%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,.17) 0%, transparent 68%)",
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "68px 20px 0",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <motion.div
          {...fadeUp(0)}
          style={{
            marginBottom: 26,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 15px",
              borderRadius: 100,
              background: "rgba(129,140,248,.1)",
              border: "1px solid rgba(129,140,248,.28)",
              fontSize: 12,
              fontWeight: 600,
              color: c.indigo,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: c.emerald,
                display: "inline-block",
                animation: "pulse 2s ease infinite",
              }}
            />
            Real-time collaboration · Beta
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          style={{
            ...displayFont,
            fontSize: "clamp(44px, 8vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            marginBottom: 20,
          }}
        >
          <span style={{ color: c.t1 }}>Track your every</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(130deg, #e2e8f0 0%, #a78bfa 30%, #818cf8 58%, #22d3ee 100%)",
              backgroundSize: "280% 280%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gpan 7s ease infinite",
            }}
          >
            Job Application.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          style={{
            fontSize: "clamp(14px, 2vw, 17px)",
            color: c.t2,
            maxWidth: 460,
            margin: "0 auto 34px",
            lineHeight: 1.78,
            fontWeight: 300,
          }}
        >
          A premium job tracker with a visual Kanban board, smart analytics, and
          real-time sync. Built for serious job seekers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            display: "flex",
            gap: 11,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/board"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "12px 26px",
                borderRadius: 12,
                fontSize: 14.5,
                fontWeight: 600,
                background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
                color: "white",
                boxShadow: "0 4px 30px rgba(129,140,248,.42)",
              }}
            >
              Start Tracking Free <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <a
              href="#features"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "12px 26px",
                borderRadius: 12,
                fontSize: 14.5,
                fontWeight: 500,
                ...g2box,
                color: c.t1,
                backdropFilter: "blur(12px)",
              }}
            >
              View Demo <ChevronRight size={15} />
            </a>
          </motion.div>
        </motion.div>

        {/* Perks */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {perks.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: c.t3,
              }}
            >
              <CheckCircle2 size={12} color={c.emerald} /> {p}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Product Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 52,
          padding: "0 20px",
          maxWidth: 620,
          margin: "52px auto 0",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: -24,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 150,
            background:
              "radial-gradient(ellipse, rgba(129,140,248,.32) 0%, transparent 68%)",
            filter: "blur(28px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Panel */}
        <motion.div
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 16,
            ...g1box,
            overflow: "hidden",
            boxShadow:
              "0 28px 90px rgba(0,0,0,.58), 0 0 0 1px rgba(255,255,255,.06)",
            transform: "perspective(1100px) rotateX(11deg) rotateY(-4deg)",
          }}
        >
          {/* Window bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 15px",
              borderBottom: `1px solid ${c.b1}`,
              background: "rgba(255,255,255,.018)",
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              {[c.rose, c.amber, c.emerald].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: col,
                    opacity: 0.9,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                ...displayFont,
                fontSize: 11.5,
                fontWeight: 600,
                color: c.t3,
              }}
            >
              ApplyArc — My Board
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                color: c.emerald,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: c.emerald,
                  display: "inline-block",
                }}
              />
              3 online
            </div>
          </div>

          {/* Cards grid */}
          <div
            style={{
              padding: "12px 12px 14px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {mockCards.map((card) => (
              <div
                key={card.co}
                style={{ ...g1box, borderRadius: 10, padding: "9px 9px 8px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 23,
                      height: 23,
                      borderRadius: 6,
                      background: `${card.ic}22`,
                      border: `1px solid ${card.ic}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: card.ic,
                      flexShrink: 0,
                    }}
                  >
                    {card.i}
                  </div>
                  <div style={{ overflow: "hidden", minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: c.t1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.co}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: c.t3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.role}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: card.sc,
                    background: card.sbg,
                    border: `1px solid ${card.sbc}`,
                    padding: "2px 7px",
                    borderRadius: 100,
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
