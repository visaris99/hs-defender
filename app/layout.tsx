import type { Metadata } from "next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { ModalProvider } from "@/contexts/ModalContext";
import ConsultationModal from "@/components/common/ConsultationModal";
import "./globals.css";

// GTM ID - 환경 변수에서 가져오기 (없으면 빈 문자열)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "해외선물 손실복구 디펜더 | 100% 회사 부담, 고객 리스크 ZERO",
    template: "%s | 해외선물 손실복구 디펜더",
  },
  description:
    "해외선물 손실복구 전문. 담보금 100% 회사 부담, 1:1 전담 케어로 안전하게 복구해드립니다.",
  keywords: [
    "해외선물",
    "손실복구",
    "해외선물 손실",
    "선물 손실복구",
    "해외선물 복구",
    "선물투자",
    "투자손실",
    "손실복구 서비스",
  ],
  authors: [{ name: "해외선물 손실복구 디펜더" }],
  creator: "해외선물 손실복구 디펜더",
  publisher: "해외선물 손실복구 디펜더",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "해외선물 손실복구 디펜더",
    title: "해외선물 손실복구 디펜더 | 100% 회사 부담, 고객 리스크 ZERO",
    description:
      "해외선물 손실, 더 이상 고객님 돈으로 막지 마세요. 담보금 100% 회사 부담으로 안전하게 손실을 복구해드립니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "해외선물 손실복구 디펜더",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "해외선물 손실복구 디펜더",
    description: "담보금 100% 회사 부담, 1:1 전담 케어로 안전하게 손실을 복구해드립니다.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "D10_24NxJYCBFAWHfoO4zCjQaJlpimHLxS78l31kOpU",
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "da74505721c23e795fcf99287a70885d84d7617d",
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "해외선물 손실복구 디펜더",
  description: "해외선물 손실 복구 전문 서비스",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Korean",
  },
};

// FAQPage 스키마는 /faq 페이지 전용으로 이동 (중복 방지)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="해외선물 손실복구 디펜더"
          href="/rss.xml"
        />

        {/* Preconnect — 외부 리소스 연결 시간 단축 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Fonts */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to Content — 키보드/스크린 리더 접근성 */}
        <a href="#main-content" className="skip-to-content">
          본문으로 바로가기
        </a>

        {/* Google Tag Manager */}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}

        {/* Google Analytics 4 */}
        <GoogleAnalytics gaId="G-MHC85LP84T" />

        <ModalProvider>
          {children}
          <ConsultationModal />
        </ModalProvider>
      </body>
    </html>
  );
}
