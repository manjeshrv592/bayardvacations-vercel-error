"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const useHotelType = () => {
  const searchParams = useSearchParams();
  return useMemo(() => searchParams.get("hotel"), [searchParams]);
};
