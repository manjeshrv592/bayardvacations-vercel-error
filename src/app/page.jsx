import React from "react";
import Container from "@/components/ui/Container";
import Trending from "@/components/ui/Trending";
import Image from "next/image";
import { Categories } from "@/components/Categories";
import WhyBayard from "@/components/WhyBayard/WhyBayard";
import { AboutTeam } from "@/components/AboutTeam";
import Testimonials from "@/components/Testimonials/Testimonials";
import TimedCardSlider from "@/components/TimedCardSlider/TimedCardSlider";
import DealsSlider from "@/components/ui/sliders/DealsSlider";
import PackageCardsSlider from "@/components/ui/sliders/PackageCardsSlider";
// import { Button } from "@/components/ui/button";
// import { signOut } from "firebase/auth";
// import { auth } from "@/firebase/firebaseConfig";
// import Link from "next/link";
// import { useAuth } from "@/contexts/AuthContext";

export const metadata = {
  title: "Bayard Vacations | Customized Travel Packages for Every Explorer",
  description:
    "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions, we craft journeys that cater to your unique interests.",
  keywords:
    "Customized travel packages, romantic getaways, group adventures, family vacations, solo expeditions, cultural tours, adventure travel",
};

const HomePage = () => {
  // const { user } = useAuth();

  return (
    <>
      <section>
        <TimedCardSlider />
      </section>
      {/* <section className="pt-32">
        <Container>
          {user ? (
            <h2>Welcome to the app as a logged in User. {user?.uid}</h2>
          ) : (
            <h2>You are not logged in</h2>
          )}

          {user ? (
            <Button onClick={() => signOut(auth)}>Sign Out</Button>
          ) : (
            <Button asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </Container>
      </section> */}
      <section className="section-padding !pt-24">
        <Container>
          <h2 className="section-header-margin items-center gap-8 text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#9E9E9E] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#9E9E9E] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
            <div className="flex flex-col text-center font-nord">
              <span className="text-xl font-light text-[#798290]">
                catch the wave
              </span>
              <span className="text-4xl font-bold ">trending</span>
              <span className="text-xl font-light text-[#798290]">
                travel spots worldwide
              </span>
            </div>
          </h2>
          <Trending />
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <div>
            <h2 className="section-header-margin items-center gap-8 text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#798290] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#798290] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
              <div className=" text-center font-nord">
                <span className="text-4xl font-light text-[#798290]">
                  Irresistible
                </span>{" "}
                <span className="text-4xl font-bold ">deals</span>
              </div>
            </h2>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <DealsSlider />
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <PackageCardsSlider packageType={"international"} />
      </section>
      <section className="section-padding">
        <PackageCardsSlider packageType={"domestic"} />
      </section>

      <section className="section-padding bg-[#F1F5FC]">
        <Categories />
      </section>
      <section className="section-padding">
        <WhyBayard />
      </section>
      <section className="section-padding bg-brand-blue">
        <AboutTeam />
      </section>
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-20">
          <Image src="/img/testimonial-bg.jpg" alt="Pattern image" fill />
        </div>
        <Testimonials />
      </section>
    </>
  );
};

export default HomePage;
