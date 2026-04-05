"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

// 비-크리티컬 컴포넌트 동적 임포트 — 초기 번들 사이즈 절감
const SocialProof = dynamic(
  () => import("@/components/sections/SocialProof"),
  { ssr: true }
);
const StickyCTA = dynamic(() => import("@/components/common/StickyCTA"), {
  ssr: false,
});

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
    <main id="main-content" className="relative">
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
