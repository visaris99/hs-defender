"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CloseIcon } from "@/components/icons";
import type { SuccessCase } from "@/types";

interface CaseDetailModalProps {
  selectedCase: SuccessCase | null;
  onClose: () => void;
  onConsult: () => void;
}

export default function CaseDetailModal({
  selectedCase,
  onClose,
  onConsult,
}: CaseDetailModalProps) {
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("ko-KR").format(amount);

  return (
    <AnimatePresence>
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-modal-title"
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
                  <h3 id="case-modal-title" className="text-xl font-semibold mt-1 text-slate-100">
                    {selectedCase.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="모달 닫기"
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
                    +{Math.round((selectedCase.profit / selectedCase.deposit) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
                <span>
                  수익{" "}
                  <strong className="text-slate-100">
                    {formatAmount(selectedCase.profit)}만원
                  </strong>
                </span>
                <span>·</span>
                <span>
                  소요 기간{" "}
                  <strong className="text-slate-100">
                    {selectedCase.period}
                  </strong>
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-6">
                {selectedCase.description}
              </p>

              {/* 인증 이미지 */}
              <div className="space-y-3">
                <p className="text-slate-500 text-sm">인증 자료</p>
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
                  <Image
                    src={selectedCase.image}
                    alt={`${selectedCase.title} 인증`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 512px) 100vw, 512px"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10">
              <button
                onClick={onConsult}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                나도 복구 작업 신청하기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
