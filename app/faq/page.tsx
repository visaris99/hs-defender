"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/faqData";
import { useModal } from "@/contexts/ModalContext";
import { trackCTAClick } from "@/lib/gtm";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageLayout from "@/components/layout/PageLayout";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openConsultation } = useModal();

  const handleCTAClick = () => {
    trackCTAClick("faq_cta");
    openConsultation();
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageLayout>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Breadcrumb
              items={[
                { name: "홈", href: "/" },
                { name: "자주 묻는 질문" },
              ]}
            />

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              자주 묻는 <span className="gradient-text">질문</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              해외선물 손실복구 서비스에 대해 궁금한 점을 확인해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-20 md:pb-32 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-slate-100 font-medium text-base md:text-lg pr-4">
                  {item.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
              더 궁금한 점이 있으신가요?
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              전담 상담사가 고객님의 궁금증을 직접 해결해드립니다.
            </p>
            <button
              onClick={handleCTAClick}
              className="breathing-btn bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300"
            >
              무료 상담 신청하기
            </button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
