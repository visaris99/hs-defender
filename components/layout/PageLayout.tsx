"use client";

import { ReactNode } from "react";
import SocialProof from "@/components/sections/SocialProof";
import Footer from "@/components/sections/Footer";
import StickyCTA from "@/components/common/StickyCTA";
import ScrollToTop from "@/components/common/ScrollToTop";

interface PageLayoutProps {
  children: ReactNode;
  showSocialProof?: boolean;
  showStickyCTA?: boolean;
  showFooter?: boolean;
}

export default function PageLayout({
  children,
  showSocialProof = true,
  showStickyCTA = true,
  showFooter = true,
}: PageLayoutProps) {
  return (
    <main className="relative">
      {/* Scroll to top on page load */}
      <ScrollToTop />

      {/* Social Proof Ticker - Fixed at top */}
      {showSocialProof && <SocialProof />}

      {/* Main Content */}
      <div className={showSocialProof ? "pt-14" : ""}>
        {children}

        {/* Footer */}
        {showFooter && (
          <div className={showStickyCTA ? "pb-24" : ""}>
            <Footer />
          </div>
        )}
      </div>

      {/* Sticky CTA - Fixed at bottom */}
      {showStickyCTA && <StickyCTA />}
    </main>
  );
}
