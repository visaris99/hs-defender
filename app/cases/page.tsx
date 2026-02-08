"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { successCasesMock } from "@/data/mockData";
import { trackSuccessCaseView, trackCTAClick } from "@/lib/gtm";
import { useModal } from "@/contexts/ModalContext";
import { CloseIcon } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";
import type { SuccessCase } from "@/types";

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<SuccessCase | null>(null);
  const { openConsultation } = useModal();

  const handleCaseClick = (caseItem: SuccessCase) => {
    setSelectedCase(caseItem);
    trackSuccessCaseView(caseItem.id, caseItem.title);
  };

  const handleCTAClick = () => {
    trackCTAClick("cases_cta");
    openConsultation();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const profitRate = (deposit: number, profit: number) => {
    return Math.round((profit / deposit) * 100);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-slate-300">복구 사례</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              실제 <span className="gradient-text">복구 사례</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              디펜더와 함께 복구 작업을 완료한 고객님들의 실제 사례입니다.
              <br className="hidden md:block" />
              카드를 클릭하면 상세 내용을 확인할 수 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid - Full Width */}
      <section className="py-20 md:py-32 px-4 bg-[#0A192F]/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {successCasesMock.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => handleCaseClick(caseItem)}
                className="cursor-pointer group"
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:border-amber-500/30 hover:shadow-amber-500/10 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={caseItem.image}
                      alt={caseItem.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Profit badge */}
                    <div className="absolute top-3 right-3 bg-amber-500/90 text-black text-xs font-bold px-2 py-1 rounded-lg">
                      +{profitRate(caseItem.deposit, caseItem.profit)}%
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="gold-highlight font-display text-lg md:text-xl font-bold">
                        +{formatAmount(caseItem.profit * 10000)}원
                      </p>
                      <p className="text-slate-300 text-xs md:text-sm mt-0.5">
                        {caseItem.deposit}만 → {formatAmount(caseItem.withdrawal)}만 · {caseItem.period}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-slate-100 text-sm font-medium bg-black/30 px-4 py-2 rounded-lg">자세히 보기</span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="p-4 md:p-5">
                    <h3 className="text-sm md:text-base font-medium text-slate-100 truncate">{caseItem.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
              <span className="gradient-text">누적 복구</span> 실적
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "누적 복구 금액", value: "150억+", suffix: "원" },
              { label: "복구 작업 완료 수", value: "2,500+", suffix: "건" },
              { label: "평균 복구 기간", value: "7", suffix: "일" },
              { label: "고객 만족도", value: "98", suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 text-center"
              >
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-extrabold">
                  <span className="gradient-text">{stat.value}</span>
                  <span className="text-slate-300 text-lg ml-1">{stat.suffix}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#0A192F] to-[#112240]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
              다음 성공 사례의 <span className="gradient-text">주인공</span>이 되세요
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              지금 바로 무료 상담을 받아보시고, 손실 복구를 시작하세요.
            </p>
            <button
              onClick={handleCTAClick}
              className="breathing-btn bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300"
            >
              복구 작업 신청하기
            </button>
          </motion.div>
        </div>
      </section>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCase(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A192F] border border-white/10 shadow-2xl rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-amber-500 text-sm font-display font-semibold">
                      복구 작업 완료
                    </span>
                    <h3 className="text-xl font-semibold mt-1 text-slate-100">{selectedCase.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-slate-400 hover:text-slate-100 transition-colors p-1"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#112240] rounded-2xl p-4 text-center">
                    <p className="text-slate-400 text-xs mb-1">입금액</p>
                    <p className="text-slate-100 font-display font-semibold text-lg">
                      {selectedCase.deposit}만
                    </p>
                  </div>
                  <div className="bg-[#112240] rounded-2xl p-4 text-center">
                    <p className="text-slate-400 text-xs mb-1">출금액</p>
                    <p className="gold-highlight font-display text-lg">
                      {formatAmount(selectedCase.withdrawal)}만
                    </p>
                  </div>
                  <div className="bg-[#112240] rounded-2xl p-4 text-center">
                    <p className="text-slate-400 text-xs mb-1">수익률</p>
                    <p className="text-emerald-400 font-display font-semibold text-lg">
                      +{profitRate(selectedCase.deposit, selectedCase.profit)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
                  <span>수익 <strong className="text-slate-100">{formatAmount(selectedCase.profit)}만원</strong></span>
                  <span>·</span>
                  <span>소요 기간 <strong className="text-slate-100">{selectedCase.period}</strong></span>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-6">
                  {selectedCase.description}
                </p>

                {/* 인증 이미지 */}
                <div className="space-y-3">
                  <p className="text-slate-500 text-sm">인증 자료</p>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={selectedCase.image}
                      alt={`${selectedCase.title} 인증`}
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedCase(null);
                    openConsultation();
                  }}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                >
                  나도 복구 작업 신청하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
