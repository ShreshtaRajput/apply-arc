import Image from "next/image";
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
        <Image
          src="/logo.png"
          alt="ApplyArc Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain rounded-lg"
        />
        <span
          style={{ ...displayFont, fontWeight: 700, fontSize: 14, color: c.t1 }}
        >
          ApplyArc
        </span>
      </div>

      {/* Footer Links */}
      <div style={{ display: "flex", gap: 18 }}>
        <span style={{ fontSize: 11.5, color: c.t4, marginLeft: 4 }}>
          © 2025 ApplyArc
        </span>
      </div>

      {/* Social Icons */}
      <div style={{ display: "flex", gap: 10 }}>
        <a
          href="https://github.com/ShreshtaRajput/apply-arc"
          target="_blank"
          rel="noopener noreferrer"
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
          <FaGithub size={14} color={c.t3} />
        </a>
      </div>
    </footer>
  );
}
