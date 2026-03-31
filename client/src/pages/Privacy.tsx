/*
 * ClearIns — Privacy Policy Page
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D14" }}>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1
              className="text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm mb-10">Last updated: March 31, 2026</p>

            <div className="space-y-8 text-white/60 leading-relaxed text-sm">
              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>1. Overview</h2>
                <p>ClearIns ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how the ClearIns Chrome extension and website (cleartins.app) handle your information.</p>
                <p className="mt-3">The short version: <strong className="text-white">ClearIns collects no personal data.</strong> The extension runs entirely in your browser and never transmits any information about you or your Instagram account to our servers.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>2. Information We Do Not Collect</h2>
                <p>ClearIns does not collect, store, or transmit:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Your Instagram username or password</li>
                  <li>Your Instagram account data or profile information</li>
                  <li>The content of posts you repost or remove</li>
                  <li>Your browsing history</li>
                  <li>Any personally identifiable information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>3. How the Extension Works</h2>
                <p>ClearIns operates entirely within your local browser session. When you use the extension on instagram.com:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>It interacts only with the Instagram web page already open in your browser</li>
                  <li>All actions are performed locally — no data is sent to ClearIns servers</li>
                  <li>Your Instagram session credentials remain with Instagram's own systems</li>
                  <li>The extension never requests your Instagram login credentials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>4. Website Analytics</h2>
                <p>The ClearIns website (cleartins.app) may use privacy-respecting analytics to understand aggregate traffic patterns. This data is anonymized and does not identify individual users.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>5. Third-Party Services</h2>
                <p>ClearIns is an independent tool and is not affiliated with Instagram or Meta Platforms, Inc. Your use of Instagram is subject to Instagram's own Terms of Use and Privacy Policy.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>6. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify users of significant changes by updating the "Last updated" date at the top of this page.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>7. Contact</h2>
                <p>If you have questions about this Privacy Policy, please contact us through the ClearIns website at cleartins.app.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
