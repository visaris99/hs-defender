"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { namePool, amountRanges, actionTypes } from "@/data/mockData";

interface MessageData {
  id: string;
  name: string;
  amount: string;
  action: string;
  timeAgo: string;
}

export default function SocialProof() {
  const [currentMessage, setCurrentMessage] = useState<MessageData | null>(null);
  const usedCombinationsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // 난수 생성 함수
    const generateRandomMessage = (): MessageData => {
      let combination: string;
      let name: string;
      let amount: number;
      let action: string;
      let attempts = 0;

      // 중복되지 않는 조합 찾기
      do {
        // 랜덤 이름
        const nameIndex = Math.floor(Math.random() * namePool.length);
        name = `${namePool[nameIndex]}OO`;

        // 랜덤 금액 범위 선택 후 해당 범위 내 랜덤 금액
        const rangeIndex = Math.floor(Math.random() * amountRanges.length);
        const range = amountRanges[rangeIndex];
        amount = Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
        // 50만원 단위로 반올림
        amount = Math.round(amount / 50) * 50;

        // 가중치 기반 랜덤 액션
        const totalWeight = actionTypes.reduce((sum, type) => sum + type.weight, 0);
        let random = Math.random() * totalWeight;
        action = actionTypes[0].action;
        for (const type of actionTypes) {
          random -= type.weight;
          if (random <= 0) {
            action = type.action;
            break;
          }
        }

        combination = `${name}-${amount}-${action}`;
        attempts++;
      } while (usedCombinationsRef.current.has(combination) && attempts < 50);

      // 사용된 조합 추가 (최대 100개까지만 저장)
      if (usedCombinationsRef.current.size >= 100) {
        // 오래된 것들 절반 제거
        const arr = Array.from(usedCombinationsRef.current);
        arr.splice(0, 50);
        usedCombinationsRef.current = new Set(arr);
      }
      usedCombinationsRef.current.add(combination);

      // 랜덤 시간 (1분 ~ 30분 전)
      const minutes = Math.floor(Math.random() * 30) + 1;

      return {
        id: `${Date.now()}-${Math.random()}`,
        name,
        amount: `${amount.toLocaleString()}만원`,
        action,
        timeAgo: `${minutes}분 전`,
      };
    };

    // 초기 메시지 생성
    setCurrentMessage(generateRandomMessage());

    // 5초마다 새 메시지 생성
    const interval = setInterval(() => {
      setCurrentMessage(generateRandomMessage());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!currentMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="실시간 서비스 현황"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/90 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-sm"
          >
            {/* Notification dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>

            {/* Message */}
            <span className="text-slate-300">
              방금{" "}
              <span className="text-slate-100 font-medium">{currentMessage.name}</span>
              님이{" "}
              <span className="gold-highlight font-display">
                {currentMessage.amount}
              </span>{" "}
              {currentMessage.action}을 하셨습니다.
            </span>

            {/* Time */}
            <span className="text-slate-500 text-xs">{currentMessage.timeAgo}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
