import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import PageTransition from "@/components/PageTransition";

const PrivacyPolicy = () => {
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <PageTransition>
          <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy – Solyn Global Ltd</h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Solyn Global Ltd operates an internal content and publishing platform ("Solyn Growth Engine") used for business automation and content distribution.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">We may process:</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>LinkedIn profile data</li>
                  <li>Company page data</li>
                  <li>OAuth authentication tokens</li>
                  <li>Post content generated through our platform</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">This data is used solely for:</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Publishing content</li>
                  <li>Managing business communication</li>
                  <li>Internal growth analytics</li>
                </ul>
              </div>

              <p>We do not sell or share user data with third parties.</p>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
                <p>
                  If you have any questions, contact:{" "}
                  <a href="mailto:jason@solynglobal.be" className="text-primary underline">
                    jason@solynglobal.be
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

export default PrivacyPolicy;
