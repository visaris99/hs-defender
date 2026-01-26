"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackKakaoClick, trackCTAClick } from "@/lib/gtm";
import { externalLinks } from "@/data/mockData";
import { useModal } from "@/contexts/ModalContext";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const { openConsultation } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      // Hero 섹션 지나면 표시 (약 100vh)
      const shouldShow = window.scrollY > window.innerHeight * 0.5;

      // 값이 변경될 때만 setState 호출
      if (isVisibleRef.current !== shouldShow) {
        isVisibleRef.current = shouldShow;
        setIsVisible(shouldShow);
      }
    };

    // 초기 상태 체크
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKakaoClick = () => {
    trackKakaoClick();
    window.open(externalLinks.kakaoChannel, "_blank", "noopener,noreferrer");
  };

  const handleConsultationClick = () => {
    trackCTAClick("sticky_cta");
    openConsultation();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe"
        >
          <div className="max-w-xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-4 flex items-center gap-3">
              {/* Consultation Button */}
              <button
                onClick={handleConsultationClick}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold px-4 py-3 rounded-xl transition-all text-sm shadow-lg shadow-amber-500/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                복구 작업 신청
              </button>

              {/* Kakao Button */}
              <button
                onClick={handleKakaoClick}
                className="flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold px-4 py-3 rounded-xl hover:bg-[#FDD835] transition-all text-sm whitespace-nowrap shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.463 2 10.692c0 2.625 1.75 4.923 4.363 6.254-.147.53-.61 2.175-.65 2.396-.05.278.102.274.215.2.088-.058 1.407-.958 2.026-1.382.671.1 1.365.15 2.046.15 5.523 0 10-3.463 10-7.618C20 6.463 15.523 3 12 3z" />
                </svg>
                카카오톡
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
