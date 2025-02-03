"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ModalContext = createContext();

function ModalProviderComponent({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      const segments = pathname.split("/");
      const packageIndex = segments.findIndex(
        (segment) => segment === "packages"
      );
      if (packageIndex !== -1 && segments[packageIndex + 1]) {
        setRegion(segments[packageIndex + 1]);
      }
    }
  }, [pathname]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, setRegion, region }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const ModalProvider = dynamic(
  () => Promise.resolve(ModalProviderComponent),
  {
    ssr: false,
  }
);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
