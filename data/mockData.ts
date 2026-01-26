import { SuccessCase } from "@/lib/firebase";

// Social Proof 티커 데이터 - 이름 풀 (난수 조합용)
export const namePool = [
  "김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
  "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍",
];

// 금액 범위 (만원 단위)
export const amountRanges = [
  { min: 300, max: 500 },
  { min: 500, max: 800 },
  { min: 800, max: 1200 },
  { min: 1200, max: 2000 },
  { min: 2000, max: 3000 },
  { min: 3000, max: 5000 },
];

// 액션 타입
export const actionTypes = [
  { action: "복구 작업 신청", weight: 60 },
  { action: "복구 작업 완료", weight: 40 },
];

// USP (서비스 강점) 데이터
export const uspData = [
  {
    id: 1,
    keyword: "Zero Risk",
    title: "고객 부담 0원",
    description: "담보금 100%를 회사에서 부담합니다. 고객님은 리스크 없이 복구 작업을 진행하실 수 있습니다.",
    icon: "shield",
  },
  {
    id: 2,
    keyword: "1:1 Care",
    title: "전담 케어",
    description: "실제 작업자가 상담부터 집행까지 1:1로 전담합니다. 모든 과정을 투명하게 안내해드립니다.",
    icon: "user",
  },
  {
    id: 3,
    keyword: "Best Commission",
    title: "업계 최고 수수료",
    description: "업계 최고 수준의 수수료를 제공해드립니다. 합리적인 조건으로 복구 작업을 진행하세요.",
    icon: "coin",
  },
  {
    id: 4,
    keyword: "Flexibility",
    title: "유연한 조건",
    description: "손실이 없어도 작업이 가능합니다. 다양한 상황에 맞춰 최적의 솔루션을 제안해드립니다.",
    icon: "sparkles",
  },
];

// 복구 사례 Mock 데이터
export const successCasesMock: SuccessCase[] = [
  {
    id: "1",
    title: "3개월 만에 1,200만원 복구 작업 완료",
    amount: 12000000,
    period: "3개월",
    thumbnail: "/images/case-1.jpg",
    detailImages: ["/images/case-1-detail-1.jpg", "/images/case-1-detail-2.jpg"],
    description: "해외선물 투자로 1,200만원의 손실을 보셨던 고객님. 전담 작업자의 체계적인 관리로 3개월 만에 복구 작업을 완료했습니다.",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "2개월 만에 800만원 복구 작업 완료",
    amount: 8000000,
    period: "2개월",
    thumbnail: "/images/case-2.jpg",
    detailImages: ["/images/case-2-detail-1.jpg", "/images/case-2-detail-2.jpg"],
    description: "급격한 시장 변동으로 손실을 보셨던 고객님. 안정적인 운용 전략으로 2개월 만에 복구 작업을 완료했습니다.",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    title: "1개월 만에 2,500만원 복구 작업 완료",
    amount: 25000000,
    period: "1개월",
    thumbnail: "/images/case-3.jpg",
    detailImages: ["/images/case-3-detail-1.jpg", "/images/case-3-detail-2.jpg"],
    description: "대규모 손실에도 포기하지 않으신 고객님. 전담 케어와 함께 1개월간의 여정 끝에 2,500만원 복구 작업을 완료했습니다.",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    title: "2주 만에 500만원 복구 작업 완료",
    amount: 5000000,
    period: "2주",
    thumbnail: "/images/case-4.jpg",
    detailImages: ["/images/case-4-detail-1.jpg", "/images/case-4-detail-2.jpg"],
    description: "빠른 상담과 신속한 대응으로 2주 만에 복구 작업을 완료한 사례입니다.",
    createdAt: new Date("2024-04-05"),
  },
];

// 폼 단계 데이터
export const formSteps = [
  {
    step: 1,
    field: "name",
    question: "성함이 어떻게 되시나요?",
    placeholder: "홍길동",
    type: "text",
  },
  {
    step: 2,
    field: "phone",
    question: "연락받으실 번호를 알려주세요.",
    placeholder: "010-1234-5678",
    type: "tel",
  },
  {
    step: 3,
    field: "lossAmount",
    question: "현재 손실 금액이 어느 정도인가요?",
    placeholder: "예: 500만원",
    type: "text",
  },
];

// 외부 링크
export const externalLinks = {
  kakaoChannel: "http://pf.kakao.com/_kJDgG",
};
