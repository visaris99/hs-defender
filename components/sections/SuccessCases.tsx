"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { successCasesMock } from "@/data/mockData";
import { trackSuccessCaseView } from "@/lib/gtm";
import { SuccessCase } from "@/lib/firebase";

export default function SuccessCases() {
  const [selectedCase, setSelectedCase] = useState<SuccessCase | null>(null);

  const handleCaseClick = (caseItem: SuccessCase) => {
    setSelectedCase(caseItem);
    trackSuccessCaseView(caseItem.id, caseItem.title);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
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
                {/* Thumbnail placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-br from-[#112240] to-[#0A192F] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="gold-highlight font-display text-lg">
                        {formatAmount(caseItem.amount)}원
                      </p>
                      <p className="text-slate-400 text-xs mt-1">
                        {caseItem.period} 소요
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-slate-100 text-sm font-medium">자세히 보기</span>
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
              className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0A192F]/50 rounded-2xl p-4 text-center">
                    <p className="text-slate-400 text-sm mb-1">복구 금액</p>
                    <p className="gold-highlight font-display text-xl">
                      {formatAmount(selectedCase.amount)}원
                    </p>
                  </div>
                  <div className="bg-[#0A192F]/50 rounded-2xl p-4 text-center">
                    <p className="text-slate-400 text-sm mb-1">소요 기간</p>
                    <p className="text-slate-100 font-display font-semibold text-xl">
                      {selectedCase.period}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-6">
                  {selectedCase.description}
                </p>

                {/* Placeholder for detail images */}
                <div className="space-y-3">
                  <p className="text-slate-500 text-sm">인증 자료</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-[#112240] rounded-xl flex items-center justify-center"
                      >
                        <div className="text-center text-slate-500">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">이미지 {i}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedCase(null);
                    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
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
