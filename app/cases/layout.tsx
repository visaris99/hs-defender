import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "실제 복구 사례 | 고객 성공 스토리",
  description:
    "200만원으로 2,200만원 출금, 300만원으로 1,410만원 달성. 디펜더와 함께한 실제 해외선물 손실복구 사례를 확인하세요.",
  openGraph: {
    title: "실제 복구 사례 | 해외선물 손실복구 디펜더",
    description:
      "누적 복구 금액 150억원 이상. 디펜더 고객님들의 실제 복구 성공 사례를 확인하세요.",
    url: "/cases",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "해외선물 손실복구 디펜더 - 복구 사례",
      },
    ],
  },
  alternates: {
    canonical: "/cases",
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
