import React, { useState } from "react";
import Container from "../ui/Container";
import Image from "next/image";
import { ParallaxScrollDemo } from "../ui/ParallaxScroll/ParallaxScrollDemo";

const ItineraryHeroDesktop = ({ packageData }) => {
  const [bannerImgUrl, setBannerImgUrl] = useState(
    packageData.bannerImages[0].url
  );

  return (
    <section className=" relative z-30 hidden pb-10 pt-28 c-xl:block">
      <Container>
        <div className="mb-4 flex flex-col items-start gap-2 c-lg:flex-row c-lg:items-center c-lg:justify-between">
          <h1 className="max-w-screen-c-md text-2xl  font-semibold leading-[130%] text-white c-xl:text-[38px]">
            {packageData?.packageTitle}
          </h1>
          <div className="shrink-0 rounded-lg bg-brand-green px-4 py-2 text-white">
            <h4 className="text-xl font-semibold ">
              {packageData?.days} Days & <br /> {packageData?.nights} Nights
            </h4>
          </div>
        </div>
        <div className="grid  rounded-2xl border border-solid border-[#A8BFE2] bg-white/40 p-[5px] backdrop-blur-sm c-xl:grid-cols-[1fr_280px] c-xl:p-3 c-xxl:grid-cols-[1fr_400px] c-xxxl:grid-cols-[1fr_400px]">
          <div className="h-[50vh] overflow-hidden rounded-xl c-xl:h-[500px]">
            <Image
              src={bannerImgUrl}
              alt="Nature"
              width={1000}
              height={1000}
              className="size-full object-cover"
            />
          </div>
          <div>
            <ParallaxScrollDemo
              onBannerImgUrl={setBannerImgUrl}
              images={packageData?.bannerImages}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ItineraryHeroDesktop;
