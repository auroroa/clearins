/*
 * ClearIns — Interactive Demo Remover Component
 * Design: Glassmorphic Dark / Instagram Night Mode
 *
 * UX Flow:
 * 1. User enters Instagram URL or @username
 * 2. "Scanning" phase — fake profile fetch animation
 * 3. "Reposts found" — shows a grid of mock repost cards
 * 4. "Removing" — cards animate out one by one with progress bar
 * 5. "Done" — success state with CTA to install real extension
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  CheckCircle2,
  Trash2,
  Instagram,
  ArrowRight,
  RefreshCw,
  Shield,
  Zap,
  X,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_CAPTIONS = [
  "When the coffee hits different ☕",
  "Golden hour never disappoints 🌅",
  "Weekend vibes only 🎉",
  "This view though 😍",
  "Mood for the week 💫",
  "Can't stop, won't stop 🔥",
  "Living for this moment ✨",
  "Throwback to better days 🌊",
  "Obsessed with this aesthetic 🎨",
  "No caption needed 🤍",
  "Main character energy 💅",
  "Just here for the vibes 🌿",
  "Repost because this is everything 🙌",
  "Had to share this one 📸",
  "Too good not to repost 💎",
  "This made my day 😂",
  "Saving this forever 🔖",
  "Absolutely stunning 🌸",
];

const MOCK_USERS = [
  "travel.diaries",
  "aesthetic.feed",
  "daily.inspo",
  "nature.shots",
  "urban.explorer",
  "foodie.life",
  "sunset.lover",
  "minimal.vibes",
  "creator.hub",
  "photo.journal",
  "style.notes",
  "wanderlust.co",
];

const MOCK_COLORS = [
  ["#833AB4", "#FD1D1D"],
  ["#FD1D1D", "#F77737"],
  ["#405DE6", "#833AB4"],
  ["#F77737", "#FCAF45"],
  ["#833AB4", "#405DE6"],
  ["#FCAF45", "#FD1D1D"],
  ["#12c2e9", "#c471ed"],
  ["#f64f59", "#c471ed"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#a18cd1", "#fbc2eb"],
  ["#ffecd2", "#fcb69f"],
];

function generateMockReposts(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    caption: MOCK_CAPTIONS[i % MOCK_CAPTIONS.length],
    user: MOCK_USERS[i % MOCK_USERS.length],
    colors: MOCK_COLORS[i % MOCK_COLORS.length],
    likes: Math.floor(Math.random() * 9000) + 500,
    timeAgo: `${Math.floor(Math.random() * 52) + 1}w`,
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RepostCard({
  post,
  removing,
  removed,
  delay,
}: {
  post: ReturnType<typeof generateMockReposts>[0];
  removing: boolean;
  removed: boolean;
  delay: number;
}) {
  return (
    <AnimatePresence>
      {!removed && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          transition={{ duration: 0.35, delay: removed ? delay : 0 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            aspectRatio: "1",
          }}
        >
          {/* Gradient background simulating an image */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${post.colors[0]}55, ${post.colors[1]}55)`,
            }}
          />

          {/* Removing overlay */}
          <AnimatePresence>
            {removing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                >
                  <Trash2 size={20} className="text-red-400" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="absolute inset-0 p-2 flex flex-col justify-between">
            {/* Top: user */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${post.colors[0]}, ${post.colors[1]})`,
                }}
              />
              <span className="text-white/70 text-xs truncate font-medium">@{post.user}</span>
            </div>

            {/* Bottom: caption + meta */}
            <div>
              <p className="text-white/80 text-xs leading-tight line-clamp-2 mb-1">
                {post.caption}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">❤️ {post.likes.toLocaleString()}</span>
                <span className="text-white/40 text-xs">{post.timeAgo}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Phase types ──────────────────────────────────────────────────────────────

type Phase = "idle" | "scanning" | "found" | "removing" | "done";

// ─── Main component ───────────────────────────────────────────────────────────

export default function InstaDemoRemover() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanStep, setScanStep] = useState(0);
  const [reposts, setReposts] = useState<ReturnType<typeof generateMockReposts>>([]);
  const [removingIndex, setRemovingIndex] = useState(-1);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [repostCount] = useState(() => Math.floor(Math.random() * 180) + 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const VISIBLE_COUNT = 12; // show 12 cards in grid

  const cleanInput = useCallback((raw: string) => {
    let name = raw.trim();
    // strip URL
    name = name.replace(/https?:\/\/(www\.)?instagram\.com\//i, "");
    name = name.replace(/\/$/, "");
    // strip @
    name = name.replace(/^@/, "");
    // take only the username part
    name = name.split("/")[0].split("?")[0];
    return name || "your_account";
  }, []);

  const startDemo = useCallback(() => {
    if (!input.trim()) return;
    const name = cleanInput(input);
    setDisplayName(name);
    setPhase("scanning");
    setScanStep(0);
    setRemovedIds(new Set());
    setRemovingIndex(-1);
    setProgress(0);
  }, [input, cleanInput]);

  // Scanning animation
  useEffect(() => {
    if (phase !== "scanning") return;
    const steps = [0, 1, 2, 3];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setScanStep(i);
      if (i >= steps.length) {
        clearInterval(t);
        // Generate mock reposts and move to "found"
        setReposts(generateMockReposts(VISIBLE_COUNT));
        setTimeout(() => setPhase("found"), 400);
      }
    }, 600);
    return () => clearInterval(t);
  }, [phase]);

  // Removal animation
  useEffect(() => {
    if (phase !== "removing") return;
    let idx = 0;
    const total = VISIBLE_COUNT;

    intervalRef.current = setInterval(() => {
      if (idx >= total) {
        clearInterval(intervalRef.current!);
        setTimeout(() => setPhase("done"), 600);
        return;
      }
      const currentId = idx;
      setRemovingIndex(currentId);
      setTimeout(() => {
        setRemovedIds((prev) => new Set(Array.from(prev).concat(currentId)));
        setRemovingIndex(-1);
        setProgress(Math.round(((currentId + 1) / repostCount) * 100));
      }, 400);
      idx++;
    }, 320);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase, repostCount]);

  const handleReset = () => {
    setPhase("idle");
    setInput("");
    setReposts([]);
    setRemovedIds(new Set());
    setRemovingIndex(-1);
    setProgress(0);
    setScanStep(0);
  };

  const SCAN_STEPS = [
    "Connecting to Instagram...",
    `Looking up @${displayName}...`,
    `Scanning repost history...`,
    `Found ${repostCount} reposts`,
  ];

  return (
    <section className="py-20" id="demo">
      <div className="container">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(131, 58, 180, 0.15)",
              border: "1px solid rgba(131, 58, 180, 0.3)",
              color: "#c084fc",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Zap size={12} /> Live Demo — Try It Now
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            See How ClearIns{" "}
            <span className="ig-gradient-text">Removes Your Reposts</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Enter any Instagram username or profile URL below to see a live simulation of ClearIns removing reposts. No real data is accessed — this is a safe, browser-only demo.
          </p>
        </div>

        {/* Main demo card */}
        <div
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Input bar */}
          <div
            className="p-4 flex gap-3 items-center"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 flex-1 relative">
              <Instagram size={18} className="absolute left-3 text-white/30 flex-shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && phase === "idle" && startDemo()}
                placeholder="instagram.com/username  or  @username"
                disabled={phase !== "idle"}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              {input && phase === "idle" && (
                <button
                  onClick={() => setInput("")}
                  className="absolute right-3 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {phase === "idle" ? (
              <button
                onClick={startDemo}
                disabled={!input.trim()}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: input.trim()
                    ? "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)"
                    : "rgba(255,255,255,0.1)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Search size={15} />
                Scan Reposts
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <RefreshCw size={14} />
                Reset
              </button>
            )}
          </div>

          {/* Demo body */}
          <div className="p-5 min-h-[320px] flex flex-col">
            <AnimatePresence mode="wait">

              {/* ── IDLE ── */}
              {phase === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-4 py-8"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(131, 58, 180, 0.1)", border: "1px solid rgba(131, 58, 180, 0.2)" }}
                  >
                    <Instagram size={28} className="text-purple-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Enter your Instagram username above to start the demo
                    </p>
                    <p className="text-white/30 text-xs mt-1">
                      This is a simulation — no real data is accessed
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {[
                      { icon: Shield, label: "100% Safe" },
                      { icon: Zap, label: "Instant Demo" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-white/40 text-xs">
                        <Icon size={12} />
                        {label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── SCANNING ── */}
              {phase === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center gap-6 py-8"
                >
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(131, 58, 180, 0.1)", border: "1px solid rgba(131, 58, 180, 0.2)" }}
                    >
                      <Instagram size={32} className="text-purple-400" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: "2px solid transparent", borderTopColor: "#833AB4" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  <div className="space-y-2 w-full max-w-xs">
                    {SCAN_STEPS.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: scanStep > i ? 1 : 0.2, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {scanStep > i ? (
                          <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                        ) : scanStep === i ? (
                          <Loader2 size={14} className="text-purple-400 animate-spin flex-shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />
                        )}
                        <span className={scanStep > i ? "text-white/80" : "text-white/30"}>
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── FOUND ── */}
              {phase === "found" && (
                <motion.div
                  key="found"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col gap-4"
                >
                  {/* Profile header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" }}
                      >
                        {displayName[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          @{displayName}
                        </div>
                        <div className="text-white/40 text-xs">{repostCount} reposts found</div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPhase("removing")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #833AB4, #FD1D1D)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      <Trash2 size={14} />
                      Remove All
                    </motion.button>
                  </div>

                  {/* Repost grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 flex-1">
                    {reposts.map((post) => (
                      <RepostCard
                        key={post.id}
                        post={post}
                        removing={removingIndex === post.id}
                        removed={removedIds.has(post.id)}
                        delay={post.id * 0.05}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── REMOVING ── */}
              {phase === "removing" && (
                <motion.div
                  key="removing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col gap-4"
                >
                  {/* Progress header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Removing reposts from @{displayName}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">
                        {Math.round((progress / 100) * repostCount)} of {repostCount} removed
                      </div>
                    </div>
                    <div
                      className="text-sm font-bold ig-gradient-text"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {progress}%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #833AB4, #FD1D1D, #F77737)" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Repost grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 flex-1">
                    {reposts.map((post) => (
                      <RepostCard
                        key={post.id}
                        post={post}
                        removing={removingIndex === post.id}
                        removed={removedIds.has(post.id)}
                        delay={post.id * 0.05}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── DONE ── */}
              {phase === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-6 py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34, 197, 94, 0.1)", border: "2px solid rgba(34, 197, 94, 0.3)" }}
                  >
                    <CheckCircle2 size={36} className="text-green-400" />
                  </motion.div>

                  <div>
                    <h3
                      className="text-2xl font-extrabold text-white mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {repostCount} Reposts Removed!
                    </h3>
                    <p className="text-white/50 text-sm max-w-xs mx-auto">
                      This was a simulation. Install the real ClearIns extension to remove your actual Instagram reposts in minutes.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a
                      href="/#download"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Get ClearIns Free <ArrowRight size={15} />
                    </motion.a>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      <RefreshCw size={14} />
                      Try Another
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-white/30 text-xs">
                    <span className="flex items-center gap-1"><Shield size={11} /> Simulation only</span>
                    <span>·</span>
                    <span>No real data accessed</span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-white/25 text-xs mt-4">
          This demo is a browser-only simulation. No Instagram data is accessed, stored, or transmitted.
        </p>
      </div>
    </section>
  );
}
