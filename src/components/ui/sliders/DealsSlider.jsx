"use client";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { getAllDocuments } from "@/utils/firebase";
import { usePackages } from "@/contexts/PackageContext";
import Link from "next/link";

const DealsSlider = () => {
  const [allOffers, setAllOffers] = useState([]);
  const { packages: allPackages } = usePackages();

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await getAllDocuments("offers");
      setAllOffers(response);
    };

    fetchOffers();
  }, []);

  const activeOffers = allOffers.filter((offer) => offer.isActive);

  const offersToLoop = activeOffers.map((offer) => {
    const parentPackage = allPackages.find(
      (item) => item.id === offer.packageId
    );

    return {
      ...offer,
      region: parentPackage?.region,
      basePrice: parentPackage?.basePrice,
      days: parentPackage?.days,
      nights: parentPackage?.nights,
      packageSlug: parentPackage?.packageSlug,
      offerPrice:
        offer.discountType === "fixed"
          ? Math.round(parentPackage?.basePrice - offer.discountValue)
          : Math.round(
              parentPackage?.basePrice -
                parentPackage?.basePrice * (offer.discountValue / 100)
            ),
    };
  });

  return (
    <>
      {offersToLoop && offersToLoop.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          loop
          pagination={{ clickable: true }}
        >
          {offersToLoop.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/packages/${item.region}/${item.packageSlug}`}>
                <div className="relative h-[480px]">
                  <div className="absolute left-0 top-0 z-10 size-full">
                    <Image
                      alt={item?.region ? item.region : "region"}
                      src={item?.offerImage}
                      height={480}
                      width={1400}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 size-full bg-gradient-to-r from-black/60 to-black/0"></div>
                  </div>
                  <div className="relative z-20 flex h-full  flex-col px-16 py-12 text-white lg:px-28 lg:py-16 ">
                    <div className=" flex flex-1 flex-col-reverse justify-between gap-8 c-md:flex-row c-lg:items-center c-lg:gap-32">
                      <div className="flex-1">
                        <h3 className="mb-2 text-2xl font-bold uppercase lg:text-5xl">
                          {item.region}
                        </h3>
                        <p className="max-w-screen-c-sm text-sm c-md:text-base">
                          {item.description
                            ? item.description
                            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s"}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <div className="flex gap-1 rounded-full bg-black/70 px-5 py-1 text-sm font-medium text-white c-md:text-base">
                          <span>{item.nights} Nights</span>
                          <span>|</span>
                          <span>{item.days} Days</span>
                        </div>
                        <div className="rounded-full bg-white px-6 py-2 text-2xl font-medium text-[#6D502F] c-lg:px-8 c-lg:py-4 c-lg:text-4xl">
                          <span>₹</span>
                          <span>
                            {new Intl.NumberFormat("en-IN").format(
                              item.offerPrice
                            )}
                          </span>
                          <span>/-</span>
                        </div>
                        <div className="rounded-full px-6 text-xl font-medium text-white line-through c-lg:px-8 c-lg:text-3xl">
                          <span>₹</span>
                          <span>
                            {new Intl.NumberFormat("en-IN").format(
                              item.basePrice
                            )}
                          </span>
                          <span>/-</span>
                        </div>
                      </div>
                    </div>
                    <span>*Limited period offer, Price per person</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default DealsSlider;
