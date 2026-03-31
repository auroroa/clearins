/*
 * ClearIns — FAQ Page
 * SEO: FAQPage schema, targets "instagram repost remover" questions
 */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqCategories = [
  {
    category: "Basic Features",
    emoji: "🚀",
    faqs: [
      { q: "What is an Instagram repost remover?", a: "An Instagram repost remover is a tool that lets you bulk delete all the posts you have reposted on Instagram. ClearIns automates this process so you can remove hundreds of reposts in minutes instead of manually deleting them one by one." },
      { q: "How do I remove a repost on Instagram?", a: "To remove a repost on Instagram manually, go to your profile, tap the Reposts tab, select each repost, and tap the repost icon to remove it. For bulk removal, use ClearIns — install the free Chrome extension, open Instagram Web, and click 'Start Removing Reposts' to delete all reposts automatically." },
      { q: "Can I remove all Instagram reposts at once?", a: "Yes. ClearIns lets you bulk remove all your Instagram reposts at once with a single click. The extension automatically identifies all your reposts and removes them in sequence." },
      { q: "How fast is ClearIns compared to manual deletion?", a: "ClearIns processes approximately one repost every 3 seconds. Manual deletion takes about 10 seconds per repost — making ClearIns up to 3x faster, and far less tedious." },
      { q: "How many reposts can ClearIns handle at once?", a: "ClearIns can handle any number of reposts. Whether you have 10 or 10,000 reposts, the extension processes them all automatically in a single session." },
    ],
  },
  {
    category: "Safety & Privacy",
    emoji: "🔒",
    faqs: [
      { q: "Is ClearIns safe to use?", a: "Yes. ClearIns runs entirely in your own browser session and never asks for your Instagram password. It automates the same on-screen actions you would do manually, with built-in rate limiting to protect your account." },
      { q: "Does ClearIns need my Instagram password?", a: "No. ClearIns never asks for your Instagram password. It works within your existing browser session on instagram.com — the same way you would manually remove reposts." },
      { q: "Will my Instagram account get banned?", a: "ClearIns is designed with account safety in mind. It uses built-in rate limiting and human-like delays to avoid triggering Instagram's automated detection systems. Thousands of users have used ClearIns without any account issues." },
      { q: "Is my data safe with ClearIns?", a: "Yes. ClearIns runs 100% locally in your browser. No data is ever sent to external servers. We don't collect, store, or transmit any information about your Instagram account or activity." },
      { q: "Does Instagram notify creators when I remove a repost?", a: "No. Instagram does not send any notification to the original creator when you remove your repost of their content." },
    ],
  },
  {
    category: "Installation & Compatibility",
    emoji: "🛠️",
    faqs: [
      { q: "How do I install ClearIns?", a: "Visit the Chrome Web Store and search for 'ClearIns Instagram Repost Remover'. Click 'Add to Chrome' and confirm. The extension will appear in your browser toolbar. No sign-up or account creation required." },
      { q: "What browsers does ClearIns support?", a: "ClearIns currently supports Google Chrome and Microsoft Edge on desktop. Firefox and Safari support is planned for future releases." },
      { q: "Does ClearIns work on mobile?", a: "The ClearIns Chrome extension works on desktop (Chrome and Edge). A dedicated iOS app for removing Instagram reposts on iPhone and iPad is coming soon." },
      { q: "Does ClearIns work on Instagram Web?", a: "Yes. ClearIns works on instagram.com in Chrome or Edge. You need to be signed in to your Instagram account on the web for the extension to function." },
    ],
  },
  {
    category: "Advanced Features",
    emoji: "⚡",
    faqs: [
      { q: "Can I use other tabs while ClearIns is running?", a: "Yes. ClearIns operates in the background, allowing you to switch tabs and multitask while it removes your reposts. You'll see a progress indicator in the extension popup." },
      { q: "Can I pause or stop the removal process?", a: "Yes. You can pause or stop ClearIns at any time by clicking the extension icon and pressing 'Stop'. Your account remains completely safe." },
      { q: "Can I choose which reposts to keep?", a: "ClearIns removes all reposts by default. You can pause the process at any time to preserve specific reposts. A selective removal feature is on the roadmap." },
      { q: "Can I export a list of deleted reposts?", a: "Yes. ClearIns provides an export feature that lets you download a complete list of all removed repost URLs as a CSV file for your records." },
      { q: "Will ClearIns delete my original posts?", a: "No. ClearIns only removes content you have reposted from other accounts. Your original posts, stories, and reels are completely untouched." },
    ],
  },
  {
    category: "Pricing",
    emoji: "💰",
    faqs: [
      { q: "Is ClearIns free?", a: "Yes, ClearIns is free to use. The Chrome extension is available at no cost from the Chrome Web Store with no hidden fees or premium tiers." },
      { q: "Will ClearIns always be free?", a: "The core repost removal functionality will always be free. We may introduce optional premium features in the future, but basic bulk repost removal will remain free." },
    ],
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

export default function FAQ() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D14" }}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-14">
              <h1
                className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Frequently Asked{" "}
                <span className="ig-gradient-text">Questions</span>
              </h1>
              <p className="text-white/50 text-lg">
                Everything you need to know about the ClearIns Instagram repost remover.
              </p>
            </div>

            <div className="space-y-10">
              {faqCategories.map(({ category, emoji, faqs }) => (
                <div key={category}>
                  <h2
                    className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <span>{emoji}</span> {category}
                  </h2>
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
