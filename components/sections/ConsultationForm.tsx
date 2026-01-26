"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formSteps } from "@/data/mockData";
import { trackConsultationSubmit, trackFormStep } from "@/lib/gtm";
import { db, COLLECTIONS, Application } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface FormData {
  name: string;
  phone: string;
  lossAmount: string;
}

export default function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    lossAmount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState("");

  const currentStepData = formSteps[currentStep];
  const isLastStep = currentStep === formSteps.length - 1;

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentStepData.field]: value,
    }));
    setError("");
  };

  const validateStep = () => {
    const value = formData[currentStepData.field as keyof FormData];
    if (!value.trim()) {
      setError("필수 입력 항목입니다.");
      return false;
    }

    if (currentStepData.field === "phone") {
      const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
      if (!phoneRegex.test(value.replace(/-/g, ""))) {
        setError("올바른 연락처 형식을 입력해주세요.");
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    trackFormStep(currentStep + 1, currentStepData.field);

    if (isLastStep) {
      await handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Firebase에 저장 (Firebase가 설정되어 있는 경우)
      if (db) {
        const applicationData: Omit<Application, "id"> = {
          name: formData.name,
          phone: formData.phone,
          lossAmount: formData.lossAmount,
          createdAt: Timestamp.now() as unknown as Date,
          source: typeof window !== "undefined" ? window.location.href : "",
        };

        await addDoc(collection(db, COLLECTIONS.APPLICATIONS), applicationData);
      }

      // GTM 전환 이벤트 전송
      trackConsultationSubmit(formData.lossAmount);

      setIsCompleted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // Firebase 에러가 발생해도 성공 처리 (GTM 이벤트는 전송됨)
      trackConsultationSubmit(formData.lossAmount);
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError("");
    }
  };

  return (
    <section className="py-24 px-4" id="consultation">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">무료 상담</span> 신청
          </h2>
          <p className="text-slate-400">
            간단한 정보만 입력하시면 전담 상담사가 연락드립니다.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {formSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        index <= currentStep ? "bg-gold-500" : "bg-navy-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Step indicator */}
                <p className="text-gold-500 text-sm font-display font-semibold mb-2">
                  STEP {currentStep + 1} / {formSteps.length}
                </p>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-bold mb-8">
                  {currentStepData.question}
                </h3>

                {/* Input */}
                <div className="mb-6">
                  <input
                    type={currentStepData.type}
                    value={formData[currentStepData.field as keyof FormData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentStepData.placeholder}
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-navy-700 focus:border-gold-500 text-xl py-3 outline-none transition-colors placeholder:text-slate-600"
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 text-slate-400 hover:text-white transition-colors ${
                      currentStep === 0 ? "opacity-0 pointer-events-none" : ""
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    이전
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl hover:from-gold-400 hover:to-gold-300 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        처리중...
                      </>
                    ) : isLastStep ? (
                      <>
                        신청하기
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        다음
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                {/* Success icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-3">신청이 완료되었습니다!</h3>
                <p className="text-slate-400 mb-4">
                  입력하신 연락처로 곧 상담사가 연락드릴 예정입니다.
                  <br />
                  빠른 상담을 원하시면 카카오톡으로 문의해주세요.
                </p>
                <div className="bg-navy-900/50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-slate-500 text-xs mb-2">복구 작업 안내</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    • 복구 작업 시작 후 <span className="text-gold-500 font-medium">6시간 ~ 2일</span> 내 1차 결과 안내
                    <br />
                    • 손실 업체에 따라 <span className="text-gold-500 font-medium">1주일 ~ 1개월</span> 정도 소요
                  </p>
                </div>

                <a
                  href="http://pf.kakao.com/_kJDgG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold px-6 py-3 rounded-xl hover:bg-[#FDD835] transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.463 2 10.692c0 2.625 1.75 4.923 4.363 6.254-.147.53-.61 2.175-.65 2.396-.05.278.102.274.215.2.088-.058 1.407-.958 2.026-1.382.671.1 1.365.15 2.046.15 5.523 0 10-3.463 10-7.618C20 6.463 15.523 3 12 3z" />
                  </svg>
                  카카오톡으로 바로 상담하기
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
