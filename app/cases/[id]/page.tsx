import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { successCasesMock } from "@/data/mockData";
import CaseDetailContent from "./CaseDetailContent";

export function generateStaticParams() {
  return successCasesMock.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const caseData = successCasesMock.find((c) => c.id === id);
  if (!caseData) return {};

  const profitRate = Math.round(
    (caseData.profit / caseData.deposit) * 100
  );

  return {
    title: `${caseData.title} | 복구 사례`,
    description: `${caseData.deposit}만원 입금 → ${caseData.withdrawal}만원 출금 (수익률 +${profitRate}%). ${caseData.description.slice(0, 100)}`,
    openGraph: {
      title: `${caseData.title} | 해외선물 손실복구 디펜더`,
      description: `${caseData.deposit}만원으로 ${caseData.period} 만에 ${caseData.withdrawal}만원 출금 달성. 실제 인증 자료와 함께 확인하세요.`,
      url: `/cases/${caseData.id}`,
      images: [
        {
          url: caseData.image,
          width: 600,
          height: 800,
          alt: caseData.title,
        },
      ],
    },
    alternates: {
      canonical: `/cases/${caseData.id}`,
    },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseData = successCasesMock.find((c) => c.id === id);
  if (!caseData) notFound();

  // 관련 사례 (현재 사례 제외, 최대 3개)
  const relatedCases = successCasesMock
    .filter((c) => c.id !== id)
    .slice(0, 3);

  return <CaseDetailContent caseData={caseData} relatedCases={relatedCases} />;
}
