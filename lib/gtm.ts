// Google Tag Manager Event Helper

type GTMEventParams = {
  event: string;
  [key: string]: unknown;
};

/**
 * GTM 커스텀 이벤트 전송
 * @param eventName - 이벤트명
 * @param params - 추가 파라미터
 */
export const sendGTMEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    const dataLayer = (window as unknown as { dataLayer?: GTMEventParams[] }).dataLayer;
    if (dataLayer) {
      const eventData: GTMEventParams = {
        event: eventName,
        ...params,
      };
      dataLayer.push(eventData);
    }
  }
};

// 사전 정의된 이벤트들

/**
 * 상담 신청 완료 이벤트
 */
export const trackConsultationSubmit = (lossAmount?: string) => {
  sendGTMEvent("consultation_submit", {
    event_category: "conversion",
    event_label: "consultation_form",
    loss_amount: lossAmount,
  });
};

/**
 * 카카오톡 상담 클릭 이벤트
 */
export const trackKakaoClick = () => {
  sendGTMEvent("kakao_click", {
    event_category: "engagement",
    event_label: "kakao_channel",
  });
};

/**
 * 전화 상담 클릭 이벤트
 */
export const trackPhoneClick = () => {
  sendGTMEvent("phone_click", {
    event_category: "engagement",
    event_label: "phone_call",
  });
};

/**
 * Hero CTA 클릭 이벤트
 */
export const trackCTAClick = (ctaName: string) => {
  sendGTMEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaName,
  });
};

/**
 * 성공 사례 모달 열기 이벤트
 */
export const trackSuccessCaseView = (caseId: string, caseTitle: string) => {
  sendGTMEvent("success_case_view", {
    event_category: "engagement",
    case_id: caseId,
    case_title: caseTitle,
  });
};

/**
 * 폼 단계 진행 이벤트
 */
export const trackFormStep = (step: number, stepName: string) => {
  sendGTMEvent("form_step", {
    event_category: "form",
    step_number: step,
    step_name: stepName,
  });
};
