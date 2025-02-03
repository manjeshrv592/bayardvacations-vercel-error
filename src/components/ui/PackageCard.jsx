import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import packageCardData from "../../../data/packageCardData";
import { cn } from "@/lib/utils";

const splitCityStr = (str) => str.split("–").map((place) => place.trim());

const PackageCard = ({ item = packageCardData, className }) => {
  const [hiddenCities, setHiddenCities] = useState(0);
  const textRef = useRef(null);
  const cities = splitCityStr(item.citiesList);

  useEffect(() => {
    const calculateHiddenCities = () => {
      const element = textRef.current;
      if (!element) return;

      const isTextTruncated = element.scrollWidth > element.clientWidth;
      if (!isTextTruncated) {
        setHiddenCities(0);
        return;
      }

      const temp = document.createElement("span");
      temp.style.visibility = "hidden";
      temp.style.position = "absolute";
      temp.style.whiteSpace = "nowrap";
      temp.style.fontSize = window.getComputedStyle(element).fontSize;
      document.body.appendChild(temp);

      let visibleCities = 0;
      let currentText = "";

      for (const city of cities) {
        if (currentText) {
          currentText += " – ";
        }
        currentText += city;
        temp.textContent = currentText;

        if (temp.offsetWidth <= element.clientWidth) {
          visibleCities++;
        } else {
          break;
        }
      }

      document.body.removeChild(temp);
      setHiddenCities(Math.max(0, cities.length - visibleCities));
    };

    calculateHiddenCities();
    window.addEventListener("resize", calculateHiddenCities);

    return () => {
      window.removeEventListener("resize", calculateHiddenCities);
    };
  }, [cities]);

  return (
    <Link href={`/packages/${item.region}/${item.packageSlug}`}>
      <article
        className={cn(
          "package-card relative flex h-[400px] items-end overflow-hidden rounded-2xl",
          className
        )}
      >
        <div className="absolute left-0 top-0 z-10 size-full">
          <Swiper
            className="h-full"
            modules={[Navigation, Pagination]}
            navigation
            loop={item.cardImages.length > 1}
            pagination={{ clickable: true }}
          >
            {item.cardImages.map(
              (img, i) =>
                img?.url && (
                  <SwiperSlide key={i}>
                    <Image
                      alt={img?.title || "NA"}
                      src={img.url}
                      width={1200}
                      height={800}
                      className="size-full object-cover"
                    />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
        <div className="relative z-20 flex w-full flex-col justify-end gap-4 p-2">
          <div className="flex  justify-between gap-2 text-xs">
            <span className="flex max-w-[calc(100%-100px)] items-center rounded-lg bg-white font-bold text-brand-blue">
              <span
                ref={textRef}
                className="truncate px-4 py-1 capitalize"
                style={{ maxWidth: "200px" }}
              >
                {item.citiesList}
              </span>
              {hiddenCities > 0 && (
                <span className="whitespace-nowrap border-l border-gray-200 px-2 py-1 text-base text-brand-green">
                  +{hiddenCities}
                </span>
              )}
            </span>

            <div className="shrink-0">
              <span className="inline-block whitespace-nowrap rounded-lg bg-white px-4 py-1 font-bold text-brand-blue">
                {item.days}D {item.nights}N
              </span>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_max-content] overflow-hidden rounded-xl bg-white text-xs">
            <span className="inline-block bg-white p-4 font-bold capitalize text-brand-blue">
              {item.packageTitle}
            </span>
            <span
              className="flex flex-col justify-center rounded-tl-xl bg-brand-blue px-3 py-4 font-bold text-white"
              style={{ boxShadow: "-3px 0 0 #46B301" }}
            >
              <span className="text-xs">Starting @</span>
              <span className="text-xl">
                ₹ {new Intl.NumberFormat("en-IN").format(item.basePrice)}
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PackageCard;
