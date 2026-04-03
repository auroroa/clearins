/*
 * ClearIns Navbar
 * Design: Glassmorphic Dark — sticky top nav
 * Brand: "Clear" = white, "Ins" = Instagram gradient (purple→pink→orange)
 * Logo: Red-orange gradient rounded square with white "C"
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function ClearInsLogo({ size = 32 }: { size?: number }) {
  const r = size * 0.28; // corner radius
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ClearIns logo"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#C13584" />
        </linearGradient>
        {/* Subtle inner highlight */}
        <linearGradient id="logo-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* Background rounded square */}
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
      {/* Inner shine overlay */}
      <rect width="32" height="16" rx="8" fill="url(#logo-shine)" />
      {/* Letter C — bold, centered */}
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="white"
        fontSize="17"
        fontWeight="800"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        style={{ letterSpacing: "-0.5px" }}
      >
        C
      </text>
    </svg>
  );
}

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
        background: "rgba(13, 13, 20, 0.88)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <ClearInsLogo size={34} />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="text-white">Clear</span>
              <span className="ig-gradient-text">Ins</span>
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
