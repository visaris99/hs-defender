"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { successCasesMock } from "@/data/mockData";
import { trackSuccessCaseView } from "@/lib/gtm";
import { useModal } from "@/contexts/ModalContext";
import CaseDetailModal from "@/components/common/CaseDetailModal";
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
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
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
      <CaseDetailModal
        selectedCase={selectedCase}
        onClose={() => setSelectedCase(null)}
        onConsult={() => {
          setSelectedCase(null);
          openConsultation();
        }}
      />
    </section>
  );
}
