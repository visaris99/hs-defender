"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { uspData } from "@/data/mockData";
import { useModal } from "@/contexts/ModalContext";
import { trackCTAClick } from "@/lib/gtm";
import { iconMap } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openConsultation } = useModal();

  const handleCTAClick = () => {
    trackCTAClick("about_cta");
    openConsultation();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-slate-300">디펜더 소개</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              왜 <span className="gradient-text">디펜더</span>인가요?
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              고객님의 안전한 손실 복구를 위해 최적의 조건을 제공합니다.
              <br className="hidden md:block" />
              디펜더만의 차별화된 서비스를 확인해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* USP Cards Section - Full Width */}
      <section className="py-20 md:py-32 px-4 bg-[#0A192F]/80">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          >
            {uspData.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-3xl p-10 md:p-12 hover:bg-white/[0.08] transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-10 h-10" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <span className="text-amber-500 text-sm font-display font-semibold tracking-wider">
                        {item.keyword}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold mt-2 mb-4 text-slate-100">{item.title}</h3>
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
              <span className="gradient-text">복구 작업</span> 진행 과정
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              간단한 3단계로 손실 복구를 시작하실 수 있습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { step: "01", title: "상담 신청", desc: "간단한 정보 입력 후 전담 상담사와 상담을 진행합니다." },
              { step: "02", title: "계좌 분석", desc: "전문가가 고객님의 계좌 상황을 분석하고 복구 전략을 수립합니다." },
              { step: "03", title: "복구 작업", desc: "100% 회사 부담으로 안전하게 복구 작업을 진행합니다." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                  <span className="text-amber-500 font-display font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#0A192F] to-[#112240]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
              지금 바로 <span className="gradient-text">무료 상담</span>을 받아보세요
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              전담 상담사가 고객님의 상황에 맞는 최적의 솔루션을 안내해드립니다.
            </p>
            <button
              onClick={handleCTAClick}
              className="breathing-btn bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300"
            >
              복구 작업 신청하기
            </button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
