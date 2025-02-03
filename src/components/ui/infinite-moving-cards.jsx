"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.data.reviews.map((item, idx) => (
          <li
            className="relative w-[calc(100vw-40px)] max-w-[320px] shrink-0 rounded-xl bg-[#E5ECF7] p-6"
            key={idx}
          >
            <div className="mb-6 flex items-center gap-4">
              <Image
                width={64}
                height={64}
                alt={item.author_name}
                src={item.profile_photo_url}
              />
              <h4 className="font-bold text-[#01317E]">{item.author_name}</h4>
            </div>
            <div className="relative rounded-xl bg-[#1A58BA] px-6 pb-12 pt-8 font-medium text-white">
              <p>{truncateText(item.text, 120)}</p>
              {/* <span className="absolute left-6 top-0 translate-y-[-22px] font-sora text-6xl  text-brand-green">
                &quot;
              </span> */}
              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 gap-1 rounded-xl bg-white px-4 py-2 text-2xl text-[#fdc52d]">
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-2">
              <span className="font-semibold text-[#848484]">powered by</span>
              <Image
                alt="google-logo"
                src="/media/google-logo.svg"
                width={80}
                height={100}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
