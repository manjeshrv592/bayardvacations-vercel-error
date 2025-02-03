"use client";
import React, { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PackageCard from "@/components/ui/PackageCard";
import Container from "../Container";
import { Button } from "../button";
import { MoveLeft, MoveRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { getCuratedPackages } from "@/utils/firebase";

const PackageCardsSlider = ({ packageType }) => {
  const [packages, setPackages] = useState([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getCuratedPackages(packageType);
        const publishedPackages = res.filter((item) => item.status !== "draft");
        const test = publishedPackages.map((item) => item.cardImages);
        console.log(test);

        setPackages(publishedPackages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPackages();
  }, [packageType]);

  return (
    <Container>
      <div className="section-header-margin flex flex-col items-center gap-4 c-lg:flex-row">
        <span className="flex rounded-full bg-brand-blue px-4 py-1 font-nord font-medium uppercase text-white">
          curated packages
        </span>
        <h2 className="flex-1 text-center font-nord text-4xl font-black uppercase text-brand-blue">
          {packageType === "international" ? (
            <div>
              <span className="text-4xl font-bold ">global</span>{" "}
              <span className="text-4xl font-light text-[#798290]">
                getaways
              </span>
            </div>
          ) : (
            <div>
              <span className="text-4xl font-bold ">domestic</span>{" "}
              <span className="text-4xl font-light text-[#798290]">
                holiday
              </span>
            </div>
          )}
        </h2>
        <div className="flex gap-4">
          <Button
            className="aspect-square h-[36px] rounded-full border border-brand-blue bg-transparent p-0 text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={() => swiper?.slidePrev()}
          >
            <MoveLeft />
          </Button>
          <Button
            className="aspect-square h-[36px] rounded-full border border-brand-blue bg-transparent p-0 text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={() => swiper?.slideNext()}
          >
            <MoveRight />
          </Button>
        </div>
      </div>

      {packages.length > 0 && (
        <Swiper
          modules={[Navigation]}
          loop
          onSwiper={(swiper) => setSwiper(swiper)}
          slidesPerView={1}
          breakpoints={{
            576: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {packages.map((item) => (
            <SwiperSlide key={uuidv4()}>
              <PackageCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default PackageCardsSlider;
