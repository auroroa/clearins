/*
 * ClearIns — Blog Index Page
 * SEO: Targets long-tail instagram repost keywords
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "how-to-remove-repost-on-instagram",
    title: "How to Remove a Repost on Instagram (Step-by-Step Guide 2026)",
    excerpt: "Learn how to remove a single repost or bulk delete all your Instagram reposts at once. Complete guide for mobile and desktop, plus the fastest tool available.",
    date: "2026-03-15",
    readTime: "5 min read",
    tags: ["Instagram", "Tutorial"],
  },
  {
    slug: "instagram-repost-remover-extension",
    title: "Instagram Repost Remover Extension: The Complete Guide",
    excerpt: "Everything you need to know about using a Chrome extension to remove Instagram reposts in bulk. Free, fast, and safe — no password required.",
    date: "2026-03-10",
    readTime: "4 min read",
    tags: ["Extension", "Chrome"],
  },
  {
    slug: "bulk-delete-instagram-reposts",
    title: "How to Bulk Delete Instagram Reposts in Minutes",
    excerpt: "Stop deleting Instagram reposts one by one. This guide shows you how to bulk remove all your reposts using ClearIns in under 30 minutes.",
    date: "2026-03-05",
    readTime: "3 min read",
    tags: ["Instagram", "Bulk Delete"],
  },
  {
    slug: "how-to-unrepost-on-instagram",
    title: "How to Unrepost on Instagram (Single & Bulk Unrepost Guide)",
    excerpt: "Accidentally reposted something on Instagram? Here's how to unrepost a single post or remove all your reposts at once — step by step.",
    date: "2026-02-28",
    readTime: "4 min read",
    tags: ["Instagram", "Unrepost"],
  },
  {
    slug: "instagram-repost-cleaner-guide",
    title: "Instagram Repost Cleaner: Why You Need One in 2026",
    excerpt: "Your Instagram profile is your brand. Learn why a repost cleaner is essential for creators, businesses, and privacy-conscious users.",
    date: "2026-02-20",
    readTime: "5 min read",
    tags: ["Instagram", "Profile"],
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D14" }}>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mb-14">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Instagram Repost{" "}
              <span className="ig-gradient-text">Guides & Tips</span>
            </h1>
            <p className="text-white/50 text-lg">
              Step-by-step tutorials on removing Instagram reposts, managing your profile, and using ClearIns effectively.
            </p>
          </div>

          {/* Featured post */}
          <Link href={`/blog/${posts[0].slug}`}>
            <article
              className="glass-card p-8 mb-8 cursor-pointer"
              style={{ border: "1px solid rgba(131, 58, 180, 0.2)" }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {posts[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(131, 58, 180, 0.2)", color: "#c084fc" }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80" }}
                >
                  Featured
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {posts[0].title}
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center justify-between text-white/30 text-sm">
                <span>{posts[0].date} · {posts[0].readTime}</span>
                <span className="text-purple-400 flex items-center gap-1">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          </Link>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(1).map((post) => (
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
                  <h2
                    className="text-white font-bold text-lg mb-3 leading-snug"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-white/30 text-xs mt-auto">
                    <span>{post.date} · {post.readTime}</span>
                    <span className="text-purple-400 flex items-center gap-1">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
