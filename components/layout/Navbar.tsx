"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { c } from "@/lib/theme";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // If we scroll down more than 40px, trigger the capsule state
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Features", "How It Works"];

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-out pointer-events-none"
      style={{
        paddingTop: isScrolled ? "1rem" : "0",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <motion.nav
        layout
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out w-full ${
          isScrolled
            ? "max-w-3xl rounded-full shadow-2xl backdrop-blur-md px-6 py-3"
            : "max-w-7xl px-8 py-6 bg-transparent"
        }`}
        style={
          isScrolled
            ? {
                background: "rgba(12, 12, 20, 0.7)",
                border: `1px solid ${c.b1}`,
              }
            : {
                border: "1px solid transparent",
              }
        }
      >
        {/* LOGO & BRANDING */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 overflow-hidden rounded-lg">
            {/* Make sure your logo.png is still in the public folder! */}
            <Image
              src="/logo.png"
              alt="ApplyArc Logo"
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <span
            className={`font-heading font-extrabold tracking-tight transition-all ${isScrolled ? "text-lg" : "text-xl"}`}
            style={{ color: c.t1 }}
          >
            ApplyArc
          </span>
        </Link>

        {/* ANCHOR LINKS */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-white/5"
              style={{ color: c.t3 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.t1)}
              onMouseLeave={(e) => (e.currentTarget.style.color = c.t3)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CALL TO ACTION BUTTON */}
        <Link
          href="/login"
          className="flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:brightness-110 active:scale-[0.98]"
          style={{ background: c.indigo, color: "#ffffff" }}
        >
          Sign In
        </Link>
      </motion.nav>
    </div>
  );
}
