export function TopoBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(74,142,196,0.07)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(45,106,79,0.05)_0%,transparent_50%)]" />
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-5" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path d="M0,300 L0,160 L80,110 L160,145 L240,75 L320,120 L400,55 L480,100 L560,35 L640,85 L720,18 L800,70 L880,42 L960,95 L1040,50 L1120,80 L1200,32 L1280,62 L1360,40 L1440,68 L1440,300 Z" fill="#1A2B3C" />
        <path d="M0,300 L0,210 L120,178 L200,195 L300,158 L380,178 L460,148 L540,165 L620,138 L700,158 L780,128 L860,148 L940,132 L1020,152 L1100,138 L1180,155 L1260,142 L1360,158 L1440,148 L1440,300 Z" fill="#2D5A8E" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 h-96 w-96 opacity-5" viewBox="0 0 200 200">
        {[30, 50, 70, 90, 110, 130].map((r, i) => (
          <ellipse key={i} cx="100" cy="100" rx={r} ry={r * 0.58} fill="none" stroke="#1A2B3C" strokeWidth="1" />
        ))}
      </svg>
      <svg className="absolute bottom-40 left-10 h-64 w-64 opacity-5" viewBox="0 0 200 200">
        {[20, 40, 60, 80, 100].map((r, i) => (
          <ellipse key={i} cx="100" cy="100" rx={r} ry={r * 0.65} fill="none" stroke="#2D6A4F" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}
