import { useEffect } from "react";
import PortfolioSection from "@/components/PortfolioSection";
import MobileViewSection from "@/components/MobileViewSection";
import { LanguageProvider } from "@/i18n/LanguageContext";
import PageTransition from "@/components/PageTransition";

const META_PIXEL_ID = "1942990739694038";

const HiddenPortfolio = () => {
  useEffect(() => {
    if (typeof (window as any).fbq === "undefined") {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
        fbq('track', 'ViewContent', { content_name: 'Hidden Portfolio' });
      `;
      document.head.appendChild(script);
    } else {
      (window as any).fbq("track", "PageView");
      (window as any).fbq("track", "ViewContent", { content_name: "Hidden Portfolio" });
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="border-none">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <PageTransition>
          <div className="pt-20 border-none">
            <PortfolioSection />
            <MobileViewSection />
          </div>
        </PageTransition>
      </div>
    </LanguageProvider>
  );
};

export default HiddenPortfolio;
