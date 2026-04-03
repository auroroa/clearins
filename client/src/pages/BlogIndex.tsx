/*
 * ClearIns — Blog Index Page
 * Domain: clearins.io
 * SEO: Targets instagram repost remover and related long-tail keywords
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "how-to-remove-repost-on-instagram",
    title: "How to Remove a Repost on Instagram (Complete 2026 Guide)",
    excerpt: "Learn every method to remove a single repost or bulk delete all your Instagram reposts at once. Complete guide for iPhone, Android, and desktop — plus the fastest tool available.",
    date: "2026-03-15",
    readTime: "7 min read",
    tags: ["Instagram", "Tutorial"],
    featured: true,
  },
  {
    slug: "instagram-repost-remover-extension",
    title: "Instagram Repost Remover Chrome Extension: The Complete Guide (2026)",
    excerpt: "Everything you need to know about using a Chrome extension to remove Instagram reposts in bulk. Free, fast, and safe — no password required.",
    date: "2026-03-10",
    readTime: "6 min read",
    tags: ["Extension", "Chrome"],
    featured: false,
  },
  {
    slug: "bulk-delete-instagram-reposts",
    title: "How to Bulk Delete Instagram Reposts in Minutes (2026 Guide)",
    excerpt: "Stop deleting Instagram reposts one by one. This guide shows you how to bulk remove all your reposts using ClearIns in under 30 minutes.",
    date: "2026-03-05",
    readTime: "5 min read",
    tags: ["Instagram", "Bulk Delete"],
    featured: false,
  },
  {
    slug: "how-to-unrepost-on-instagram",
    title: "How to Unrepost on Instagram: Single & Bulk Unrepost Guide (2026)",
    excerpt: "Accidentally reposted something on Instagram? Here's how to unrepost a single post or remove all your reposts at once — step by step.",
    date: "2026-02-28",
    readTime: "5 min read",
    tags: ["Instagram", "Unrepost"],
    featured: false,
  },
  {
    slug: "instagram-repost-cleaner-guide",
    title: "Instagram Repost Cleaner: The Complete Guide for 2026",
    excerpt: "Your Instagram profile is your brand. Learn why a repost cleaner is essential for creators, businesses, and privacy-conscious users — and how ClearIns helps.",
    date: "2026-02-20",
    readTime: "6 min read",
    tags: ["Instagram", "Profile"],
    featured: false,
  },
  {
    slug: "how-to-delete-reposts-on-instagram",
    title: "How to Delete Reposts on Instagram: Every Method Explained (2026)",
    excerpt: "Learn every way to delete reposts on Instagram — one at a time or all at once. Includes step-by-step instructions for iPhone, Android, and desktop.",
    date: "2026-04-01",
    readTime: "6 min read",
    tags: ["Instagram", "Delete Reposts"],
    featured: false,
  },
  {
    slug: "instagram-repost-not-showing",
    title: "Instagram Repost Not Showing? Here's Why & How to Fix It (2026)",
    excerpt: "Instagram repost not showing on your profile or can't find the Reposts tab? Learn the 7 most common reasons and how to fix each one.",
    date: "2026-04-01",
    readTime: "5 min read",
    tags: ["Instagram", "Troubleshooting"],
    featured: false,
  },
  {
    slug: "instagram-repost-vs-share",
    title: "Instagram Repost vs Share: What's the Difference? (2026 Guide)",
    excerpt: "Instagram Repost vs Share to Story — what's the difference? Learn when to use each feature, how they affect your profile, and how to manage reposts.",
    date: "2026-04-01",
    readTime: "5 min read",
    tags: ["Instagram", "Guide"],
    featured: false,
  },
];

export default function BlogIndex() {
  useEffect(() => {
    document.title = "Instagram Repost Guides & Tips | ClearIns Blog";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Step-by-step guides on removing Instagram reposts, managing your profile, and using ClearIns to bulk delete reposts in minutes.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://clearins.io/blog");
    return () => {
      document.title = "Instagram Repost Remover – Remove All Reposts Fast & Free | ClearIns";
    };
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen" style={{ background: "#0D0D14" }}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container">

          {/* Header */}
          <div className="max-w-2xl mb-14">
            <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">ClearIns Blog</p>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Instagram Repost{" "}
              <span className="ig-gradient-text">Guides & Tips</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Step-by-step tutorials on removing Instagram reposts, managing your profile, and using ClearIns effectively. {posts.length} articles and growing.
            </p>
          </div>

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`}>
            <article
              className="glass-card p-8 mb-8 cursor-pointer group transition-all hover:border-purple-500/30"
              style={{ border: "1px solid rgba(131, 58, 180, 0.2)" }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "rgba(131, 58, 180, 0.2)", color: "#c084fc" }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80" }}
                >
                  ★ Featured
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-purple-300 transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {featured.title}
              </h2>
              <p className="text-white/50 leading-relaxed mb-5">{featured.excerpt}</p>
              <div className="flex items-center justify-between text-white/30 text-sm flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {featured.readTime}
                  </span>
                </div>
                <span className="text-purple-400 flex items-center gap-1 font-medium group-hover:gap-2 transition-all">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          </Link>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  className="glass-card p-6 h-full cursor-pointer group transition-all hover:border-purple-500/30 flex flex-col"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
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
                  <h2
                    className="text-white font-bold text-base mb-3 leading-snug group-hover:text-purple-300 transition-colors flex-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-white/25 text-xs mt-auto">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                    </span>
                    <span className="text-purple-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-16 p-10 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(131,58,180,0.12), rgba(253,29,29,0.08))",
              border: "1px solid rgba(131,58,180,0.2)",
            }}
          >
            <h2
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Ready to clean your Instagram profile?
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Use ClearIns to remove all your Instagram reposts in minutes — free, safe, no password needed.
            </p>
            <a
              href="/#download"
              className="btn-ig px-7 py-3.5 text-sm rounded-xl font-bold text-white inline-flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get ClearIns Free <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
