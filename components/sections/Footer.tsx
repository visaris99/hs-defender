"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold gradient-text mb-2">
              해외선물 손실복구 디펜더
            </h3>
            <p className="text-slate-500 text-sm">
              신뢰할 수 있는 손실 복구 파트너
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a
              href="#usp"
              className="text-slate-400 hover:text-white transition-colors"
            >
              서비스 강점
            </a>
            <a
              href="#cases"
              className="text-slate-400 hover:text-white transition-colors"
            >
              복구 사례
            </a>
            <a
              href="#consultation"
              className="text-slate-400 hover:text-white transition-colors"
            >
              상담 신청
            </a>
            <a
              href="http://pf.kakao.com/_kJDgG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              카카오톡 상담
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 pt-8">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
              <button className="text-slate-500 hover:text-slate-400 transition-colors">
                이용약관
              </button>
              <span className="text-slate-700">|</span>
              <button className="text-slate-500 hover:text-slate-400 transition-colors">
                개인정보처리방침
              </button>
            </div>

            {/* Copyright */}
            <p className="text-center text-slate-600 text-xs">
              &copy; {currentYear} 해외선물 손실복구 디펜더. All rights reserved.
            </p>

            {/* Disclaimer */}
            <p className="text-center text-slate-700 text-xs mt-4 max-w-2xl mx-auto leading-relaxed">
              본 서비스는 투자 권유가 아니며, 모든 투자의 책임은 투자자 본인에게 있습니다.
              <br />
              상담 내용은 참고 목적으로만 활용해 주시기 바랍니다.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
