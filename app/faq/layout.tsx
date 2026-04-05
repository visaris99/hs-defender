import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | FAQ",
  description:
    "해외선물 손실복구 서비스에 대한 자주 묻는 질문과 답변을 확인하세요. 담보금, 수수료, 복구 기간, 대상 종목 등 궁금한 점을 해결해드립니다.",
  openGraph: {
    title: "자주 묻는 질문 | 해외선물 손실복구 디펜더",
    description:
      "손실복구 서비스에 대한 모든 궁금증을 해결해드립니다. 담보금 100% 회사 부담, 전담 케어 등 자세한 안내.",
    url: "/faq",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "해외선물 손실복구 디펜더 - FAQ",
      },
    ],
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
