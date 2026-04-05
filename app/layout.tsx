import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
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
    "해외선물 손실, 더 이상 고객님 돈으로 막지 마세요. 담보금 100% 회사 부담, 1:1 전담 케어로 안전하게 손실을 복구해드립니다. 업계 최고 수수료, 손실 없이도 작업 가능.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "손실복구 서비스는 어떻게 진행되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "상담 신청 후 전담 상담사가 고객님의 계좌 상황을 분석합니다. 이후 담보금 100%를 회사에서 부담하며, 전담 작업자가 상담부터 집행까지 1:1로 케어합니다. 고객님은 리스크 없이 손실 복구를 진행하실 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "손실이 없어도 신청 가능한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 손실이 없는 경우에도 작업이 가능합니다. 수익 극대화를 원하시는 분들도 서비스를 이용하고 계십니다. 자세한 내용은 상담을 통해 안내받으실 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "수수료는 어떻게 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "업계 최고 수준의 수수료를 제공해드립니다. 복구 작업 결과에 따른 성과 기반 수수료 구조로 운영되며, 정확한 수수료율은 상담을 통해 개별 안내해드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "담보금은 정말 100% 회사에서 부담하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 복구 작업에 필요한 담보금은 전액 회사에서 부담합니다. 고객님은 별도의 자금 투입 없이 손실 복구를 진행하실 수 있으며, 이는 디펜더의 핵심 차별점입니다.",
      },
    },
    {
      "@type": "Question",
      name: "복구 작업 기간은 얼마나 걸리나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "복구 작업 시작 후 6시간에서 2일 이내에 1차 결과를 안내드립니다. 전체 복구 기간은 손실 규모와 시장 상황에 따라 1주일에서 1개월 정도 소요되며, 평균 복구 기간은 약 7일입니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 종목이 복구 작업 대상인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "나스닥, 크루드오일, 골드, 항셍지수 등 주요 해외선물 종목이 모두 복구 작업 대상입니다. 종목에 따라 최적의 전략을 수립하여 진행합니다.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
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

        <ModalProvider>
          {children}
          <ConsultationModal />
        </ModalProvider>
      </body>
    </html>
  );
}
