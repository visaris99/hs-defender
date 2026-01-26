import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase 설정 (환경 변수에서 가져오기)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화 (중복 방지)
let app: FirebaseApp;
let db: Firestore;

// Firebase가 설정되어 있는지 확인
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

if (isFirebaseConfigured) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
}

export { db };

// Firestore 컬렉션명
export const COLLECTIONS = {
  APPLICATIONS: "applications",
  SUCCESS_CASES: "success_cases",
} as const;

// 타입 정의
export interface Application {
  id?: string;
  name: string;
  phone: string;
  lossAmount: string;
  createdAt: Date;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface SuccessCase {
  id: string;
  title: string;
  amount: number;
  period: string;
  thumbnail: string;
  detailImages: string[];
  description?: string;
  createdAt: Date;
}
