// lib/theme.ts
export const c = {
  bg0: "#020209",
  bg1: "#06071a",
  bg2: "#0c0c22",
  g1: "rgba(255,255,255,.028)",
  g2: "rgba(255,255,255,.055)",
  b1: "rgba(255,255,255,.07)",
  b2: "rgba(255,255,255,.13)",
  indigo: "#818cf8",
  cyan: "#22d3ee",
  violet: "#a78bfa",
  emerald: "#34d399",
  amber: "#fbbf24",
  orange: "#fb923c",
  rose: "#f87171",
  t1: "#f1f5f9",
  t2: "#94a3b8",
  t3: "#64748b",
  t4: "#334155",
} as const;

export const displayFont = {
  fontFamily: "var(--font-syne), system-ui, sans-serif",
};
// export const displayFont = { fontFamily: "'Syne', system-ui, sans-serif" };
export const g1box = { background: c.g1, border: `1px solid ${c.b1}` };
export const g2box = { background: c.g2, border: `1px solid ${c.b2}` };

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const cardReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export const globalStyles = `
  @keyframes gpan { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.45)} }
`;

// export const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//   @keyframes gpan { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
//   @keyframes pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.45)} }
// `;
