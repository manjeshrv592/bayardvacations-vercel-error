"use client";
import React from "react";
// import Lottie from "lottie-react";
// import splashScreenData from "@/animations/splash-screen";
import { useRegions } from "@/contexts/RegionContext";

const SplashScreen = () => {
  const { regionIsLoading } = useRegions();

  if (!regionIsLoading) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[1000] flex size-full items-center justify-center bg-white">
      <div className="max-w-screen-c-md">
        <h1 className="text-4xl font-bold text-brand-blue">Splash screen</h1>
        {/* <Lottie animationData={splashScreenData} loop={true} autoplay={true} /> */}
      </div>
    </div>
  );
};

export default SplashScreen;
