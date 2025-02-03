// /components/WhyBayard/WhyBayard.tsx (Server Component)
import Image from "next/image";
import { FeatureSection } from "./FeatureSection";
import { CTAButtons } from "./CTAButtons";
import Container from "../ui/Container";

const features = [
  {
    icon: "/media/icons/reliability.png",
    title: "Reliability",
    description:
      "We're with you every step of the way ensuring a seamless travel experience.",
  },
  {
    icon: "/media/icons/customized.png",
    title: "Customized",
    description: "One size doesn't fit all so why should one iterinary.",
  },
  {
    icon: "/media/icons/unique.png",
    title: "Unique",
    description:
      "We ensure our customers don't just visit the destinations, rather connect with them.",
  },
  {
    icon: "/media/icons/stress-free.png",
    title: "Stress-free",
    description:
      "We promise you just fun and beautiful memories, no stress whatsoever.",
  },
];

export default function WhyBayard() {
  return (
    <Container>
      <div className="grid items-center gap-8 c-lg:grid-cols-[500px_1fr] c-lg:gap-16">
        <div className="relative h-[400px] overflow-hidden rounded-2xl c-lg:h-[600px]">
          <Image
            src="/media/why_section.png"
            alt="why_section"
            width={530}
            height={650}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue opacity-80"></div>
          <div className="absolute left-1/2 top-1/2 flex size-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border-4 border-solid border-white c-lg:size-3/4 lg:rounded-3xl ">
            <svg
              width="232"
              height="177"
              viewBox="0 0 232 177"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M127.352 13.7168H214.589L178.063 103.956C175.477 110.347 166.464 110.347 163.875 103.956L127.352 13.7168Z"
                fill="white"
              />
              <path
                d="M117.177 126.396C117.177 136.76 112.987 146.134 106.222 152.951C99.44 159.739 90.0824 163.945 79.7603 163.945H17.4141V82.6533C32.2272 83.5145 45.9416 85.688 58.5517 88.8327C80.2125 94.1894 98.6618 102.35 114.028 111.338C116.051 115.949 117.174 121.036 117.174 126.393L117.177 126.396Z"
                fill="white"
              />
              <path
                d="M117.177 51.2856C117.177 61.6469 112.987 71.0425 106.225 77.8354C104.263 79.8053 102.076 81.5497 99.7277 83.0271C78.4341 77.7309 51.4191 74.9191 17.4141 77.1366V13.7168H79.7603C100.418 13.7168 117.177 30.5409 117.177 51.2856Z"
                fill="white"
              />
              <path
                d="M170.972 163.945C180.442 163.945 188.12 156.236 188.12 146.727C188.12 137.218 180.442 129.51 170.972 129.51C161.502 129.51 153.824 137.218 153.824 146.727C153.824 156.236 161.502 163.945 170.972 163.945Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className=" flex flex-col">
          <div className="mb-3 pb-[1%] text-3xl font-black text-brand-blue lg:text-4xl">
            Why Bayard Vacations?
          </div>
          <div className="mb-8 font-damion text-4xl leading-[112%] text-[#63b330] lg:mb-16  lg:text-4xl lg:leading-[34px]">
            Your travel dreams are unique, and so are our itineraries!
          </div>

          <FeatureSection features={features} />
          <CTAButtons />
        </div>
      </div>
    </Container>
  );
}
