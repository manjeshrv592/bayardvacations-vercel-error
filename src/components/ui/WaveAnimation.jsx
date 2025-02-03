import Lottie from "lottie-react";
import WaveAnimationNew from "@/animations/wave-animation-new.json";

const WaveAnimation = ({ packageData }) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#0146B3] via-[#01317E] to-[#0146B3] p-6 c-xl:p-12">
      <div className="relative z-20">
        <h3 className="mb-4 font-nord text-lg font-medium uppercase text-white">
          Book Your <span>{packageData.region}</span> Adventure Today!
        </h3>
        {packageData?.footer_description && (
          <p className="text-white opacity-70">
            {packageData?.footer_description}
          </p>
        )}
      </div>
      <div className="absolute left-0 top-0 z-10 hidden size-full items-center justify-center c-lg:flex">
        <Lottie animationData={WaveAnimationNew} loop />
      </div>
    </div>
  );
};

export default WaveAnimation;
