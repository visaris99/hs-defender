"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isConsultationOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <ModalContext.Provider
      value={{ isConsultationOpen, openConsultation, closeConsultation }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
