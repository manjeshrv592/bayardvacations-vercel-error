"use client";
import React from "react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatRegionName } from "@/utils/navbarHelpers";
import Link from "next/link";

const ExplorationCard = ({ item }) => {
  return (
    <Link href={`/packages/${item.region}`} className="">
      <article className=" hoverable-card overflow-hidden rounded-2xl bg-[#E5ECF7]">
        <div className="h-[420px] w-full overflow-hidden rounded-2xl">
          <Swiper modules={[Pagination]} loop pagination={{ clickable: true }}>
            {item.cardImages.map((ele) => (
              <SwiperSlide key={uuidv4()}>
                <div className="relative h-[420px]">
                  <div className=" size-full">
                    <Image
                      alt="Todo"
                      src={ele.url}
                      height={384}
                      width={300}
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className=" p-6">
          <h4 className="text-lg font-bold text-brand-blue">
            {formatRegionName(item.region)}
          </h4>
        </div>
      </article>
    </Link>
  );
};

export default ExplorationCard;
