import React, { useState } from "react";
import Container from "../ui/Container";
import { H4 } from "../Typography";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PackageCard from "../ui/PackageCard";

const ItineraryFooter = ({ relatedPackages }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="pt-16">
      <div className="blue-section bg-brand-blue pt-8">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 c-lg:flex-row">
            <H4 className="text-white">Related Packages</H4>
            <div className="flex gap-4">
              <Button
                className="aspect-square h-[36px] rounded-full border border-white bg-transparent p-0 hover:bg-white hover:text-brand-blue"
                onClick={() => swiperInstance?.slidePrev()}
              >
                <MoveLeft />
              </Button>
              <Button
                className="aspect-square h-[36px] rounded-full border border-white bg-transparent p-0 hover:bg-white hover:text-brand-blue"
                onClick={() => swiperInstance?.slideNext()}
              >
                <MoveRight />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <Swiper
              modules={[Navigation]}
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
              {relatedPackages.map((item) => (
                <SwiperSlide key={item.id}>
                  <PackageCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-12 h-px w-full bg-white/50"></div>
        </Container>
      </div>
    </section>
  );
};

export default ItineraryFooter;
