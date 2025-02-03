import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GroupDepartureCard from "@/components/GroupDepartureCard";
import { v4 as uuidv4 } from "uuid";
import ServicesCard from "@/components/ui/ServicesCard";
import GroupDepartureSlider from "@/components/ui/sliders/GroupDepartureSlider";

const serviceData = [
  {
    id: uuidv4(),
    icon: "/img/group-departure/icon-1.svg",
    alt: "Leaf icon",
    title: "Sustainable Travel",
    description:
      "We prioritize eco-friendly practices and support local communities, ensuring your trip has a positive impact on the places you visit.",
  },
  {
    id: uuidv4(),
    icon: "/img/group-departure/icon-2.svg",
    alt: "Customer service icon",
    title: "Unmatched Customer Support",
    description:
      "From your first inquiry to the last day of your trip, our dedicated team is here to support you and ensure everything goes smoothly.",
  },
  {
    id: uuidv4(),
    icon: "/img/group-departure/icon-3.svg",
    alt: "Exclusive icon",
    title: "Exclusive Access & Privileges",
    description:
      "Thanks to our trusted partnerships, we offer exclusive perks like priority bookings, private tours, and VIP access to top attractions.",
  },
];

const groupDepartureCardData = [
  {
    id: uuidv4(),
    img: "/img/group-departure/group-departure-1.jpg",
    alt: "People camping outdoor",
    title: "Curated, Immersive Experiences",
    description:
      "We go beyond typical tourist attractions, offering authentic, local experiences that truly connect you with the culture, history, and lifestyle of your destination.",
  },
  {
    id: uuidv4(),
    img: "/img/group-departure/group-departure-2.jpg",
    alt: "Two people shaking hands",
    title: "Unbeatable Value for Money",
    description:
      "Enjoy premium experiences—comfortable accommodations, expert guides, and local insights—at an exceptional price. Quality travel doesn’t have to break the bank!",
  },
  {
    id: uuidv4(),
    img: "/img/group-departure/group-departure-3.jpg",
    alt: "Group of people on a trip",
    title: "Smaller Group Sizes",
    description:
      "With groups of 25-30 people, we create a more intimate, personalized experience where everyone’s needs are met, and no one feels rushed or lost in a crowd.",
  },
];

const GroupDeparturePage = () => {
  return (
    <>
      <section className="relative h-screen bg-black c-xl:h-[75vh]">
        <div className="absolute inset-0">
          <Image
            fill
            src="/img/group-departure/hero.jpg"
            alt="People on group trip"
            className="object-cover opacity-70"
          />
        </div>
        <Container className="flex h-full items-end pb-12">
          <div className="relative z-10 flex max-w-screen-c-md flex-col items-start justify-center gap-8 text-white">
            <h1 className="font-nord text-5xl font-bold">Group departure</h1>
            <p>
              Ready to explore the world with your friends, family, or
              colleagues? Bayard Vacations has the ultimate group getaway just
              waiting for you! Whether you’re craving a cultural deep dive, an
              adrenaline-packed adventure, or a relaxing retreat, we’ve got the
              perfect travel package to suit your group’s vibe.
            </p>
            <Button
              variant="success"
              asChild
              className="rounded-full px-8 py-6"
            >
              <Link href="/categories/group-adventures">
                <span>Explore All</span>
                <span>
                  <ArrowUpRight className="!size-4" />
                </span>
              </Link>
            </Button>
          </div>
        </Container>
      </section>
      <section className="relative h-screen bg-brand-blue c-xl:h-[50vh]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            fill
            src="/img/group-departure/logo.svg"
            alt="Bayard logo "
            className="scale-[200%] object-cover opacity-[5%]"
          />
        </div>
        <Container className="relative z-10 flex h-full flex-col items-center justify-center gap-8">
          <div className="w-32">
            <svg
              className="w-full"
              width="128"
              height="99"
              viewBox="0 0 368 284"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_34_280)">
                <path
                  d="M194.477 0.0643044H276.116L241.937 84.4811C239.518 90.4603 231.08 90.4603 228.66 84.4811L194.477 0.0643044Z"
                  fill="white"
                />
                <path
                  d="M184.951 105.471C184.951 115.168 181.029 123.934 174.699 130.313C168.353 136.662 159.599 140.598 149.938 140.598H91.5938V64.5519C105.456 65.3578 118.287 67.3907 130.093 70.3336C150.363 75.3458 167.628 82.9784 182.008 91.3858C183.899 95.7012 184.951 100.459 184.951 105.471Z"
                  fill="white"
                />
                <path
                  d="M184.951 35.2068C184.951 44.8984 181.029 53.6905 174.699 60.0441C172.865 61.8847 170.819 63.5173 168.618 64.9003C148.689 59.9505 123.41 57.3196 91.5938 59.3942V0.0643177H149.938C169.27 0.0643177 184.951 15.8028 184.951 35.2068Z"
                  fill="white"
                />
                <path
                  d="M235.291 140.603C244.154 140.603 251.339 133.391 251.339 124.495C251.339 115.599 244.154 108.388 235.291 108.388C226.428 108.388 219.243 115.599 219.243 124.495C219.243 133.391 226.428 140.603 235.291 140.603Z"
                  fill="#59DF02"
                />
                <path
                  d="M0.567383 184.923H34.8393C38.2582 184.923 41.1902 185.687 43.6301 187.21C46.0699 188.739 47.914 190.767 49.1676 193.299C50.4161 195.831 51.0377 198.597 51.0377 201.592C51.0377 203.391 50.7113 205.107 50.0638 206.739C49.4111 208.372 48.4631 209.869 47.2147 211.232C49.1158 212.537 50.5508 214.159 51.5298 216.093C52.5089 218.027 52.9958 220.138 52.9958 222.426C52.9958 225.478 52.3845 228.27 51.162 230.802C49.9395 233.334 48.0954 235.367 45.6244 236.89C43.1535 238.419 40.1801 239.178 36.7094 239.178H0.567383V184.923ZM13.0205 206.251H34.8393C35.979 206.251 36.8855 205.871 37.5693 205.107C38.2479 204.342 38.5846 203.365 38.5846 202.164V200.609C38.5846 199.356 38.2582 198.363 37.6055 197.625C36.9528 196.892 36.0308 196.523 34.8393 196.523H13.0205V206.245V206.251ZM13.0205 227.656H36.7094C37.9008 227.656 38.8539 227.261 39.5584 226.471C40.263 225.681 40.6152 224.687 40.6152 223.486V221.932C40.6152 220.679 40.263 219.67 39.5584 218.906C38.8539 218.147 37.9008 217.762 36.7094 217.762H13.0205V227.651V227.656Z"
                  fill="white"
                />
                <path
                  d="M98.8243 184.922L120.234 239.178H106.802L101.59 225.857H79.0412L73.9129 239.178H60.6465L82.139 184.922H98.8295H98.8243ZM83.2734 214.335H97.3583L90.1941 197.016L83.2734 214.335Z"
                  fill="white"
                />
                <path
                  d="M154.583 220.054V239.172H142.208V220.054L120.312 184.922H134.64L148.481 207.883L161.996 184.922H176.485L154.589 220.054H154.583Z"
                  fill="white"
                />
                <path
                  d="M214.42 184.922L235.83 239.178H222.397L217.186 225.857H194.637L189.509 239.178H176.242L197.735 184.922H214.425H214.42ZM198.869 214.335H212.954L205.79 197.016L198.869 214.335Z"
                  fill="white"
                />
                <path
                  d="M246.412 184.922H283.616C287.087 184.922 290.045 185.687 292.49 187.21C294.935 188.739 296.763 190.766 297.986 193.299C299.208 195.831 299.82 198.597 299.82 201.592C299.82 205.46 298.763 208.865 296.644 211.803C294.525 214.746 291.516 216.597 287.61 217.361C287.719 217.528 287.838 217.689 287.978 217.85C288.112 218.016 288.237 218.235 288.345 218.505L300.721 239.178H286.636L273.939 217.772H258.876V239.178H246.422V184.922H246.412ZM258.865 206.25H283.616C284.807 206.25 285.735 205.871 286.382 205.106C287.035 204.342 287.361 203.364 287.361 202.163V200.609C287.361 199.356 287.035 198.363 286.382 197.624C285.73 196.891 284.807 196.522 283.616 196.522H258.865V206.245V206.25Z"
                  fill="white"
                />
                <path
                  d="M313.734 184.922H339.946C345.427 184.922 350.218 186.165 354.316 188.64C358.413 191.12 361.573 194.432 363.801 198.566C366.023 202.704 367.137 207.202 367.137 212.047C367.137 216.893 366.023 221.318 363.801 225.488C361.573 229.658 358.398 232.98 354.274 235.455C350.151 237.935 345.37 239.172 339.946 239.172H313.734V184.917V184.922ZM326.188 227.656H339.946C342.878 227.656 345.427 226.933 347.597 225.488C349.768 224.042 351.425 222.124 352.565 219.727C353.705 217.33 354.274 214.772 354.274 212.047C354.274 209.323 353.705 206.775 352.565 204.41C351.425 202.039 349.768 200.136 347.597 198.69C345.427 197.245 342.878 196.527 339.946 196.527H326.188V227.656Z"
                  fill="white"
                />
                <path
                  d="M73.4887 278.531H74.0171L82.6473 256.309H88.102L77.5603 283.434H69.8678L59.3262 256.309H64.8638L73.4939 278.531H73.4887Z"
                  fill="#59DF02"
                />
                <path
                  d="M109.47 283.434L106.823 276.488H94.2869L91.6813 283.434H86.2266L96.7682 256.309H104.461L115.002 283.434H109.465H109.47ZM105.072 271.627L100.472 260.349L96.0326 271.627H105.067H105.072Z"
                  fill="#59DF02"
                />
                <path
                  d="M135.924 262.679C134.541 261.483 132.883 260.88 130.956 260.88C129.433 260.88 128.071 261.27 126.864 262.044C125.657 262.819 124.714 263.89 124.036 265.252C123.357 266.614 123.015 268.153 123.015 269.869C123.015 271.585 123.357 273.082 124.036 274.445C124.714 275.807 125.657 276.878 126.864 277.653C128.071 278.427 129.433 278.817 130.956 278.817C132.883 278.817 134.536 278.219 135.924 277.018C137.307 275.817 138.214 274.237 138.654 272.277H144.15C143.824 274.564 143.057 276.592 141.85 278.365C140.643 280.138 139.094 281.511 137.209 282.493C135.323 283.476 133.241 283.965 130.962 283.965C128.439 283.965 126.16 283.362 124.124 282.15C122.088 280.939 120.492 279.254 119.342 277.107C118.187 274.954 117.612 272.547 117.612 269.874C117.612 267.202 118.187 264.795 119.342 262.642C120.498 260.49 122.088 258.8 124.124 257.573C126.16 256.346 128.439 255.732 130.962 255.732C133.241 255.732 135.323 256.221 137.209 257.204C139.094 258.186 140.643 259.559 141.85 261.332C143.057 263.105 143.824 265.133 144.15 267.42H138.654C138.219 265.46 137.307 263.88 135.924 262.679Z"
                  fill="#59DF02"
                />
                <path
                  d="M169.994 283.434L167.347 276.488H154.811L152.206 283.434H146.751L157.293 256.309H164.985L175.527 283.434H169.989H169.994ZM165.596 271.627L160.996 260.349L156.557 271.627H165.591H165.596Z"
                  fill="#59DF02"
                />
                <path
                  d="M201.495 256.304V261.166H191.197V283.429H186.069V261.166H175.771V256.304H201.495Z"
                  fill="#59DF02"
                />
                <path
                  d="M207.276 256.304H212.446V283.429H207.276V256.304Z"
                  fill="#59DF02"
                />
                <path
                  d="M225.225 282.145C223.19 280.934 221.594 279.249 220.444 277.102C219.289 274.949 218.714 272.542 218.714 269.869C218.714 267.197 219.289 264.79 220.444 262.637C221.599 260.484 223.19 258.795 225.225 257.568C227.261 256.341 229.54 255.727 232.063 255.727C234.586 255.727 236.865 256.341 238.901 257.568C240.937 258.795 242.532 260.484 243.682 262.637C244.837 264.79 245.412 267.197 245.412 269.869C245.412 272.542 244.832 274.949 243.682 277.102C242.527 279.254 240.937 280.934 238.901 282.145C236.865 283.356 234.586 283.96 232.063 283.96C229.54 283.96 227.261 283.356 225.225 282.145ZM225.142 274.445C225.821 275.807 226.764 276.878 227.971 277.653C229.178 278.427 230.54 278.817 232.063 278.817C233.586 278.817 234.954 278.427 236.176 277.653C237.399 276.878 238.352 275.807 239.046 274.445C239.74 273.082 240.082 271.559 240.082 269.869C240.082 268.18 239.735 266.615 239.046 265.252C238.357 263.89 237.399 262.819 236.176 262.044C234.954 261.27 233.586 260.88 232.063 260.88C230.54 260.88 229.178 261.27 227.971 262.044C226.764 262.819 225.821 263.89 225.142 265.252C224.464 266.615 224.122 268.154 224.122 269.869C224.122 271.585 224.464 273.082 225.142 274.445Z"
                  fill="#59DF02"
                />
                <path
                  d="M256.891 264.68V283.429H251.722V256.304H256.322L272.277 275.012V256.304H277.446V283.429H272.764L256.891 264.68Z"
                  fill="#59DF02"
                />
                <path
                  d="M300.893 261.675C299.67 260.978 298.059 260.635 296.049 260.635C293.879 260.635 292.221 260.947 291.081 261.576C289.942 262.205 289.372 263.105 289.372 264.275C289.372 265.283 289.916 266.011 290.998 266.459C292.081 266.906 293.858 267.129 296.329 267.129C300.535 267.129 303.597 267.769 305.508 269.048C307.42 270.332 308.378 272.36 308.378 275.136C308.378 277.913 307.326 280.216 305.223 281.713C303.12 283.211 300.059 283.96 296.044 283.96C293.604 283.96 291.449 283.601 289.595 282.878C287.735 282.155 286.29 281.142 285.259 279.836C284.228 278.531 283.71 277.018 283.71 275.303H288.838C288.838 276.446 289.507 277.367 290.833 278.058C292.159 278.755 293.899 279.098 296.044 279.098C298.349 279.098 300.126 278.755 301.379 278.079C302.628 277.398 303.25 276.415 303.25 275.136C303.25 274.05 302.659 273.259 301.478 272.765C300.297 272.277 298.416 272.027 295.842 272.027C291.77 272.027 288.823 271.414 286.989 270.186C285.155 268.959 284.244 266.989 284.244 264.264C284.244 261.54 285.248 259.367 287.258 257.911C289.268 256.455 292.195 255.727 296.049 255.727C298.38 255.727 300.447 256.091 302.234 256.809C304.027 257.531 305.41 258.55 306.389 259.871C307.363 261.192 307.855 262.71 307.855 264.426H302.726C302.726 263.282 302.115 262.361 300.893 261.67V261.675Z"
                  fill="#59DF02"
                />
              </g>
              <defs>
                <clipPath id="clip0_34_280">
                  <rect
                    width="366.569"
                    height="283.901"
                    fill="white"
                    transform="translate(0.567383 0.0643311)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="max-w-screen-c-md text-center text-white">
            At Bayard Vacations, we believe group travel is about more than just
            ticking off tourist spots – it’s about bonding, exploring new
            places, and sharing amazing experiences together.
          </p>
        </Container>
      </section>
      <section className="py-12 c-lg:py-16">
        <div className="grid gap-12">
          <Container className="relative c-lg:grid c-lg:min-h-[800px] c-lg:grid-cols-2 c-lg:gap-8 c-xxl:gap-16">
            {/* Sticky part start */}
            <div className="max-w-screen-c-sm c-lg:sticky c-lg:top-8 c-lg:h-fit c-lg:pt-40">
              <h2 className=" font-nord text-2xl font-bold uppercase !leading-[150%] text-brand-blue c-lg:text-4xl c-lg:!leading-[130%]">
                experience the magic of group departures
              </h2>
              <h4 className="mb-4 font-nord font-medium uppercase text-[#494949]">
                Shared Moments, Lasting Memories
              </h4>
              <Button
                variant="success"
                asChild
                className="rounded-full px-8 py-6"
              >
                <Link href="/categories/group-adventures">
                  <span>Explore All</span>
                  <span>
                    <ArrowUpRight className="!size-4" />
                  </span>
                </Link>
              </Button>
            </div>
            {/* Sticky part end */}

            {/* Cards section */}
            <div className="hidden space-y-8 py-4 c-lg:block c-xxl:space-y-16">
              {groupDepartureCardData.map((item) => (
                <GroupDepartureCard key={item.id} item={item} />
              ))}
            </div>
          </Container>

          {/* Mobile view */}
          <div className="grid gap-8 c-md:grid-cols-2 c-lg:hidden">
            {groupDepartureCardData.map((item) => (
              <GroupDepartureCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 c-lg:py-16">
        <Container>
          <div className="mb-8 text-center c-lg:mb-8">
            <h2 className="mb-4 items-center gap-8 font-nord text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#a1a1a1] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#a1a1a1] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
              <div>
                <span className="font-light">unbeatable</span>{" "}
                <span className="font-bold">services</span>
              </div>
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center c-md:flex-row c-md:flex-wrap c-md:gap-12 c-lg:gap-16 c-lg:py-8 c-xl:gap-24">
            {serviceData.map((item) => (
              <ServicesCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>
      <Container>
        <div className="h-px bg-[#D0D0D0]"></div>
      </Container>
      <section className="py-12">
        <Container>
          <div className="mb-8 grid justify-items-start gap-4 c-md:grid-cols-2 c-md:gap-12 c-lg:mb-12 c-xl:grid-cols-[1fr_1.5fr_1fr] c-xl:items-center">
            <h2 className="font-nord text-2xl font-bold uppercase !leading-[150%] text-brand-blue c-lg:text-3xl c-lg:!leading-[130%] ">
              Ready to Start Your Journey?
            </h2>
            <p className="">
              Bayard Vacations is dedicated to creating meaningful, memorable
              group travel experiences. Contact us today to begin planning your
              next adventure.
            </p>
            <Button
              variant="success"
              asChild
              className="rounded-full px-8 py-6 c-xl:justify-self-end"
            >
              <Link href="/categories/group-adventures">
                <span>Explore All</span>
                <span>
                  <ArrowUpRight className="!size-4" />
                </span>
              </Link>
            </Button>
          </div>
          <GroupDepartureSlider />
        </Container>
      </section>
    </>
  );
};

export default GroupDeparturePage;
