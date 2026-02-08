import Hero from "@/components/sections/Hero";
import USP from "@/components/sections/USP";
import SuccessCases from "@/components/sections/SuccessCases";
import QuickLinks from "@/components/sections/QuickLinks";
import PageLayout from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <Hero />

      {/* USP Section - 왜 디펜더인가? */}
      <USP />

      {/* Success Cases Section - 실제 복구 사례 */}
      <SuccessCases />

      {/* Quick Links to other pages */}
      <QuickLinks />
    </PageLayout>
  );
}
