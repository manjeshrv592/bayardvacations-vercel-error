import React from "react";
import Image from "next/image";
import { FiMap } from "react-icons/fi";
import { cn } from "@/lib/utils";

const EnrouteCard = ({ imgSrc, placeName, className }) => {
  return (
    <article
      className={cn(
        "p-2 border border-solid border-[#EAEAEA] inline-block rounded-xl",
        className
      )}
    >
      <div className="relative mb-2 h-48 max-w-[200px] rounded-xl">
        <Image
          alt={placeName}
          src={imgSrc}
          width={200}
          height={200}
          className="size-full rounded-xl object-cover"
        />
        <span className="absolute bottom-0 right-2 z-10 flex size-8 translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#46B301] to-[#88E84C]">
          <FiMap color="#fff" size={16} />
        </span>
      </div>
      <p className="mb-2 mt-4 max-w-[160px] text-sm font-medium text-[404040]">
        {placeName}
      </p>
    </article>
  );
};

export default EnrouteCard;
