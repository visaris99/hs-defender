"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formSteps } from "@/data/mockData";
import { trackConsultationSubmit, trackFormStep } from "@/lib/gtm";
import { supabase, TABLES, Application } from "@/lib/supabase";
import { useModal } from "@/contexts/ModalContext";

interface FormData {
  name: string;
  phone: string;
  lossAmount: string;
}

export default function ConsultationModal() {
  const { isConsultationOpen, closeConsultation } = useModal();
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isConsultationOpen) {
      setTimeout(() => {
        setCurrentStep(0);
        setFormData({ name: "", phone: "", lossAmount: "" });
        setIsCompleted(false);
        setError("");
      }, 300);
    }
  }, [isConsultationOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isConsultationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isConsultationOpen]);

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
      if (supabase) {
        const applicationData = {
          name: formData.name,
          phone: formData.phone,
          loss_amount: formData.lossAmount,
          created_at: new Date().toISOString(),
          source: typeof window !== "undefined" ? window.location.href : "",
        };

        const { error: insertError } = await supabase
          .from(TABLES.APPLICATIONS)
          .insert(applicationData);

        if (insertError) throw insertError;
      }

      trackConsultationSubmit(formData.lossAmount);
      setIsCompleted(true);
    } catch (err) {
      console.error("Form submission error:", err);
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
    <AnimatePresence>
      {isConsultationOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeConsultation}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0A192F] border border-white/10 shadow-2xl rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-100">
                  <span className="gradient-text">무료 상담</span> 신청
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  간단한 정보만 입력하시면 전담 상담사가 연락드립니다.
                </p>
              </div>
              <button
                onClick={closeConsultation}
                className="text-slate-400 hover:text-slate-100 transition-colors p-2 hover:bg-white/5 rounded-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
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
                            index <= currentStep ? "bg-amber-500" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step indicator */}
                    <p className="text-amber-500 text-sm font-display font-semibold mb-3">
                      STEP {currentStep + 1} / {formSteps.length}
                    </p>

                    {/* Question */}
                    <h3 className="text-xl md:text-2xl font-semibold mb-8 text-slate-100">
                      {currentStepData.question}
                    </h3>

                    {/* Input */}
                    <div className="mb-8">
                      <input
                        type={currentStepData.type}
                        value={formData[currentStepData.field as keyof FormData]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={currentStepData.placeholder}
                        autoFocus
                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-amber-500 text-xl py-3 outline-none transition-colors placeholder:text-slate-600 text-slate-100"
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-3"
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
                        className={`flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors ${
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
                        className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
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
                    className="text-center py-4"
                  >
                    {/* Success icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                      <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-semibold mb-4 text-slate-100">신청이 완료되었습니다!</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      입력하신 연락처로 곧 상담사가 연락드릴 예정입니다.
                      <br />
                      빠른 상담을 원하시면 카카오톡으로 문의해주세요.
                    </p>
                    <div className="bg-[#112240] rounded-xl p-4 mb-6 text-left">
                      <p className="text-slate-500 text-xs mb-2">복구 작업 안내</p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        • 복구 작업 시작 후 <span className="gold-highlight">6시간 ~ 2일</span> 내 1차 결과 안내
                        <br />
                        • 손실 업체에 따라 <span className="gold-highlight">1주일 ~ 1개월</span> 정도 소요
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
