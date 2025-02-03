// /components/WhyBayard/CTAButtons.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export function CTAButtons() {
  return (
    <div className="mt-[10%] flex flex-col gap-6 lg:flex-row">
      <Link
        href="/contact"
        className="flex items-center justify-center rounded-xl border-2 border-brand-blue bg-white px-6 py-3 transition-colors hover:bg-gray-50 lg:py-5"
      >
        <span className="pr-[5px] text-lg text-brand-blue lg:text-xl">
          Get In Touch
        </span>
        <Image
          src="/media/icons/explore_blue.png"
          alt="Get In Touch"
          width={25}
          height={25}
        />
      </Link>
      <Link
        href="/categories"
        className="flex items-center justify-center rounded-xl bg-[#46b301] px-6 py-3 transition-colors hover:bg-[#3d9a01] lg:py-5"
      >
        <span className="pr-[5px]  text-lg text-white lg:text-xl">
          Explore Our Packages
        </span>
        <Image
          src="/media/icons/explore_icon.png"
          alt="Explore more"
          width={25}
          height={25}
        />
      </Link>
    </div>
  );
}
