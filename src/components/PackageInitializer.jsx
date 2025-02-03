// components/PackageInitializer.jsx
"use client";
import { useEffect } from "react";
import { usePackages } from "@/contexts/PackageContext";

export default function PackageInitializer({ children }) {
  const { fetchPackages } = usePackages();

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
