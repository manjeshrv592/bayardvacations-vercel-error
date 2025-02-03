import React from "react";
import Image from "next/image";

const GroupDepartureCard = ({ item }) => {
  return (
    <article className="relative h-[360px] c-xxl:h-[400px]">
      <div className="h-[280px] c-xxl:h-[320px]">
        <Image
          width={750}
          height={410}
          src={item.img}
          alt={item.alt}
          className="size-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full px-5 ">
        <div className="max-w-[500px] rounded-br-[32px] bg-brand-blue p-5 text-white c-xxl:px-10">
          <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
          <p className="text-xs c-xxl:text-base">{item.description}</p>
        </div>
      </div>
    </article>
  );
};

export default GroupDepartureCard;
