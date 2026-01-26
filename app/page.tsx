import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Footer from "@/components/sections/Footer";
import StickyCTA from "@/components/common/StickyCTA";
import ScrollToTop from "@/components/common/ScrollToTop";
import QuickLinks from "@/components/sections/QuickLinks";

export default function Home() {
  return (
    <main className="relative">
      {/* Scroll to top on page load */}
      <ScrollToTop />

      {/* Social Proof Ticker - Fixed at top */}
      <SocialProof />

      {/* Hero Section */}
      <div className="pt-14"> {/* Padding for fixed ticker */}
        <Hero />
      </div>

      {/* Quick Links to other pages */}
      <QuickLinks />

      {/* Footer */}
      <div className="pb-24"> {/* Padding for sticky CTA */}
        <Footer />
      </div>

      {/* Sticky CTA - Fixed at bottom */}
      <StickyCTA />
    </main>
  );
}
