import React, { useState } from "react";
import Container from "../ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const ItineraryHeroMobile = ({ packageData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="relative z-20 pb-10 pt-24 c-xl:hidden">
      <Container>
        <div className="mb-4 flex flex-col items-start gap-2 c-lg:flex-row c-lg:items-center c-lg:justify-between">
          <h1 className="max-w-screen-c-md text-2xl  font-bold leading-[130%] text-white c-xl:text-5xl">
            {packageData?.packageTitle}
          </h1>
          <div className="shrink-0 rounded-lg bg-brand-green px-4 py-2 text-white">
            <h4 className="font-semibold">
              {packageData?.days} Days & {packageData?.nights} Nights
            </h4>
          </div>
        </div>
        <div className="rounded-[20px] border-2 border-solid border-[#A8BFE2] bg-[#A8BFE2]/20 p-1">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mb-4"
          >
            {packageData.bannerImages.map((ele) => (
              <SwiperSlide key={uuidv4()}>
                <div className="h-[200px] overflow-hidden rounded-2xl">
                  <Image
                    width={1000}
                    height={200}
                    alt={ele.title}
                    className="size-full object-cover"
                    src={ele.url}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {packageData.bannerImages.map((ele) => (
              <SwiperSlide key={uuidv4()}>
                <div className="aspect-square overflow-hidden rounded-xl">
                  <Image
                    width={1000}
                    height={500}
                    alt={ele.title}
                    className="size-full object-cover"
                    src={ele.url}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default ItineraryHeroMobile;
