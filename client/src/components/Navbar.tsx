/*
 * ClearIns Navbar
 * Design: Glassmorphic Dark — sticky top nav with Instagram gradient logo
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(13, 13, 20, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)" }}
            >
              C
            </div>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="ig-gradient-text">Clear</span>
              <span className="text-white">Ins</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#download"
              className="btn-ig px-4 py-2 text-sm rounded-lg font-semibold text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get ClearIns Free
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white py-1"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#download"
                className="btn-ig px-4 py-2.5 text-sm rounded-lg font-semibold text-white text-center mt-2"
                onClick={() => setOpen(false)}
              >
                Get ClearIns Free
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
