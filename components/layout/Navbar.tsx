"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { c, displayFont, g1box } from "@/lib/theme";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: "rgba(2,2,9,.84)",
        borderBottom: `1px solid ${c.b1}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 18px rgba(129,140,248,.42)",
          }}
        >
          <Briefcase size={13} color="white" />
        </div>
        <span
          style={{ ...displayFont, fontWeight: 700, fontSize: 17, color: c.t1 }}
        >
          ApplyArc
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 2 }}>
        {["Features", "Analytics", "Pricing"].map((label) => (
          <a
            key={label}
            href="#"
            style={{
              padding: "5px 12px",
              borderRadius: 7,
              fontSize: 13,
              color: c.t3,
              fontWeight: 500,
              transition: "color .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.t1)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.t3)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href="/login"
          style={{
            padding: "7px 15px",
            borderRadius: 8,
            fontSize: 12.5,
            fontWeight: 500,
            ...g1box,
            color: c.t2,
            transition: "all .2s",
          }}
        >
          Log in
        </Link>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/board"
            style={{
              display: "block",
              padding: "7px 15px",
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
              color: "white",
              boxShadow: "0 3px 20px rgba(129,140,248,.38)",
            }}
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
