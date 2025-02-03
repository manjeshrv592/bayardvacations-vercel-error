// /components/WhyBayard/FeatureSection.tsx
import Image from "next/image";

export function FeatureSection({ features }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {features.map((feature, index) => (
        <div key={index} className="flex">
          <Image
            src={feature.icon}
            alt={feature.title.toLowerCase()}
            width={91}
            height={83}
          />
          <div className=" pl-[21px]">
            <p className="h-[25px] text-xl font-semibold text-brand-blue">
              {feature.title}
            </p>
            <p className="max-h-[45px] w-[200px] pt-2 text-left text-xs text-brand-blue">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
