"use client";

import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/gtm";

export default function Hero() {
  const handleCTAClick = () => {
    trackCTAClick("hero_cta");
    // 상담 신청 섹션으로 스크롤
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Animated Background - Graph Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute w-full h-full opacity-10"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Animated graph lines */}
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0 ${400 + i * 50} Q300 ${350 + i * 30} 600 ${400 + i * 40} T1200 ${380 + i * 35}`}
              stroke="url(#goldGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 3,
                delay: 1 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-slate-400 text-sm md:text-base mb-4 tracking-widest uppercase"
        >
          해외선물 손실복구 전문
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          해외선물 손실,
          <br />
          <span className="gradient-text">더 이상 고객님 돈으로</span>
          <br />
          막지 마세요.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-slate-300 text-base md:text-lg mb-10 max-w-2xl mx-auto"
        >
          담보금 <span className="text-gold-500 font-semibold">100% 회사 부담</span>,
          전담 작업자의 <span className="text-gold-500 font-semibold">1:1 케어</span>로
          <br className="hidden md:block" />
          안전하게 손실을 복구해드립니다.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <button
            onClick={handleCTAClick}
            className="breathing-btn bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-lg px-10 py-4 rounded-full hover:from-gold-400 hover:to-gold-300 transition-all duration-300"
          >
            내 계좌 진단받기
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-12 flex items-center justify-center gap-6 text-slate-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>리스크 ZERO</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>1:1 전담 케어</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>업계 최고 조건</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
