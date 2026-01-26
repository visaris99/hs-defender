"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  {
    href: "/about",
    title: "디펜더 소개",
    description: "왜 디펜더인지, 서비스 강점을 확인하세요",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/cases",
    title: "복구 사례",
    description: "실제 복구 작업 완료 사례를 확인하세요",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function QuickLinks() {
  return (
    <section className="py-20 md:py-32 px-4 bg-[#0A192F]/80">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            더 알아보기
          </h2>
          <p className="text-slate-400 leading-relaxed">
            디펜더의 서비스와 성공 사례를 자세히 확인해보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={link.href} className="block group">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-3xl p-8 md:p-10 hover:bg-white/[0.08] hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-amber-400 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
