import { Briefcase } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { c, displayFont, g1box } from "@/lib/theme";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${c.b1}`,
        padding: "28px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 14,
      }}
    >
      {/* Brand & Copyright */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: `linear-gradient(135deg, ${c.indigo}, ${c.violet})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Briefcase size={11} color="white" />
        </div>
        <span
          style={{ ...displayFont, fontWeight: 700, fontSize: 14, color: c.t1 }}
        >
          ApplyArc
        </span>
        <span style={{ fontSize: 11.5, color: c.t4, marginLeft: 4 }}>
          © 2025
        </span>
      </div>

      {/* Footer Links */}
      <div style={{ display: "flex", gap: 18 }}>
        {["Features", "Analytics", "Pricing", "Privacy"].map((label) => (
          <a
            key={label}
            href="#"
            style={{ fontSize: 12, color: c.t4, transition: "color .15s" }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Social Icons */}
      <div style={{ display: "flex", gap: 10 }}>
        {[FaGithub, FaTwitter].map((Icon, i) => (
          <a
            key={i}
            href="#"
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              ...g1box,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .2s",
            }}
          >
            <Icon size={14} color={c.t3} />
          </a>
        ))}
      </div>
    </footer>
  );
}
