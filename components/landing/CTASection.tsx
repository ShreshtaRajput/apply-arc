"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { c, displayFont } from "@/lib/theme";

export default function CTASection() {
  return (
    <section style={{ padding: "0 20px 80px" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{
          maxWidth: 640,
          margin: "0 auto",
          textAlign: "center",
          padding: "56px 44px",
          borderRadius: 28,
          background:
            "linear-gradient(135deg, rgba(129,140,248,.1), rgba(167,139,250,.09), rgba(34,211,238,.07))",
          border: "1px solid rgba(129,140,248,.24)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -55,
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: 170,
            background:
              "radial-gradient(ellipse, rgba(129,140,248,.26) 0%, transparent 68%)",
            filter: "blur(32px)",
            pointerEvents: "none",
          }}
        />
        <h2
          style={{
            ...displayFont,
            fontSize: "clamp(22px, 3.5vw, 34px)",
            fontWeight: 700,
            color: c.t1,
            marginBottom: 10,
            letterSpacing: "-0.025em",
            position: "relative",
          }}
        >
          Ready to land your dream job?
        </h2>
        <p
          style={{
            fontSize: 14.5,
            color: c.t2,
            marginBottom: 28,
            position: "relative",
          }}
        >
          Join thousands of job seekers who track smarter with ApplyArc.
        </p>
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-block", position: "relative" }}
        >
          <Link
            href="/board"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 12,
              fontSize: 14.5,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
              color: "white",
              boxShadow: "0 4px 30px rgba(129,140,248,.42)",
            }}
          >
            Get Started — It&apos;s Free <ArrowRight size={15} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
