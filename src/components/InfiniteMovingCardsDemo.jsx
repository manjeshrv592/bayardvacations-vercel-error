"use client";
import { useState, useEffect } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();

        if (response.ok && data.success) {
          setState({ data, loading: false, error: null });
        } else {
          setState({ data: null, loading: false, error: data.error });
        }
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: "Failed to fetch reviews",
        });
      }
    };

    fetchReviews();
  }, []);

  if (state.loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (state.error) {
    return <div className="py-4 text-center text-red-500">{state.error}</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden antialiased">
      <InfiniteMovingCards items={state} direction="left" speed="slow" />
    </div>
  );
}
