"use client";
import dynamic from "next/dynamic";
import { useRegions } from "@/contexts/RegionContext";

// Import animation data normally since it's just JSON
import splashScreenData from "@/animations/splash-screen";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SplashScreen = () => {
  const { regionIsLoading } = useRegions();

  if (!regionIsLoading) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[1000] flex size-full items-center justify-center bg-white">
      <div className="max-w-screen-c-md">
        <h1 className="text-4xl font-bold text-brand-blue">Splash screen</h1>
        {/* Only render Lottie on the client side */}
        <Lottie animationData={splashScreenData} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default SplashScreen;
