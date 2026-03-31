/*
 * ClearIns Footer
 * Design: Glassmorphic Dark — clean footer with gradient brand
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      className="mt-24 pt-12 pb-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
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
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              ClearIns is the fastest Instagram repost remover. Clean your profile in minutes. No password required.
            </p>
            <p className="text-white/30 text-xs mt-4">
              Independent tool. Not affiliated with or endorsed by Instagram or Meta.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3
              className="text-white font-semibold text-sm mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Product
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/how-it-works" className="text-white/50 hover:text-white text-sm transition-colors">How It Works</Link></li>
              <li><a href="#features" className="text-white/50 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#download" className="text-white/50 hover:text-white text-sm transition-colors">Chrome Extension</a></li>
              <li><a href="#download" className="text-white/50 hover:text-white text-sm transition-colors">iOS App (Coming Soon)</a></li>
              <li><Link href="/faq" className="text-white/50 hover:text-white text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className="text-white font-semibold text-sm mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-white/50 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/blog/how-to-remove-repost-on-instagram" className="text-white/50 hover:text-white text-sm transition-colors">How to Remove Reposts</Link></li>
              <li><Link href="/blog/bulk-delete-instagram-reposts" className="text-white/50 hover:text-white text-sm transition-colors">Bulk Delete Guide</Link></li>
              <li><Link href="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} ClearIns. "Instagram" is a trademark of Meta Platforms, Inc. ClearIns is independent and not affiliated with Instagram or Meta.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
