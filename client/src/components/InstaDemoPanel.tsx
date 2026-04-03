/*
 * ClearIns — InstaDemoPanel
 * Design: Mobile-style fullscreen overlay demo
 * Triggered by: "Add to Chrome — It's Free" hero button
 * Flow: Enter URL → Start Removing → animated deletion progress → Done
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Link2, Trash2, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";

// ── Fake repost data ──────────────────────────────────────────────────────────
const FAKE_REPOSTS = [
  { id: 1, user: "@travel_vibes", caption: "Stunning sunset at Santorini 🌅 #travel", time: "2d ago", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=80&h=80&fit=crop" },
  { id: 2, user: "@foodie_daily", caption: "Best pasta in Rome 🍝 #foodporn", time: "3d ago", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop" },
  { id: 3, user: "@fitness_goals", caption: "Morning workout done 💪 #gym #fitness", time: "5d ago", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop" },
  { id: 4, user: "@nature_shots", caption: "Lost in the mountains 🏔️ #hiking", time: "1w ago", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&h=80&fit=crop" },
  { id: 5, user: "@city_life_nyc", caption: "NYC never sleeps 🌃 #newyork", time: "1w ago", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=80&h=80&fit=crop" },
  { id: 6, user: "@art_gallery", caption: "New exhibition opening tonight 🎨 #art", time: "2w ago", img: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=80&h=80&fit=crop" },
  { id: 7, user: "@coffee_culture", caption: "Monday fuel ☕ #coffee #morning", time: "2w ago", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop" },
  { id: 8, user: "@beach_life", caption: "Paradise found 🏖️ #beach #summer", time: "3w ago", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=80&fit=crop" },
  { id: 9, user: "@music_vibes", caption: "Last night's concert was insane 🎸 #live", time: "3w ago", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop" },
  { id: 10, user: "@fashion_week", caption: "SS26 collection drop 👗 #fashion", time: "1mo ago", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop" },
  { id: 11, user: "@tech_insider", caption: "The future of AI is here 🤖 #tech", time: "1mo ago", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop" },
  { id: 12, user: "@pet_lovers", caption: "My dog's reaction to snow ❄️🐶 #cute", time: "1mo ago", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&h=80&fit=crop" },
];

type Phase = "input" | "scanning" | "removing" | "done";

interface RepostItem {
  id: number;
  user: string;
  caption: string;
  time: string;
  img: string;
  status: "pending" | "removing" | "removed";
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function InstaDemoPanel({ open, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("input");
  const [url, setUrl] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [reposts, setReposts] = useState<RepostItem[]>([]);
  const [removedCount, setRemovedCount] = useState(0);
  const [currentRemoving, setCurrentRemoving] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setPhase("input");
        setUrl("");
        setScanProgress(0);
        setReposts([]);
        setRemovedCount(0);
        setCurrentRemoving(null);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, 300);
    }
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      setUrl("https://www.instagram.com/@yourprofile");
    }
  };

  const startScanning = useCallback(() => {
    if (!url.trim()) {
      setUrl("https://www.instagram.com/@yourprofile");
    }
    setPhase("scanning");
    setScanProgress(0);
    let prog = 0;
    intervalRef.current = setInterval(() => {
      prog += Math.random() * 18 + 4;
      if (prog >= 100) {
        prog = 100;
        clearInterval(intervalRef.current!);
        setScanProgress(100);
        // Initialize reposts list
        const items: RepostItem[] = FAKE_REPOSTS.map((r) => ({ ...r, status: "pending" }));
        setReposts(items);
        timerRef.current = setTimeout(() => setPhase("removing"), 600);
      }
      setScanProgress(Math.min(prog, 100));
    }, 120);
  }, [url]);

  // Auto-remove reposts one by one
  useEffect(() => {
    if (phase !== "removing") return;
    const pending = reposts.find((r) => r.status === "pending");
    if (!pending) {
      setPhase("done");
      return;
    }
    setCurrentRemoving(pending.id);
    // Mark as "removing" for 700ms then "removed"
    timerRef.current = setTimeout(() => {
      setReposts((prev) =>
        prev.map((r) => r.id === pending.id ? { ...r, status: "removing" } : r)
      );
      timerRef.current = setTimeout(() => {
        setReposts((prev) =>
          prev.map((r) => r.id === pending.id ? { ...r, status: "removed" } : r)
        );
        setRemovedCount((c) => c + 1);
        setCurrentRemoving(null);
      }, 650);
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, reposts]);

  const handleReset = () => {
    setPhase("input");
    setUrl("");
    setScanProgress(0);
    setReposts([]);
    setRemovedCount(0);
    setCurrentRemoving(null);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100]"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />

      {/* Panel — mobile phone frame */}
      <div
        className="fixed z-[101] inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        style={{
          width: "min(100vw, 480px)",
          maxHeight: "90vh",
          background: "#0f1117",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -8px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          // Desktop: fully rounded
          ...(typeof window !== "undefined" && window.innerWidth >= 768 ? {
            borderRadius: "20px",
          } : {}),
        }}
      >
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2.5">
            {/* Mini logo */}
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="dp-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F77737" />
                  <stop offset="50%" stopColor="#FD1D1D" />
                  <stop offset="100%" stopColor="#C13584" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="8" fill="url(#dp-g)" />
              <text x="16" y="22" textAnchor="middle" fill="white" fontSize="17" fontWeight="800" fontFamily="system-ui">C</text>
            </svg>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "white" }}>
              <span>Clear</span>
              <span style={{ background: "linear-gradient(90deg, #833AB4, #FD1D1D, #F77737)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ins</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400, marginLeft: 6, fontSize: 13 }}>Demo</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full transition-colors"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
            aria-label="Close demo"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5" style={{ overscrollBehavior: "contain" }}>

          {/* ── PHASE: INPUT ── */}
          {phase === "input" && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "white", marginBottom: 4 }}>
                  Enter Your Instagram Profile
                </h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.5 }}>
                  Paste your Instagram URL or username to start the demo removal.
                </p>
              </div>

              {/* URL input row */}
              <div className="flex gap-2">
                <div
                  className="flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Link2 size={16} style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/@username"
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "white",
                      fontSize: 13,
                      width: "100%",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                </div>
                <button
                  onClick={handlePaste}
                  className="px-4 py-3.5 rounded-xl font-bold text-white text-sm flex-shrink-0"
                  style={{
                    background: "#1a1a2e",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Paste
                </button>
              </div>

              {/* Example hint */}
              <div
                className="rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                  <strong style={{ color: "rgba(255,255,255,0.8)" }}>Example:</strong>{" "}
                  <span style={{ color: "#818cf8" }}>https://www.instagram.com/@username</span>
                </span>
              </div>

              {/* Start button */}
              <button
                onClick={startScanning}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-white text-base"
                style={{
                  background: "linear-gradient(135deg, #1a8a8a 0%, #833AB4 40%, #FD1D1D 80%, #F77737 100%)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 24px rgba(131,58,180,0.35)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={18} />
                Start Removing Reposts
              </button>

              {/* Safety note */}
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
                🔒 This is a demo simulation. No real data is accessed or modified.
              </p>
            </div>
          )}

          {/* ── PHASE: SCANNING ── */}
          {phase === "scanning" && (
            <div className="flex flex-col items-center justify-center gap-6 py-8">
              {/* Spinning radar */}
              <div className="relative w-20 h-20">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(131,58,180,0.8), rgba(253,29,29,0.5), transparent 60%)",
                    animation: "spin 1.2s linear infinite",
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full flex items-center justify-center"
                  style={{ background: "#0f1117" }}
                >
                  <Loader2 size={24} style={{ color: "#c084fc", animation: "spin 1s linear infinite" }} />
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>

              <div className="text-center">
                <p style={{ color: "white", fontWeight: 700, fontSize: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>
                  Scanning your reposts...
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                  Found {Math.floor(scanProgress / 8.5)} reposts so far
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: 6, background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-150"
                    style={{
                      width: `${scanProgress}%`,
                      background: "linear-gradient(90deg, #833AB4, #FD1D1D, #F77737)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Scanning profile...</span>
                  <span style={{ color: "#c084fc", fontSize: 11, fontWeight: 600 }}>{Math.round(scanProgress)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* ── PHASE: REMOVING ── */}
          {phase === "removing" && (
            <div className="flex flex-col gap-4">
              {/* Stats bar */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: "rgba(131,58,180,0.1)", border: "1px solid rgba(131,58,180,0.2)" }}
              >
                <div>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Removed</span>
                  <div style={{ color: "#c084fc", fontSize: 22, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }}>
                    {removedCount} <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/ {FAKE_REPOSTS.length}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</span>
                  <div className="flex items-center gap-1.5 justify-end mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span style={{ color: "#4ade80", fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Running</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: 5, background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(removedCount / FAKE_REPOSTS.length) * 100}%`,
                    background: "linear-gradient(90deg, #833AB4, #FD1D1D, #F77737)",
                  }}
                />
              </div>

              {/* Repost list */}
              <div className="flex flex-col gap-2">
                {reposts.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-500"
                    style={{
                      background: r.status === "removing"
                        ? "rgba(253,29,29,0.1)"
                        : r.status === "removed"
                        ? "rgba(34,197,94,0.06)"
                        : "rgba(255,255,255,0.03)",
                      border: r.status === "removing"
                        ? "1px solid rgba(253,29,29,0.3)"
                        : r.status === "removed"
                        ? "1px solid rgba(34,197,94,0.15)"
                        : "1px solid rgba(255,255,255,0.06)",
                      opacity: r.status === "removed" ? 0.55 : 1,
                      transform: r.status === "removing" ? "scale(0.98)" : "scale(1)",
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={r.img}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      style={{ opacity: r.status === "removed" ? 0.4 : 1 }}
                    />
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div style={{ color: r.status === "removed" ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {r.user}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.caption}
                      </div>
                    </div>
                    {/* Status icon */}
                    <div className="flex-shrink-0">
                      {r.status === "removed" && <CheckCircle2 size={16} style={{ color: "#4ade80" }} />}
                      {r.status === "removing" && <Loader2 size={16} style={{ color: "#FD1D1D", animation: "spin 0.8s linear infinite" }} />}
                      {r.status === "pending" && <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "inline-block" }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PHASE: DONE ── */}
          {phase === "done" && (
            <div className="flex flex-col items-center gap-6 py-6">
              {/* Success icon */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))",
                  border: "2px solid rgba(34,197,94,0.4)",
                  boxShadow: "0 0 40px rgba(34,197,94,0.2)",
                }}
              >
                <CheckCircle2 size={36} style={{ color: "#4ade80" }} />
              </div>

              <div className="text-center">
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "white", marginBottom: 6 }}>
                  All Done! 🎉
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: "#4ade80", fontWeight: 700 }}>{FAKE_REPOSTS.length} reposts</span> removed from your Instagram profile.
                  <br />
                  Your profile is now clean.
                </p>
              </div>

              {/* Stats */}
              <div
                className="w-full grid grid-cols-3 gap-3"
              >
                {[
                  { label: "Removed", value: FAKE_REPOSTS.length, color: "#4ade80" },
                  { label: "Time Saved", value: "~40m", color: "#c084fc" },
                  { label: "Speed", value: "10×", color: "#fb923c" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div style={{ color: s.color, fontWeight: 800, fontSize: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginTop: 2, fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base"
                style={{
                  background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 60%, #F77737 100%)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 24px rgba(131,58,180,0.35)",
                  textDecoration: "none",
                }}
              >
                Get ClearIns Extension — Free
                <ChevronRight size={18} />
              </a>

              <button
                onClick={handleReset}
                style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Try again with different profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
