import type {
  SuccessCase,
  USPItem,
  FormStep,
  AmountRange,
  ActionType,
  ExternalLinks,
} from "@/types";

// Social Proof 티커 데이터 - 이름 풀 (난수 조합용)
export const namePool: string[] = [
  "김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
  "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍",
];

// 금액 범위 (만원 단위)
export const amountRanges: AmountRange[] = [
  { min: 300, max: 500 },
  { min: 500, max: 800 },
  { min: 800, max: 1200 },
  { min: 1200, max: 2000 },
  { min: 2000, max: 3000 },
  { min: 3000, max: 5000 },
];

// 액션 타입
export const actionTypes: ActionType[] = [
  { action: "복구 작업 신청", weight: 60 },
  { action: "복구 작업 완료", weight: 40 },
];

// USP (서비스 강점) 데이터
export const uspData: USPItem[] = [
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

// 복구 사례 데이터 (실제 인증 이미지 기반)
export const successCasesMock: SuccessCase[] = [
  {
    id: "1",
    title: "200만원으로 시작, 2,200만원 출금 완료",
    deposit: 200,
    withdrawal: 2200,
    profit: 2000,
    period: "3주",
    image: "/image/suc_200_2200.jpeg",
    description: "나스닥 야간 거래에서 연속 손절로 전 재산의 절반을 잃으셨던 40대 자영업자 고객님. 더 이상 본인 자금을 투입할 수 없는 상황에서 디펜더를 찾아주셨습니다. 전담 작업자가 안정적인 구간만 집중 공략하여 200만원 담보금으로 3주 만에 2,200만원 출금에 성공했습니다.",
    createdAt: new Date("2025-01-08"),
  },
  {
    id: "2",
    title: "300만원 입금 → 1,410만원 출금 달성",
    deposit: 300,
    withdrawal: 1410,
    profit: 1110,
    period: "2주",
    image: "/image/suc_300_1410.jpeg",
    description: "크루드오일 선물에서 1,500만원 이상 손실을 보셨던 30대 직장인 고객님. 월급으로는 도저히 메울 수 없는 금액에 막막해하시던 중 지인 소개로 상담을 받으셨습니다. 담보금 300만원으로 시작해 2주간의 집중 작업 끝에 1,410만원을 출금하며 손실 대부분을 만회하셨습니다.",
    createdAt: new Date("2025-01-22"),
  },
  {
    id: "3",
    title: "200만원 시작, 1,400만원 출금 성공",
    deposit: 200,
    withdrawal: 1400,
    profit: 1200,
    period: "18일",
    image: "/image/suc_200_1400.jpeg",
    description: "항셍지수 거래 중 급락장에서 큰 손실을 입으신 50대 고객님. 투자금 회수를 반쯤 포기하신 상태였지만, 디펜더 전담 작업자의 체계적 운용으로 200만원 담보금에서 18일 만에 1,400만원 출금까지 이어졌습니다. 현재도 꾸준히 작업을 이어가고 계십니다.",
    createdAt: new Date("2025-02-05"),
  },
  {
    id: "4",
    title: "200만원으로 800만원 출금 완료",
    deposit: 200,
    withdrawal: 800,
    profit: 600,
    period: "10일",
    image: "/image/suc_200_800.jpeg",
    description: "골드 선물 양방향 매매에서 계좌가 반토막 났던 30대 고객님. 소액으로 빠르게 복구할 수 있는지 반신반의하며 상담을 시작하셨습니다. 200만원 담보금으로 10일 만에 800만원을 출금하시며, \"이렇게 빨리 될 줄 몰랐다\"는 후기를 남겨주셨습니다.",
    createdAt: new Date("2025-02-15"),
  },
  {
    id: "5",
    title: "300만원 입금, 610만원 출금 달성",
    deposit: 300,
    withdrawal: 610,
    profit: 310,
    period: "1주",
    image: "/image/suc_300_610.jpeg",
    description: "해외선물 첫 진입 후 초반부터 손실이 쌓여 자신감을 잃으셨던 20대 고객님. 손실 금액 자체는 크지 않았지만 더 커지기 전에 복구하고 싶다는 마음으로 연락 주셨습니다. 300만원 담보금으로 1주 만에 610만원 출금에 성공, 빠른 판단이 결과로 이어진 사례입니다.",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "6",
    title: "200만원으로 510만원 출금 완료",
    deposit: 200,
    withdrawal: 510,
    profit: 310,
    period: "5일",
    image: "/image/suc_200_510.jpeg",
    description: "나스닥 단타 매매에서 수수료와 슬리피지로 계좌가 서서히 녹아내렸던 40대 고객님. 큰 금액은 아니지만 확실하게 복구하고 싶다는 요청에 맞춰 보수적 전략으로 접근했습니다. 200만원 담보금으로 5일 만에 510만원을 출금하며 깔끔하게 마무리된 케이스입니다.",
    createdAt: new Date("2025-03-10"),
  },
];

// 폼 단계 데이터
export const formSteps: FormStep[] = [
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
export const externalLinks: ExternalLinks = {
  kakaoChannel: "http://pf.kakao.com/_kJDgG",
};
