import React from "react";
import Lottie from "lottie-react";
import splashScreenData from "@/animations/splash-screen";

const SplashScreen = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] flex size-full items-center justify-center bg-white">
      <div className="max-w-screen-c-md">
        <Lottie animationData={splashScreenData} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default SplashScreen;
