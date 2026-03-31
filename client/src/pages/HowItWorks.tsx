/*
 * ClearIns — How It Works Page
 * SEO: Targets "how to remove repost on instagram" and related queries
 */
import { Chrome, Eye, Zap, CheckCircle2, ArrowRight, Shield, Lock, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EXTENSION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663482458145/ThxLfMhDv3ynviZUpEz57j/clearins-extension-preview-ZqoZtNtPUSFpDDKD2zQTRc.webp";
const FEATURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663482458145/ThxLfMhDv3ynviZUpEz57j/clearins-feature-clean-5MXzwdKCjKj56eD6ayGCKz.webp";

export default function HowItWorks() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D14" }}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              How ClearIns Removes{" "}
              <span className="ig-gradient-text">Instagram Reposts</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              ClearIns is the fastest Instagram repost remover available. Here's exactly how it works — transparently and safely.
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  icon: Chrome,
                  title: "Install the ClearIns Chrome Extension",
                  desc: "Visit the Chrome Web Store and add ClearIns to your browser in seconds. No account creation, no email required. The extension appears as a small icon in your Chrome toolbar.",
                  detail: "ClearIns is a lightweight extension that only activates when you're on instagram.com. It doesn't run in the background on other websites.",
                },
                {
                  step: "02",
                  icon: Eye,
                  title: "Open Instagram Web and Sign In",
                  desc: "Navigate to instagram.com in Chrome and sign in to your Instagram account as you normally would. ClearIns uses your existing browser session — it never sees or stores your password.",
                  detail: "Your Instagram credentials are handled entirely by Instagram's own login system. ClearIns only interacts with the page after you're already logged in.",
                },
                {
                  step: "03",
                  icon: Zap,
                  title: "Launch ClearIns and Start Removing",
                  desc: "Click the ClearIns icon in your toolbar. The extension popup shows your repost count and a 'Start Removing Reposts' button. One click starts the automated bulk removal process.",
                  detail: "ClearIns navigates to your Reposts tab and removes each repost one by one, with built-in delays between actions to mimic natural browsing behavior.",
                },
                {
                  step: "04",
                  icon: Activity,
                  title: "Monitor Progress in Real Time",
                  desc: "Watch the live progress counter as ClearIns removes your reposts. You can see exactly how many have been removed and how many remain. Switch tabs and multitask — ClearIns works in the background.",
                  detail: "When the process is complete, you can export a CSV file containing all the URLs of removed reposts for your records.",
                },
              ].map(({ step, icon: Icon, title, desc, detail }) => (
                <div key={step} className="glass-card p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(131, 58, 180, 0.15)" }}
                      >
                        <Icon size={24} className="text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-sm font-bold ig-gradient-text opacity-60"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          Step {step}
                        </span>
                      </div>
                      <h2
                        className="text-xl font-bold text-white mb-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {title}
                      </h2>
                      <p className="text-white/60 text-sm leading-relaxed mb-3">{desc}</p>
                      <p
                        className="text-white/40 text-xs leading-relaxed px-3 py-2 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        💡 {detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Privacy &amp; Safety First
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  ClearIns was built with a privacy-first philosophy. Every design decision prioritizes your account security and data privacy.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: Lock, title: "Zero Password Access", desc: "ClearIns never requests, stores, or transmits your Instagram password." },
                    { icon: Shield, title: "No External Servers", desc: "All processing happens in your browser. No data leaves your device." },
                    { icon: Activity, title: "Rate Limit Protection", desc: "Built-in pacing prevents aggressive action bursts that could flag your account." },
                    { icon: CheckCircle2, title: "Instant Uninstall", desc: "Remove ClearIns at any time. Your Instagram account remains completely intact." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(34, 197, 94, 0.1)" }}
                      >
                        <Icon size={16} className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</div>
                        <div className="text-white/50 text-xs mt-0.5">{desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src={EXTENSION_IMG}
                  alt="ClearIns extension interface showing safe Instagram repost removal"
                  className="rounded-2xl w-full max-w-xs mx-auto"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  loading="lazy"
                  width="400"
                  height="533"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="max-w-2xl mx-auto text-center p-10 rounded-2xl"
            style={{
              background: "rgba(131, 58, 180, 0.1)",
              border: "1px solid rgba(131, 58, 180, 0.2)",
            }}
          >
            <h2
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Ready to Clean Your Instagram Profile?
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Join 50,000+ users who use ClearIns to remove Instagram reposts in bulk. Free, fast, and safe.
            </p>
            <a
              href="/#download"
              className="btn-ig px-8 py-3.5 text-base rounded-xl font-bold text-white inline-flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get ClearIns Free <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
