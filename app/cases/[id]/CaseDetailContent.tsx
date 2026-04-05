"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/contexts/ModalContext";
import { trackCTAClick } from "@/lib/gtm";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageLayout from "@/components/layout/PageLayout";
import type { SuccessCase } from "@/types";

interface CaseDetailContentProps {
  caseData: SuccessCase;
  relatedCases: SuccessCase[];
}

export default function CaseDetailContent({
  caseData,
  relatedCases,
}: CaseDetailContentProps) {
  const { openConsultation } = useModal();

  const handleCTAClick = () => {
    trackCTAClick("case_detail_cta");
    openConsultation();
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("ko-KR").format(amount);

  const profitRate = Math.round(
    (caseData.profit / caseData.deposit) * 100
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseData.title,
    description: caseData.description,
    image: caseData.image,
    datePublished: caseData.createdAt,
    author: {
      "@type": "Organization",
      name: "해외선물 손실복구 디펜더",
    },
  };

  return (
    <PageLayout>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Detail Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Breadcrumb
              items={[
                { name: "홈", href: "/" },
                { name: "복구 사례", href: "/cases" },
                { name: caseData.title },
              ]}
            />

            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-amber-500 text-sm font-display font-semibold tracking-wider">
                복구 작업 완료
              </span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mt-3 mb-4">
                {caseData.title}
              </h1>
              <p className="text-slate-400">작업 기간: {caseData.period}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 md:p-8 text-center">
                <p className="text-slate-400 text-xs md:text-sm mb-2">입금액</p>
                <p className="text-slate-100 font-display font-bold text-xl md:text-3xl">
                  {caseData.deposit}
                  <span className="text-base md:text-lg ml-1">만</span>
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 md:p-8 text-center">
                <p className="text-slate-400 text-xs md:text-sm mb-2">출금액</p>
                <p className="gold-highlight font-display font-bold text-xl md:text-3xl">
                  {formatAmount(caseData.withdrawal)}
                  <span className="text-base md:text-lg ml-1">만</span>
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 md:p-8 text-center">
                <p className="text-slate-400 text-xs md:text-sm mb-2">수익률</p>
                <p className="text-emerald-400 font-display font-bold text-xl md:text-3xl">
                  +{profitRate}%
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 mb-12">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                복구 과정
              </h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                {caseData.description}
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10 text-sm text-slate-400">
                <span>
                  수익금{" "}
                  <strong className="text-slate-100">
                    {formatAmount(caseData.profit)}만원
                  </strong>
                </span>
                <span>·</span>
                <span>
                  소요 기간{" "}
                  <strong className="text-slate-100">{caseData.period}</strong>
                </span>
              </div>
            </div>

            {/* 인증 이미지 */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                인증 자료
              </h2>
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={caseData.image}
                  alt={`${caseData.title} 인증 자료`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 448px) 100vw, 448px"
                  priority
                />
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={handleCTAClick}
                className="breathing-btn bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300"
              >
                나도 복구 작업 신청하기
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-20 md:py-32 px-4 bg-[#0A192F]/80">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
                다른 <span className="gradient-text">복구 사례</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {relatedCases.map((relCase, index) => {
                const relProfitRate = Math.round(
                  (relCase.profit / relCase.deposit) * 100
                );
                return (
                  <motion.div
                    key={relCase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/cases/${relCase.id}`}
                      className="block group"
                    >
                      <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <Image
                            src={relCase.image}
                            alt={relCase.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-3 right-3 bg-amber-500/90 text-black text-xs font-bold px-2 py-1 rounded-lg">
                            +{relProfitRate}%
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="gold-highlight font-display text-lg font-bold">
                              +{formatAmount(relCase.profit * 10000)}원
                            </p>
                            <p className="text-slate-300 text-xs mt-0.5">
                              {relCase.deposit}만 →{" "}
                              {formatAmount(relCase.withdrawal)}만 ·{" "}
                              {relCase.period}
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-slate-100 truncate">
                            {relCase.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
