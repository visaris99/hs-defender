"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { successCasesMock } from "@/data/mockData";
import { trackSuccessCaseView } from "@/lib/gtm";
import { useModal } from "@/contexts/ModalContext";
import { CloseIcon } from "@/components/icons";
import type { SuccessCase } from "@/types";

export default function SuccessCases() {
  const [selectedCase, setSelectedCase] = useState<SuccessCase | null>(null);
  const { openConsultation } = useModal();

  const handleCaseClick = (caseItem: SuccessCase) => {
    setSelectedCase(caseItem);
    trackSuccessCaseView(caseItem.id, caseItem.title);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const profitRate = (deposit: number, profit: number) => {
    return Math.round((profit / deposit) * 100);
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-[#0A192F]/80" id="cases">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            실제 <span className="gradient-text">복구 사례</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            디펜더와 함께 복구 작업을 완료한 고객님들의 실제 사례입니다.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {successCasesMock.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCaseClick(caseItem)}
              className="cursor-pointer group"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300">
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
                    <p className="gold-highlight font-display text-lg font-bold">
                      +{formatAmount(caseItem.profit * 10000)}원
                    </p>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {caseItem.deposit}만 → {formatAmount(caseItem.withdrawal)}만 · {caseItem.period}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-slate-100 text-sm font-medium bg-black/30 px-4 py-2 rounded-lg">자세히 보기</span>
                  </div>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-100 truncate">{caseItem.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          카드를 클릭하면 상세 내용을 확인할 수 있습니다.
        </motion.p>
      </div>

      {/* Modal */}
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
    </section>
  );
}
