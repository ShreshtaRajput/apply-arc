"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { resetBoard } from "@/store/slices/boardSlice";
import { useAppDispatch } from "@/store/hooks";
import { useAuth } from "@/lib/AuthContext";
import { c, displayFont } from "@/lib/theme";
import {
  RxDashboard,
  RxBarChart,
  RxPerson,
  RxGear,
  RxChevronLeft,
  RxExit,
} from "react-icons/rx";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Board", href: "/board", Icon: RxDashboard },
  { label: "Analytics", href: "/analytics", Icon: RxBarChart },
  { label: "Profile", href: "/profile", Icon: RxPerson },
  { label: "Settings", href: "/settings", Icon: RxGear },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(resetBoard());
    router.push("/login");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => collapsed && setCollapsed(false)}
      style={{
        height: "100vh",
        flexShrink: 0,
        background: c.bg1,
        borderRight: `1px solid ${c.b1}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: collapsed ? "pointer" : "default",
      }}
    >
      {/* Logo row + collapse toggle */}
      <div
        style={{
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          borderBottom: `1px solid ${c.b1}`,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo.png"
            alt="ApplyArc Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain rounded-lg"
          />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  ...displayFont,
                  fontWeight: 700,
                  fontSize: 16,
                  color: c.t1,
                  whiteSpace: "nowrap",
                }}
              >
                ApplyArc
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        {/* Collapse button — only visible when expanded */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed(true);
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: c.t4,
                flexShrink: 0,
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = c.t2;
                e.currentTarget.style.background = c.g1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = c.t4;
                e.currentTarget.style.background = "transparent";
              }}
            >
              <RxChevronLeft size={15} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 8,
                color: active ? c.indigo : c.t4,
                background: active ? `rgba(129,140,248,.1)` : "transparent",
                border: `1px solid ${active ? "rgba(129,140,248,.2)" : "transparent"}`,
                transition: "all 0.15s",
                textDecoration: "none",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: 13.5, fontWeight: 500 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom — user + logout */}
      <div
        style={{
          padding: "8px 8px 12px",
          borderTop: `1px solid ${c.b1}`,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 10px",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: `rgba(129,140,248,.15)`,
              border: `1px solid rgba(129,140,248,.25)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: c.indigo,
              flexShrink: 0,
            }}
          >
            {user?.email?.[0]?.toUpperCase() ?? "?"}
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: 12,
                  color: c.t3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.email}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLogout();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 10px",
            borderRadius: 8,
            color: c.t4,
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            transition: "all 0.15s",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = c.rose;
            e.currentTarget.style.background = `rgba(248,113,113,.08)`;
            e.currentTarget.style.borderColor = `rgba(248,113,113,.15)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = c.t4;
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <RxExit size={16} style={{ flexShrink: 0 }} />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 13.5, fontWeight: 500 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
