/*
 * ClearIns — Terms of Service Page
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
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
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm mb-10">Last updated: March 31, 2026</p>

            <div className="space-y-8 text-white/60 leading-relaxed text-sm">
              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>1. Acceptance of Terms</h2>
                <p>By installing or using the ClearIns Chrome extension or visiting cleartins.app, you agree to these Terms of Service. If you do not agree, please do not use ClearIns.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>2. Description of Service</h2>
                <p>ClearIns provides a browser extension and related tools that automate the removal of reposted content from Instagram profiles. ClearIns is an independent tool and is not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>3. Permitted Use</h2>
                <p>You may use ClearIns to manage your own Instagram account's reposted content. You agree not to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Use ClearIns to manage accounts you do not own or have authorization to manage</li>
                  <li>Attempt to circumvent Instagram's terms of service in ways beyond normal repost management</li>
                  <li>Reverse engineer, modify, or distribute the ClearIns extension without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>4. Disclaimer of Warranties</h2>
                <p>ClearIns is provided "as is" without warranties of any kind. We do not guarantee that the extension will work continuously without interruption, as Instagram may change its platform at any time. We are not responsible for any changes Instagram makes that affect ClearIns functionality.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>5. Limitation of Liability</h2>
                <p>ClearIns and its creators are not liable for any damages arising from your use of the extension, including but not limited to account restrictions imposed by Instagram. Use ClearIns at your own discretion.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>6. Instagram Trademark Notice</h2>
                <p>"Instagram" is a trademark of Meta Platforms, Inc. ClearIns is an independent tool and is not affiliated with or endorsed by Instagram or Meta Platforms, Inc.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>7. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Continued use of ClearIns after changes constitutes acceptance of the updated Terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>8. Contact</h2>
                <p>For questions about these Terms, please contact us through cleartins.app.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
