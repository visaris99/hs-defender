import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 | 해외선물 투자 가이드",
  description:
    "해외선물 손실복구 방법, 투자 전략, 종목별 분석 등 전문가 시각의 투자 가이드를 제공합니다.",
  openGraph: {
    title: "블로그 | 해외선물 손실복구 디펜더",
    description:
      "해외선물 투자에 대한 전문가 인사이트와 손실복구 가이드를 확인하세요.",
    url: "/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "해외선물 손실복구 디펜더 - 블로그",
      },
    ],
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
