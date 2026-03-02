import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import PageTransition from "@/components/PageTransition";

const TermsOfService = () => {
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <PageTransition>
          <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service – Solyn Global Ltd</h1>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Welcome to the website of Solyn Global Ltd ("Solyn", "we", "us", or "our"). By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Services</h2>
                <p>
                  Solyn Global Ltd provides web design, development, branding, and digital growth services. The specific scope, deliverables, and timelines for each project are agreed upon separately with each client.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of Website</h2>
                <p>
                  You may use this website for lawful purposes only. You agree not to misuse the website, attempt to gain unauthorised access to any systems, or use automated tools to scrape or collect data without our prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Intellectual Property</h2>
                <p>
                  All content on this website — including text, graphics, logos, images, and software — is the property of Solyn Global Ltd or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
                <p className="mt-2">
                  Upon full payment for project work, clients receive a licence to use the deliverables as agreed in the project scope. Solyn retains the right to showcase completed work in its portfolio unless otherwise agreed.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Payment & Fees</h2>
                <p>
                  Fees for our services are outlined in individual proposals or agreements. Invoices are due within the timeframe specified. Late payments may incur additional charges. We reserve the right to suspend services for overdue accounts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Solyn Global Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability shall not exceed the fees paid by you for the specific service giving rise to the claim.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Warranties</h2>
                <p>
                  Our website and services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee uninterrupted or error-free operation of our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Termination</h2>
                <p>
                  Either party may terminate a service agreement with written notice as specified in the relevant project agreement. We reserve the right to suspend or terminate access to our website at any time without prior notice for violations of these terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Governing Law</h2>
                <p>
                  These Terms of Service are governed by the laws of the United Kingdom. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to These Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. Changes will be posted on this page with a revised date. Continued use of our website after changes constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
                <p>
                  If you have any questions about these terms, contact us at:{" "}
                  <a href="mailto:info@solyn-global.com" className="text-primary underline">
                    info@solyn-global.com
                  </a>
                </p>
              </div>

              <p className="text-sm text-muted-foreground/60">Last updated: March 2, 2026</p>
            </div>
          </div>
        </PageTransition>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default TermsOfService;
