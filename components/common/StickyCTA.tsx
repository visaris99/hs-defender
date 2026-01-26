"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackKakaoClick } from "@/lib/gtm";
import { externalLinks } from "@/data/mockData";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

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
          <div className="max-w-lg mx-auto">
            <div className="glass-card p-3 flex items-center gap-3">
              {/* Message */}
              <div className="flex-1 pl-2">
                <p className="text-sm font-medium">궁금한 점이 있으신가요?</p>
                <p className="text-xs text-slate-400">지금 바로 상담받아보세요</p>
              </div>

              {/* Kakao Button */}
              <button
                onClick={handleKakaoClick}
                className="flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold px-5 py-3 rounded-xl hover:bg-[#FDD835] transition-all text-sm whitespace-nowrap"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.463 2 10.692c0 2.625 1.75 4.923 4.363 6.254-.147.53-.61 2.175-.65 2.396-.05.278.102.274.215.2.088-.058 1.407-.958 2.026-1.382.671.1 1.365.15 2.046.15 5.523 0 10-3.463 10-7.618C20 6.463 15.523 3 12 3z" />
                </svg>
                카카오톡 상담
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
