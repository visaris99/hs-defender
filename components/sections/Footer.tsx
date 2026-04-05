"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useModal } from "@/contexts/ModalContext";
import { externalLinks } from "@/data/mockData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openConsultation } = useModal();

  return (
    <footer className="py-16 md:py-20 px-4 border-t border-white/10 bg-[#0A192F]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo / Brand */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/image/defender_logo_leftright.png"
                alt="해외선물 손실복구 디펜더"
                width={220}
                height={48}
                className="mx-auto mb-3"
                priority={false}
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              신뢰할 수 있는 손실 복구 파트너
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="푸터 네비게이션" className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 text-sm">
            <Link
              href="/about"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              디펜더 소개
            </Link>
            <Link
              href="/cases"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              복구 사례
            </Link>
            <Link
              href="/blog"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              블로그
            </Link>
            <Link
              href="/faq"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              FAQ
            </Link>
            <button
              onClick={openConsultation}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              상담 신청
            </button>
            <a
              href={externalLinks.kakaoChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              카카오톡 상담
            </a>
          </nav>

          {/* Divider */}
          <div className="border-t border-white/10 pt-10">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
              <button className="text-slate-500 hover:text-slate-300 transition-colors">
                이용약관
              </button>
              <span className="text-slate-600">|</span>
              <button className="text-slate-500 hover:text-slate-300 transition-colors">
                개인정보처리방침
              </button>
            </div>

            {/* Copyright */}
            <p className="text-center text-slate-500 text-xs">
              &copy; {currentYear} 해외선물 손실복구 디펜더. All rights reserved.
            </p>

            {/* Disclaimer */}
            <p className="text-center text-slate-600 text-xs mt-4 max-w-2xl mx-auto leading-relaxed">
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
