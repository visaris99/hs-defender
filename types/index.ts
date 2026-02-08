// Firebase 관련 타입
export interface Application {
  id?: string;
  name: string;
  phone: string;
  lossAmount: string;
  createdAt: Date;
  source?: string;
}

export interface SuccessCase {
  id: string;
  title: string;
  deposit: number;
  withdrawal: number;
  profit: number;
  period: string;
  image: string;
  description: string;
  createdAt: Date;
}

// 폼 관련 타입
export interface FormStep {
  step: number;
  field: string;
  question: string;
  placeholder: string;
  type: string;
}

export interface FormData {
  name: string;
  phone: string;
  lossAmount: string;
}

// USP 관련 타입
export interface USPItem {
  id: number;
  keyword: string;
  title: string;
  description: string;
  icon: "shield" | "user" | "coin" | "sparkles";
}

// Social Proof 관련 타입
export interface MessageData {
  id: string;
  name: string;
  amount: string;
  action: string;
  timeAgo: string;
}

export interface AmountRange {
  min: number;
  max: number;
}

export interface ActionType {
  action: string;
  weight: number;
}

// 외부 링크 타입
export interface ExternalLinks {
  kakaoChannel: string;
}
