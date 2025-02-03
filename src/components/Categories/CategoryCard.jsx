// components/categories/CategoryCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useThemePackages } from "@/hooks/useThemePackages";

export function CategoryCard({
  title,
  titleColor,
  subTitle,
  image,
  icon,
  href,
  priority = false,
}) {
  // const router = useRouter();
  // const { getPackagesByTheme } = useThemePackages();
  const [imageLoaded, setImageLoaded] = useState(false);

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   // Convert title to theme format if needed
  //   const theme = title.toLowerCase().replace(/\s+/g, "-"); // e.g., "Romantic Getaways" -> "romantic-getaways"
  //   const packages = await getPackagesByTheme(theme);
  //   if (packages.length > 0) {
  //     // Just use the theme as the slug without query params
  //     router.push(`/categories/${theme}`);
  //   }
  // };

  return (
    <div className="w-full">
      <div className="group relative h-[388px] overflow-hidden rounded-2xl shadow-lg">
        {/* Image Container with Link */}
        <Link
          href={href}
          // onClick={handleClick}
          className="absolute inset-0 block"
          aria-label={title}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 311px"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
            loading={priority ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </Link>

        {/* Card Content */}
        <Link
          href={href}
          className="absolute inset-x-2 bottom-[14px]"
          aria-label={title}
        >
          <div className="flex h-[78px] items-center rounded-lg bg-white/90 p-4 shadow-md backdrop-blur-md">
            <div className="flex-1">
              <h3 className="mt-2 text-[16px]" style={{ color: titleColor }}>
                {title}
              </h3>
              <p className="text-[12px] text-gray-300">{subTitle}</p>
            </div>
            <div className="relative size-[50px]">
              <Image
                src={icon}
                alt=""
                fill
                className="transition-transform group-hover:translate-y-[-35px]"
                priority={priority}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
