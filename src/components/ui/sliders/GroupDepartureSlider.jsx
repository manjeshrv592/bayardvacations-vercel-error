"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PackageCard from "../PackageCard";
import { Button } from "../button";
import { MoveLeft, MoveRight } from "lucide-react";
import { usePackages } from "@/contexts/PackageContext";

const GroupDepartureSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const { packages: allPackages } = usePackages();

  const groupAdventures = allPackages.filter((item) =>
    item.theme.includes("group-adventures")
  );

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button
          className="aspect-square h-[36px] rounded-full border border-brand-blue bg-transparent p-0 text-brand-blue hover:bg-brand-blue hover:text-white"
          onClick={() => swiperInstance?.slidePrev()}
        >
          <MoveLeft />
        </Button>
        <Button
          className="aspect-square h-[36px] rounded-full border border-brand-blue bg-transparent p-0 text-brand-blue hover:bg-brand-blue hover:text-white"
          onClick={() => swiperInstance?.slideNext()}
        >
          <MoveRight />
        </Button>
      </div>
      <Swiper
        modules={[Navigation]}
        loop
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        slidesPerView={1}
        breakpoints={{
          576: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
      >
        {groupAdventures.map((item) => (
          <SwiperSlide key={item.id}>
            <PackageCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default GroupDepartureSlider;
