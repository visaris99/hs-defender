# 해외선물 손실복구 디펜더 - 프로젝트 명세서

## 1. 프로젝트 개요

해외선물 손실 복구 서비스를 제공하는 업체의 랜딩페이지입니다.

### 핵심 가치
- **신뢰도(Trust)** 와 **전문성(Professionalism)** 이 가장 중요
- 토스(Toss), 애플(Apple) 스타일의 **심플하지만 몰입감 있는 UX** 지향
- **SEO(검색 유입)** 와 **Analytics(마케팅 데이터 분석)** 가 비즈니스 핵심

---

## 2. 기술 스택 (Tech Stack)

| 분류 | 기술 | 비고 |
|------|------|------|
| Frontend | Next.js 14+ | App Router 기반 (필수) |
| Styling | Tailwind CSS | 디자인 시스템 구축 용이 |
| Animation | Framer Motion | 고급스러운 인터랙션 구현 (필수) |
| Backend | Firebase (Firestore) | 데이터 저장 |
| Deployment | Vercel | 배포 플랫폼 |
| Analytics | Google Tag Manager (GTM) | 마케팅 분석 연동 |

---

## 3. 디자인 컨셉 (Design Guidelines)

### 테마
**Premium Dark & Glassmorphism**

### 컬러 팔레트
| 용도 | 컬러 | HEX |
|------|------|-----|
| 메인 배경 | Deep Navy | `#0A192F` |
| 포인트 1 | Gold | `#D4AF37` 또는 `#FFD700` |
| 포인트 2 | White | `#FFFFFF` |
| 서브 텍스트 | Slate Gray | `#8892B0` |

### 폰트
- **한글:** Pretendard
- **숫자/영문 강조:** Montserrat

### UI 특징
- 유리 질감의 카드 UI (Backdrop blur 적용)
- 넉넉한 여백
- 둥근 모서리 (Border Radius 24px 이상)
- **반응형 웹 (Mobile First)**

---

## 4. 페이지 구조 및 세부 기능

> **형식:** 단일 페이지(Single Page) 스크롤 방식

### 섹션 1: Hero (인트로)

**레퍼런스:** 텍스트가 순차적으로 떠오르는 시네마틱 효과

**구현 요소:**
- Framer Motion 활용
- 배경: 은은한 그래프 라인 움직임 애니메이션
- 헤드카피: 천천히 페이드인(Fade-in)

**카피:**
> "해외선물 손실, 더 이상 고객님 돈으로 막지 마세요."

**CTA 버튼:**
- 텍스트: "내 계좌 진단받기"
- 애니메이션: 숨쉬는 듯한 효과 (Breathing Animation)

---

### 섹션 2: Social Proof (실시간 현황 띠)

**레퍼런스:** 토스 송금 알림 같은 깔끔한 티커

**구현 요소:**
- 화면 상단 또는 하단 고정
- 5초 간격 자동 롤링
- Mock Data 활용

**내용 예시:**
```
"방금 김OO님이 500만원 복구 신청을 하셨습니다."
"이OO님이 1,200만원 복구에 성공하셨습니다."
```

---

### 섹션 3: USP (서비스 강점)

**레이아웃:** 가로 스크롤 카드 UI 또는 2x2 그리드

| 번호 | 키워드 | 설명 |
|------|--------|------|
| 1 | **Zero Risk** | 담보금 100% 회사 부담 (고객 부담 0원) |
| 2 | **1:1 Care** | 실제 작업자가 상담부터 집행까지 전담 |
| 3 | **Best Commission** | 업계 최고 수수료 대우 |
| 4 | **Flexibility** | 손실이 없어도 작업 가능 |

---

### 섹션 4: Success Cases (복구 사례)

**레퍼런스:** 인스타그램 스토리 형태의 카드 리스트

**기능:**
- 카드 클릭 → 모달(Modal) 창 표시
- 상세 내용: 카톡 대화 캡쳐, 수익 인증 등

**데이터 소스:**
- Firebase `success_cases` 컬렉션
- 초기엔 더미 데이터 사용

**Firestore 스키마 예시:**
```typescript
interface SuccessCase {
  id: string;
  title: string;
  amount: number;           // 복구 금액
  period: string;           // 복구 기간
  thumbnail: string;        // 썸네일 이미지 URL
  detailImages: string[];   // 상세 이미지 URLs
  createdAt: Timestamp;
}
```

---

### 섹션 5: Consultation Form (상담 신청)

**스타일:** Typeform 스타일 (단계별 입력 유도)

**입력 단계:**
1. 이름 입력
2. 연락처 입력
3. 손실금액 입력
4. 신청 완료

**제출 시 동작:**
1. Firebase `applications` 컬렉션에 데이터 저장
2. **전환 이벤트(Conversion Event) 트리거 전송** (`consultation_submit`)

**Firestore 스키마:**
```typescript
interface Application {
  id: string;
  name: string;
  phone: string;
  lossAmount: string;
  createdAt: Timestamp;
  source?: string;          // UTM 파라미터 등
}
```

---

### 섹션 6: Footer & Sticky CTA

**Sticky CTA (화면 하단 고정):**
- 카카오톡 상담 버튼
- 전화 상담 버튼
- 스크롤 시 항상 노출

**Footer 내용:**
- 사업자 정보
- 이용약관
- 개인정보처리방침

---

## 5. SEO & Analytics 최적화

### A. 메타 데이터 및 검색엔진 최적화

| 항목 | 구현 방법 |
|------|----------|
| Dynamic Metadata | App Router의 `generateMetadata` 활용 |
| Verification Tags | 구글 서치콘솔, 네이버 서치어드바이저 메타 태그 영역 확보 |
| Canonical URL | 중복 콘텐츠 방지를 위한 표준 URL 설정 |
| Structured Data | JSON-LD로 'Organization', 'FAQPage' 스키마 마크업 |
| Sitemap & Robots | `next-sitemap` 활용, 빌드 시 자동 생성 |

### B. 데이터 분석 도구 연동

**Google Tag Manager (GTM):**
- `@next/third-parties/google` 활용 추천
- `layout.tsx`에 GTM 스크립트 삽입
- 추후 픽셀 등 소스 수정 없이 추가 가능하도록 설정

**Event Tracking:**

| 이벤트명 | 트리거 시점 |
|----------|------------|
| `consultation_submit` | 상담 신청 완료 버튼 클릭 |
| `kakao_click` | 카카오톡 상담 버튼 클릭 |
| `phone_click` | 전화 상담 버튼 클릭 |
| `cta_click` | Hero CTA 버튼 클릭 |

---

## 6. 프로젝트 폴더 구조 (예정)

```
hs-defender/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (GTM, 폰트, 메타데이터)
│   ├── page.tsx            # 메인 랜딩 페이지
│   ├── globals.css         # 글로벌 스타일
│   └── favicon.ico
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── USP.tsx
│   │   ├── SuccessCases.tsx
│   │   ├── ConsultationForm.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   └── common/
│       ├── StickyCtA.tsx
│       └── Ticker.tsx
├── lib/
│   ├── firebase.ts         # Firebase 설정
│   └── gtm.ts              # GTM 이벤트 헬퍼
├── hooks/
│   └── useScrollAnimation.ts
├── data/
│   └── mockData.ts         # 더미 데이터
├── public/
│   └── images/
├── tailwind.config.ts
├── next.config.js
├── next-sitemap.config.js
└── package.json
```

---

## 7. 환경 변수 (예정)

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# GTM
NEXT_PUBLIC_GTM_ID=

# Site Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=

# External Links
NEXT_PUBLIC_KAKAO_CHANNEL_URL=
NEXT_PUBLIC_PHONE_NUMBER=
```

---

## 8. 개발 체크리스트

### Phase 1: 프로젝트 세팅
- [ ] Next.js 14+ 프로젝트 초기화
- [ ] Tailwind CSS 설정
- [ ] Framer Motion 설치
- [ ] 폰트 설정 (Pretendard, Montserrat)
- [ ] 디자인 토큰 정의 (colors, spacing 등)

### Phase 2: 섹션 개발
- [ ] Hero 섹션
- [ ] Social Proof 티커
- [ ] USP 카드 섹션
- [ ] Success Cases (모달 포함)
- [ ] Consultation Form (단계별)
- [ ] Footer & Sticky CTA

### Phase 3: 백엔드 연동
- [ ] Firebase 설정
- [ ] Firestore 컬렉션 생성
- [ ] 폼 데이터 저장 기능

### Phase 4: SEO & Analytics
- [ ] 메타데이터 설정
- [ ] JSON-LD 스키마 추가
- [ ] GTM 연동
- [ ] 이벤트 트래킹 구현
- [ ] Sitemap & Robots.txt 생성

### Phase 5: 배포
- [ ] Vercel 배포 설정
- [ ] 환경 변수 설정
- [ ] 도메인 연결
- [ ] 서치콘솔/서치어드바이저 등록

---

## 9. 참고 사항

- 모든 설명과 대화는 **한국어**로 진행
- 코드 내 주석, 변수명은 **영어** 사용 가능
- **Mobile First** 반응형 디자인 필수
- 애니메이션은 과하지 않게, **고급스럽고 부드럽게**
- 성능 최적화 고려 (이미지 최적화, 코드 스플리팅 등)
