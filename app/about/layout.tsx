import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "디펜더 소개 | 왜 디펜더인가요?",
  description:
    "담보금 100% 회사 부담, 1:1 전담 케어, 업계 최고 수수료. 디펜더만의 차별화된 해외선물 손실복구 서비스를 확인하세요.",
  openGraph: {
    title: "디펜더 소개 | 해외선물 손실복구 디펜더",
    description:
      "고객 부담 0원, 전담 작업자의 1:1 케어로 안전하게 손실을 복구해드립니다.",
    url: "/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "해외선물 손실복구 디펜더 - 서비스 소개",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
