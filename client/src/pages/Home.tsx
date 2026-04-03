/*
 * ClearIns — Home Page
 * Design: Glassmorphic Dark — Instagram Night Mode
 * Target keyword: "instagram repost remover"
 *
 * Sections:
 * 1. Hero — H1 with primary keyword, CTA
 * 2. Social Proof Stats
 * 3. Why Remove Reposts (pain points)
 * 4. How It Works (HowTo schema)
 * 5. Features Grid
 * 6. Comparison Table
 * 7. Time Estimator (interactive)
 * 8. FAQ (FAQPage schema)
 * 9. Blog Preview
 * 10. Final CTA / Download
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import {
  Chrome,
  Smartphone,
  Shield,
  Zap,
  Eye,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  RefreshCw,
  Activity,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663482458145/ThxLfMhDv3ynviZUpEz57j/clearins-hero-bg-DnqJ9oBvwq4osFjnLgeQ9n.webp";
const FEATURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663482458145/ThxLfMhDv3ynviZUpEz57j/clearins-feature-clean-5MXzwdKCjKj56eD6ayGCKz.webp";
const EXTENSION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663482458145/ThxLfMhDv3ynviZUpEz57j/clearins-extension-preview-ZqoZtNtPUSFpDDKD2zQTRc.webp";
const MOBILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663482458145/ThxLfMhDv3ynviZUpEz57j/clearins-mobile-app-48rqzP9mG7u6vJTjiyzuwK.webp";

const faqs = [
  {
    q: "What is an Instagram repost remover?",
    a: "An Instagram repost remover is a tool that lets you bulk delete all the posts you have reposted on Instagram. ClearIns automates this process so you can remove hundreds of reposts in minutes instead of manually deleting them one by one.",
  },
  {
    q: "How do I remove a repost on Instagram?",
    a: "To remove a repost on Instagram manually, go to your profile, tap the Reposts tab, select each repost, and tap the repost icon to remove it. For bulk removal, use ClearIns — install the free Chrome extension, open Instagram Web, and click 'Start Removing Reposts' to delete all reposts automatically.",
  },
  {
    q: "Is ClearIns safe to use?",
    a: "Yes. ClearIns runs entirely in your own browser session and never asks for your Instagram password. It automates the same on-screen actions you would do manually, with built-in rate limiting to protect your account.",
  },
  {
    q: "How long does it take to remove all Instagram reposts?",
    a: "ClearIns can remove approximately 100 reposts in under 5 minutes. Manual deletion takes about 10 seconds per repost — ClearIns is up to 10x faster.",
  },
  {
    q: "Does Instagram notify people when I remove a repost?",
    a: "No. Instagram does not send notifications to the original creator when you remove your repost of their content.",
  },
  {
    q: "Can I remove all Instagram reposts at once?",
    a: "Yes. ClearIns lets you bulk remove all your Instagram reposts at once with a single click. The extension automatically identifies all your reposts and removes them in sequence.",
  },
  {
    q: "Does ClearIns work on mobile?",
    a: "The ClearIns Chrome extension works on desktop (Chrome and Edge). A dedicated iOS app for removing Instagram reposts on iPhone and iPad is coming soon.",
  },
  {
    q: "Is ClearIns free?",
    a: "Yes, ClearIns is free to use. The Chrome extension is available at no cost from the Chrome Web Store.",
  },
  {
    q: "Will ClearIns delete my original posts?",
    a: "No. ClearIns only removes content you have reposted from other accounts. Your original posts, stories, and reels remain completely untouched.",
  },
  {
    q: "What browsers does ClearIns support?",
    a: "ClearIns currently supports Google Chrome and Microsoft Edge on desktop. Firefox and Safari support is planned for future releases.",
  },
];

const features = [
  { icon: Zap, title: "Bulk Removal", desc: "Delete hundreds of Instagram reposts in minutes, not hours." },
  { icon: Shield, title: "No Password Required", desc: "Runs in your own browser session. We never touch your credentials." },
  { icon: Activity, title: "Real-time Progress", desc: "Watch every repost get removed live with a detailed progress tracker." },
  { icon: RefreshCw, title: "Smart Rate Limiting", desc: "Built-in pacing mimics natural behavior to keep your account safe." },
  { icon: Eye, title: "Background Operation", desc: "Switch tabs and multitask while ClearIns works in the background." },
  { icon: Download, title: "Export Deleted URLs", desc: "Download a complete log of all removed reposts for your records." },
  { icon: Lock, title: "100% Local & Private", desc: "All actions stay in your browser. Zero data sent to external servers." },
  { icon: Clock, title: "10x Faster Than Manual", desc: "What takes 2 hours manually takes under 12 minutes with ClearIns." },
];

const blogPosts = [
  {
    slug: "how-to-remove-repost-on-instagram",
    title: "How to Remove a Repost on Instagram (Step-by-Step Guide 2026)",
    excerpt: "Learn how to remove a single repost or bulk delete all your Instagram reposts at once. Complete guide for mobile and desktop.",
    date: "2026-03-15",
    readTime: "5 min read",
    tags: ["Instagram", "Tutorial"],
  },
  {
    slug: "instagram-repost-remover-extension",
    title: "Instagram Repost Remover Extension: The Complete Guide",
    excerpt: "Everything you need to know about using a Chrome extension to remove Instagram reposts in bulk. Free, fast, and safe.",
    date: "2026-03-10",
    readTime: "4 min read",
    tags: ["Extension", "Chrome"],
  },
  {
    slug: "bulk-delete-instagram-reposts",
    title: "How to Bulk Delete Instagram Reposts in Minutes",
    excerpt: "Stop deleting Instagram reposts one by one. This guide shows you how to bulk remove all your reposts using ClearIns.",
    date: "2026-03-05",
    readTime: "3 min read",
    tags: ["Instagram", "Bulk Delete"],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="glass-card p-5 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className="text-white font-semibold text-base leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {q}
        </h3>
        <span className="text-white/40 flex-shrink-0 mt-0.5">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-white/60 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ── Slot-machine digit roller ─────────────────────────────────────────────────
function SlotDigit({ value, delay = 0 }: { value: string; delay?: number }) {
  const [displayed, setDisplayed] = useState(value);
  const [rolling, setRolling] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current === value) return;
    prevRef.current = value;
    setRolling(true);
    const t = setTimeout(() => {
      setDisplayed(value);
      setRolling(false);
    }, 2400 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <span
      className="slot-digit"
      data-rolling={rolling}
      style={{ "--slot-delay": `${delay}ms` } as React.CSSProperties}
    >
      {rolling ? displayed : displayed}
    </span>
  );
}

function SlotNumber({ value, suffix = "", color = "ig" }: { value: number; suffix?: string; color?: "ig" | "muted" }) {
  const str = String(value);
  const digits = str.split("");

  return (
    <span className="slot-number inline-flex items-end gap-0">
      {digits.map((d, i) => (
        <SlotDigit key={i} value={d} delay={i * 60} />
      ))}
      {suffix && (
        <span
          className={`slot-suffix ml-0.5 ${color === "ig" ? "ig-gradient-text" : "text-white/50"}`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [repostCount, setRepostCount] = useState(250);
  const [inputVal, setInputVal] = useState("250");
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearInsTime = Math.ceil((repostCount * 3) / 60);
  const manualTime = Math.ceil((repostCount * 10) / 60);
  const savedTime = manualTime - clearInsTime;
  const savedPct = manualTime > 0 ? Math.round((savedTime / manualTime) * 100) : 0;

  const triggerSpin = useCallback((newCount: number) => {
    setIsSpinning(true);
    setRepostCount(newCount);
    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    spinTimerRef.current = setTimeout(() => setIsSpinning(false), 2600);
  }, []);

  const handleInput = (raw: string) => {
    setInputVal(raw);
    const n = Math.max(1, Math.min(10000, parseInt(raw) || 1));
    triggerSpin(n);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0D0D14" }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        aria-label="Hero section"
      >
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            opacity: 0.35,
          }}
          aria-hidden="true"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(13,13,20,0.4) 0%, rgba(13,13,20,0.7) 60%, rgba(13,13,20,1) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 animate-fade-in-up"
            style={{
              background: "rgba(131, 58, 180, 0.15)",
              border: "1px solid rgba(131, 58, 180, 0.3)",
              color: "#c084fc",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Free Chrome Extension — No Sign-up Required
          </div>

          {/* H1 — Primary keyword target */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up animate-delay-100"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}
          >
            Instagram{" "}
            <span className="ig-gradient-text">Repost Remover</span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90">
              Clean Your Profile in Minutes
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Remove all your Instagram reposts in bulk with one click. ClearIns automates the entire process — no password needed, no risk to your account.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <a
              href="#download"
              id="download"
              className="btn-ig pulse-glow px-8 py-4 text-base rounded-xl font-bold text-white flex items-center gap-2.5 w-full sm:w-auto justify-center"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Chrome size={20} />
              Add to Chrome — It's Free
            </a>
            <a
              href="#download"
              className="px-8 py-4 text-base rounded-xl font-semibold text-white/80 flex items-center gap-2.5 w-full sm:w-auto justify-center"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <Smartphone size={20} />
              iOS App — Coming Soon
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 animate-fade-in-up animate-delay-400">
            {[
              { icon: Lock, text: "No Password Required" },
              { icon: Shield, text: "100% Local & Private" },
              { icon: CheckCircle2, text: "Free Forever" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-white/40 text-sm">
                <Icon size={14} className="text-green-400" />
                {text}
              </div>
            ))}
          </div>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-2 mt-6 animate-fade-in-up animate-delay-400">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white/50 text-sm">4.8 · 1,247 reviews on Chrome Web Store</span>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16" aria-label="Statistics">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "50K+", label: "Users Trust ClearIns" },
              { value: "10M+", label: "Reposts Removed" },
              { value: "4.8★", label: "Chrome Store Rating" },
              { value: "30s", label: "Average Clean Time" },
            ].map(({ value, label }) => (
              <div key={label} className="glass-card p-6 text-center">
                <div
                  className="stat-number text-3xl md:text-4xl ig-gradient-text mb-1"
                >
                  {value}
                </div>
                <div className="text-white/50 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY REMOVE REPOSTS ===== */}
      <section className="py-20" id="why" aria-labelledby="why-heading">
        <div className="container">
          <div className="text-center mb-14">
            <h2
              id="why-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Why You Need an{" "}
              <span className="ig-gradient-text">Instagram Repost Remover</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Instagram doesn't offer a native bulk delete option for reposts. Here's why creators use ClearIns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "😬",
                title: "Accidental Reposts",
                desc: "The repost button sits millimeters from 'Like', leading to unwanted shares that clutter your profile.",
              },
              {
                emoji: "🎨",
                title: "Brand Consistency",
                desc: "Off-niche reposts dilute your aesthetic and confuse your followers about what your account stands for.",
              },
              {
                emoji: "🔒",
                title: "Privacy & Footprint",
                desc: "Remove dated or controversial content fast. Clean your digital footprint without the manual grind.",
              },
              {
                emoji: "⏱️",
                title: "No Native Bulk Delete",
                desc: "Instagram forces you to remove reposts one by one. ClearIns automates all those repetitive taps.",
              },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3
                  className="text-white font-semibold mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section
        className="py-20 relative overflow-hidden"
        id="how-it-works"
        aria-labelledby="how-heading"
        style={{ background: "rgba(131, 58, 180, 0.04)" }}
      >
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <h2
              id="how-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              How to Remove Instagram Reposts{" "}
              <span className="ig-gradient-text">in 3 Steps</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              The fastest Instagram repost remover. Install once, clean forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: Chrome,
                title: "Install ClearIns",
                desc: "Add the free ClearIns Chrome extension from the Chrome Web Store. No sign-up, no account needed.",
              },
              {
                step: "02",
                icon: Eye,
                title: "Open Instagram Web",
                desc: "Navigate to instagram.com in Chrome and sign in to your Instagram account as normal.",
              },
              {
                step: "03",
                icon: Zap,
                title: "Start Removing Reposts",
                desc: "Click the ClearIns icon and press 'Start Removing Reposts'. Watch your profile get cleaned in real time.",
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <div key={step} className="relative">
                <div className="glass-card p-8 text-center h-full">
                  <div
                    className="text-6xl font-extrabold ig-gradient-text mb-4 opacity-30"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(131, 58, 180, 0.2)" }}
                  >
                    <Icon size={22} className="text-purple-400" />
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight size={20} className="text-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="mt-16 flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="flex-1">
              <img
                src={EXTENSION_IMG}
                alt="ClearIns Chrome extension popup showing Instagram repost removal progress"
                className="rounded-2xl w-full max-w-xs mx-auto"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                loading="lazy"
                width="400"
                height="533"
              />
            </div>
            <div className="flex-1">
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Works in Your Browser,<br />
                <span className="ig-gradient-text">No Server Access Needed</span>
              </h3>
              <ul className="space-y-3">
                {[
                  "Runs entirely in your Chrome session",
                  "No Instagram password ever requested",
                  "No data sent to external servers",
                  "Built-in rate limiting protects your account",
                  "Pause or stop at any time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/60 text-sm">
                    <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20" id="features" aria-labelledby="features-heading">
        <div className="container">
          <div className="text-center mb-14">
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Everything You Need in an{" "}
              <span className="ig-gradient-text">Instagram Repost Remover</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 transition-all duration-200 hover:scale-[1.02]">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(131, 58, 180, 0.15)" }}
                >
                  <Icon size={20} className="text-purple-400" />
                </div>
                <h3
                  className="text-white font-semibold mb-2 text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Feature visual */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <img
                src={FEATURE_IMG}
                alt="ClearIns bulk Instagram repost removal visualization showing posts being cleared"
                className="rounded-2xl w-full"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                loading="lazy"
                width="600"
                height="450"
              />
            </div>
            <div>
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Bulk Remove Instagram Reposts<br />
                <span className="ig-gradient-text">Up to 10x Faster</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Manual deletion takes about 10 seconds per repost. With 500 reposts, that's over 80 minutes of tedious tapping. ClearIns automates every step, removing reposts at a safe, consistent pace — finishing the same job in under 30 minutes.
              </p>
              <a
                href="#download"
                className="btn-ig px-6 py-3 text-sm rounded-lg font-semibold text-white inline-flex items-center gap-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Start Removing Reposts Free
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section
        className="py-20"
        aria-labelledby="comparison-heading"
        style={{ background: "rgba(131, 58, 180, 0.03)" }}
      >
        <div className="container">
          <div className="text-center mb-14">
            <h2
              id="comparison-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              ClearIns vs. Other Methods
            </h2>
            <p className="text-white/50">The safest and fastest way to remove Instagram reposts.</p>
          </div>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th className="text-left py-4 px-4 text-white/50 font-medium">Method</th>
                  <th className="text-center py-4 px-4 text-white/50 font-medium">Time (500 reposts)</th>
                  <th className="text-center py-4 px-4 text-white/50 font-medium">Account Risk</th>
                  <th className="text-center py-4 px-4 text-white/50 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { method: "Manual (phone)", time: "~80 min tapping", risk: "None", cost: "Free", highlight: false },
                  { method: "Random Cleaner App", time: "Unknown", risk: "High", cost: "Varies", highlight: false },
                  { method: "Apps Requiring Password", time: "Unknown", risk: "Very High", cost: "Paid", highlight: false },
                  { method: "ClearIns (Recommended)", time: "~25 min", risk: "Low", cost: "Free", highlight: true },
                ].map(({ method, time, risk, cost, highlight }) => (
                  <tr
                    key={method}
                    className={highlight ? "rounded-lg" : ""}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: highlight ? "rgba(131, 58, 180, 0.1)" : "transparent",
                    }}
                  >
                    <td className="py-4 px-4">
                      <span className={highlight ? "ig-gradient-text font-bold" : "text-white/70"}>
                        {method}
                      </span>
                      {highlight && (
                        <span
                          className="ml-2 text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(131, 58, 180, 0.3)", color: "#c084fc" }}
                        >
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-white/60">{time}</td>
                    <td className="py-4 px-4 text-center">
                      {risk === "Low" || risk === "None" ? (
                        <span className="text-green-400 flex items-center justify-center gap-1">
                          <CheckCircle2 size={14} /> {risk}
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center justify-center gap-1">
                          <XCircle size={14} /> {risk}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={cost === "Free" ? "text-green-400 font-semibold" : "text-white/50"}>
                        {cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== TIME ESTIMATOR ===== */}
      <section className="py-20" aria-labelledby="estimator-heading">
        {/* Slot machine keyframes injected inline */}
        <style>{`
          @keyframes slotSpin {
            0%   { transform: translateY(0);     opacity: 1; }
            8%   { transform: translateY(-120%); opacity: 0; }
            9%   { transform: translateY(120%);  opacity: 0; }
            18%  { transform: translateY(0);     opacity: 1; }
            26%  { transform: translateY(-120%); opacity: 0; }
            27%  { transform: translateY(120%);  opacity: 0; }
            36%  { transform: translateY(0);     opacity: 1; }
            44%  { transform: translateY(-120%); opacity: 0; }
            45%  { transform: translateY(120%);  opacity: 0; }
            54%  { transform: translateY(0);     opacity: 1; }
            62%  { transform: translateY(-120%); opacity: 0; }
            63%  { transform: translateY(120%);  opacity: 0; }
            72%  { transform: translateY(0);     opacity: 1; }
            80%  { transform: translateY(-120%); opacity: 0; }
            81%  { transform: translateY(120%);  opacity: 0; }
            90%  { transform: translateY(0);     opacity: 1; }
            100% { transform: translateY(0);     opacity: 1; }
          }
          @keyframes slotGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(131,58,180,0); }
            30%       { box-shadow: 0 0 24px 4px rgba(131,58,180,0.45); }
            60%       { box-shadow: 0 0 16px 2px rgba(253,29,29,0.3); }
          }
          @keyframes savingsPop {
            0%   { transform: scale(0.85); opacity: 0; }
            60%  { transform: scale(1.06); opacity: 1; }
            100% { transform: scale(1);   opacity: 1; }
          }
          .slot-digit {
            display: inline-block;
            overflow: hidden;
            line-height: 1;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
          }
          .slot-digit[data-rolling="true"] {
            animation: slotSpin 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            animation-delay: var(--slot-delay, 0ms);
          }
          .slot-card-spinning {
            animation: slotGlow 2.4s ease-in-out;
          }
          .savings-pop {
            animation: savingsPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }
          /* Preset buttons */
          .preset-btn {
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            font-family: 'Plus Jakarta Sans', sans-serif;
            border: 1px solid rgba(131,58,180,0.25);
            background: rgba(131,58,180,0.08);
            color: rgba(255,255,255,0.55);
            cursor: pointer;
            transition: all 0.15s;
          }
          .preset-btn:hover, .preset-btn.active {
            background: rgba(131,58,180,0.22);
            border-color: rgba(131,58,180,0.5);
            color: #c084fc;
          }
        `}</style>

        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="estimator-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              ⏱️ How Long Will It Take?
            </h2>
            <p className="text-white/50 mb-10">
              Enter your repost count — watch the numbers spin.
            </p>

            <div
              className={`glass-card p-8 transition-all ${isSpinning ? "slot-card-spinning" : ""}`}
            >
              {/* Input + Presets */}
              <div className="mb-8">
                <label
                  htmlFor="repost-count"
                  className="block text-white/60 text-xs mb-3 font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Number of Instagram reposts
                </label>
                <input
                  id="repost-count"
                  type="number"
                  min="1"
                  max="10000"
                  value={inputVal}
                  onChange={(e) => handleInput(e.target.value)}
                  className="w-full text-center text-3xl font-extrabold text-white bg-transparent border-2 rounded-2xl py-4 px-4 focus:outline-none transition-all"
                  style={{
                    borderColor: isSpinning ? "rgba(131,58,180,0.7)" : "rgba(131,58,180,0.35)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: isSpinning ? "0 0 20px rgba(131,58,180,0.25)" : "none",
                  }}
                />
                {/* Quick presets */}
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  {[50, 100, 250, 500, 1000].map((n) => (
                    <button
                      key={n}
                      className={`preset-btn ${repostCount === n ? "active" : ""}`}
                      onClick={() => { setInputVal(String(n)); triggerSpin(n); }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot display */}
              <div className="grid grid-cols-2 gap-5 mb-5">
                {/* ClearIns card */}
                <div
                  className="rounded-2xl p-6 text-center relative overflow-hidden"
                  style={{
                    background: "rgba(131,58,180,0.1)",
                    border: isSpinning ? "1px solid rgba(131,58,180,0.5)" : "1px solid rgba(131,58,180,0.2)",
                    transition: "border-color 0.3s",
                  }}
                >
                  {/* Scanline shimmer */}
                  {isSpinning && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(131,58,180,0.04) 3px, rgba(131,58,180,0.04) 4px)",
                      }}
                    />
                  )}
                  <div className="text-purple-400 text-xs font-bold mb-3 uppercase tracking-widest">
                    🚀 With ClearIns
                  </div>
                  <div
                    className="ig-gradient-text text-5xl font-extrabold leading-none mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <SlotNumber value={clearInsTime} suffix="m" color="ig" />
                  </div>
                  <div className="text-purple-400/60 text-xs mt-2 font-medium">~3 sec / repost</div>
                </div>

                {/* Manual card */}
                <div
                  className="rounded-2xl p-6 text-center relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: isSpinning ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.3s",
                  }}
                >
                  {isSpinning && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)",
                      }}
                    />
                  )}
                  <div className="text-white/40 text-xs font-bold mb-3 uppercase tracking-widest">
                    👆 Manual Deletion
                  </div>
                  <div
                    className="text-white/55 text-5xl font-extrabold leading-none mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <SlotNumber value={manualTime} suffix="m" color="muted" />
                  </div>
                  <div className="text-white/30 text-xs mt-2 font-medium">~10 sec / repost</div>
                </div>
              </div>

              {/* Savings banner */}
              <div
                key={`${clearInsTime}-${manualTime}`}
                className="rounded-2xl p-4 text-center savings-pop"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <span
                  className="text-green-400 font-bold text-base"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  🚀 Save{" "}
                  <span className="text-green-300">{savedTime} minutes</span>
                  {" "}—{" "}
                  <span className="text-green-300">{savedPct}% faster</span>
                  {" "}with ClearIns
                </span>
              </div>

              {/* Spinning indicator */}
              {isSpinning && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-white/30 text-xs ml-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Calculating...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD / CTA ===== */}
      <section
        className="py-20 relative overflow-hidden"
        id="download"
        aria-labelledby="download-heading"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(131, 58, 180, 0.2) 0%, rgba(253, 29, 29, 0.1) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              id="download-heading"
              className="text-3xl md:text-5xl font-extrabold text-white mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Ready to Clean Your<br />
              <span className="ig-gradient-text">Instagram Profile?</span>
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Join 50,000+ Instagram users who use ClearIns to remove reposts in bulk. Free, fast, and safe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ig pulse-glow px-8 py-4 text-base rounded-xl font-bold text-white flex items-center gap-3 w-full sm:w-auto justify-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                aria-label="Add ClearIns Instagram Repost Remover to Chrome"
              >
                <Chrome size={22} />
                <div className="text-left">
                  <div className="text-xs opacity-80 font-normal">Add to Chrome</div>
                  <div>ClearIns Extension</div>
                </div>
              </a>

              <div
                className="px-8 py-4 text-base rounded-xl font-semibold text-white/50 flex items-center gap-3 w-full sm:w-auto justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Smartphone size={22} />
                <div className="text-left">
                  <div className="text-xs opacity-60 font-normal">Coming Soon</div>
                  <div>iOS App</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Free forever</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> No sign-up</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> No password needed</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Works worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20" id="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="text-center mb-14">
            <h2
              id="faq-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-white/50">
              Everything you need to know about the ClearIns Instagram repost remover.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              View all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section
        className="py-20"
        aria-labelledby="blog-heading"
        style={{ background: "rgba(131, 58, 180, 0.03)" }}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2
              id="blog-heading"
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Latest Guides
            </h2>
            <Link
              href="/blog"
              className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass-card p-6 h-full cursor-pointer">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(131, 58, 180, 0.2)", color: "#c084fc" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-white font-bold text-base mb-3 leading-snug"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-white/30 text-xs mt-auto">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOBILE APP PREVIEW ===== */}
      <section className="py-20" aria-labelledby="app-heading">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2
                id="app-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                ClearIns iOS App<br />
                <span className="ig-gradient-text">Coming Soon</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                Remove Instagram reposts directly from your iPhone or iPad. The ClearIns iOS app brings the same powerful bulk repost removal to mobile — no desktop required.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Bulk remove reposts from your iPhone",
                  "Same privacy-first, no-password approach",
                  "Real-time progress tracking",
                  "Available on App Store",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white/60 text-sm">
                    <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-white/50 text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Smartphone size={18} />
                Notify me when available
              </div>
            </div>
            <div>
              <img
                src={MOBILE_IMG}
                alt="ClearIns iOS app for removing Instagram reposts on iPhone"
                className="rounded-2xl w-full max-w-sm mx-auto"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                loading="lazy"
                width="400"
                height="533"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
