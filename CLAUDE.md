# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 규칙

나와의 모든 대화는 **한글**로만 진행한다.

## 프로젝트 개요

해외선물 손실복구 서비스 "디펜더"의 마케팅 랜딩 페이지. 한국어 전용 사이트로, 리드 수집(상담 신청)과 전환 최적화에 초점을 맞춘 프로젝트.

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — `tailwind.config` 파일 없이 `globals.css`의 `@theme` 인라인 문법으로 디자인 토큰 정의
- **Framer Motion** — 스크롤 트리거, stagger, SVG 패스 애니메이션 등 전반적으로 사용
- **Supabase** — 상담 신청 폼 데이터 저장 (클라이언트 직접 연결, API 라우트 없음)
- **GTM / GA** — `@next/third-parties`를 통한 이벤트 트래킹

## 개발 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (빌드 후 next-sitemap 자동 실행)
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## 아키텍처

### 라우팅

- `/` — 홈 (Hero, USP, SuccessCases, QuickLinks 섹션 조합)
- `/about` — 서비스 상세 소개
- `/cases` — 성공사례 갤러리 (모달 상세보기)

### 핵심 구조

```
app/              → 페이지 (모두 "use client" — 서버 컴포넌트 미사용)
components/
  common/         → ConsultationModal, StickyCTA, ScrollToTop
  sections/       → Hero, USP, SuccessCases, SocialProof, Footer 등
  icons/          → SVG 아이콘 컴포넌트
  layout/         → PageLayout (공통 레이아웃 래퍼)
contexts/         → ModalContext (전역 모달 상태)
data/mockData.ts  → 성공사례, USP 등 정적 콘텐츠 데이터
lib/supabase.ts   → Supabase 초기화 (환경변수 기반, 미설정 시 graceful 처리)
lib/gtm.ts        → GTM 이벤트 트래킹 헬퍼
types/            → TypeScript 타입 정의
```

### 데이터 흐름

- 모든 콘텐츠는 `data/mockData.ts`에서 정적으로 관리 (CMS 없음)
- 상담 신청 폼: 3단계 위자드 → Supabase `applications` 테이블에 저장
- 전역 상태: React Context API (모달 열기/닫기만 관리)
- 분석: GTM 커스텀 이벤트 (`consultation_submit`, `kakao_click`, `cta_click` 등)

### 디자인 시스템

- 색상: 딥 네이비(#0A192F ~ #1D3461) + 골드 그라디언트(#D4AF37 ~ #FFE5A0)
- 폰트: Pretendard Variable(본문), Montserrat(숫자/영문)
- 글래스모피즘 카드, 그라디언트 버튼, breathing 애니메이션
- 커스텀 토큰은 `app/globals.css`의 `@theme` 블록에서 정의

### 경로 별칭

`@/*` → 프로젝트 루트 (`tsconfig.json`에서 설정)

## 환경변수

`.env.local.example` 참고. Supabase URL/Key, GTM ID, 사이트 인증 키, 카카오톡 채널 URL 등이 필요.

## 주의사항

- Tailwind v4의 `@theme` 문법 사용 — `tailwind.config` 파일이 없는 것이 정상
- 모든 페이지 컴포넌트가 `"use client"` — 서버 컴포넌트/SSR 패턴 미사용
- Supabase 직접 클라이언트 연결 — API 라우트 없음
- Framer Motion 타입 이슈 주의 (`ease` 속성 등 — 커밋 히스토리 참고)
