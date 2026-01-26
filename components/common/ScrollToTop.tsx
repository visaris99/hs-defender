"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, []);

  return null;
}
