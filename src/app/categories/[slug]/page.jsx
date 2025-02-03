import React from "react";
import Container from "@/components/ui/Container";
import CategorySlider from "@/components/ui/sliders/CategorySlider";
import TourToggleSwitch from "@/components/ui/TourToggleSwitch";
import ExplorationList from "@/components/ui/ExplorationList";

const themeMap = {
  "romantic-getaways": {
    title: "Romantic Getaways",
    metaTitle: "Romantic Getaways | Bayard Vacations",
    metaDescription:
      "Plan the perfect romantic escape with Bayard Vacations. Explore dreamy destinations, luxurious accommodations, and personalized itineraries designed to create unforgettable moments for you and your loved one.",
    metaKeyword:
      "romantic getaways, couples vacations, romantic escapes, honeymoon destinations, anniversary trips, luxurious couples travel, Bayard Vacations romantic trips",
  },
  "group-adventures": {
    title: "Group Adventures",
    metaTitle: "Group Adventures | Bayard Vacations",
    metaDescription:
      "Embark on thrilling group adventures with Bayard Vacations! Discover exciting destinations, action-packed itineraries, and unforgettable experiences tailored for friends, families, or colleagues.",
    metaKeyword:
      "group adventures, group travel packages, adventure trips, team travel, family adventures, friends' getaways, Bayard Vacations group trips",
  },
  "family-funventure": {
    title: "Family Funventures",
    metaTitle: "Family Funventures | Bayard Vacations",
    metaDescription:
      "Create lasting memories with Bayard Vacations' Family Funventures! Explore kid-friendly destinations, exciting activities, and stress-free itineraries designed for the whole family to enjoy.",
    metaKeyword:
      "family funventures, family vacations, kid-friendly travel, family travel packages, adventure trips for families, stress-free family getaways, Bayard Vacations family trips",
  },
  educational: {
    title: "Educational",
    metaTitle: "Educational Trips | Bayard Vacations",
    metaDescription:
      "Combine learning and adventure with Bayard Vacations' educational trips! Explore historical landmarks, cultural experiences, and immersive activities designed to inspire curiosity and discovery.",
    metaKeyword:
      "educational trips, cultural travel, learning vacations, educational travel experiences, historical tours, immersive travel, Bayard Vacations educational packages",
  },
  "religious-retreat": {
    title: "Religious Retreat",
    metaTitle: "Religious Retreats | Bayard Vacations",
    metaDescription:
      "Reconnect with your faith and find spiritual renewal with Bayard Vacations' religious retreats. Explore serene destinations, sacred sites, and meaningful experiences designed for reflection and growth.",
    metaKeyword:
      "religious retreats, faith-based travel, spiritual journeys, sacred site tours, spiritual renewal, religious travel packages, Bayard Vacations religious trips",
  },
  "solo-expedition": {
    title: "Solo Expedition",
    metaTitle: "Solo Expeditions | Bayard Vacations",
    metaDescription:
      "Embark on a journey of self-discovery with Bayard Vacations' solo expeditions. Explore incredible destinations, personalized itineraries, and unique experiences designed for independent travelers.",
    metaKeyword:
      "solo expeditions, solo travel, independent traveler packages, solo adventures, personalized travel for one, self-discovery trips, Bayard Vacations solo journeys",
  },
  "exploration-bundle": {
    title: "Exploration Bundle",
    metaTitle: "Exploration Bundles | Bayard Vacations",
    metaDescription:
      "Discover the world with Bayard Vacations' Exploration Bundles! Enjoy curated travel packages featuring diverse destinations, immersive experiences, and seamless itineraries for adventurers and explorers",
    metaKeyword:
      "exploration bundles, curated travel packages, adventure travel, exploration trips, immersive travel experiences, Bayard Vacations exploration, travel bundles",
  },
  "relax-rejuvenate": {
    title: "Relax & Rejuvenate",
    metaTitle: "Relax & Rejuvenate | Bayard Vacations",
    metaDescription:
      "Unwind and recharge with Bayard Vacations' Relax & Rejuvenate packages. Explore tranquil destinations, luxurious spa retreats, and wellness-focused itineraries designed for ultimate relaxation.",
    metaKeyword:
      "relax and rejuvenate, wellness travel, spa retreats, relaxation vacations, luxury wellness trips, stress-free getaways, Bayard Vacations wellness packages",
  },
  "elite-escape": {
    title: "Elite Escape",
    metaTitle: "Elite Escape | Bayard Vacations",
    metaDescription:
      "Indulge in the luxury of an Elite Escape with Bayard Vacations. Discover exclusive destinations, five-star accommodations, and personalized experiences designed for the discerning traveler seeking the best.",
    metaKeyword:
      "elite escape, luxury travel, exclusive destinations, five-star vacations, luxury getaways, premium travel packages, Bayard Vacations elite trips",
  },
};

export const generateMetadata = ({ params }) => {
  const theme = params.slug;
  return {
    title: themeMap[theme].metaTitle,
    description: themeMap[theme].metaDescription,
    keywords: themeMap[theme].metaKeyword,
  };
};

const SingleCategoryPage = ({ params }) => {
  const theme = params.slug;

  return (
    <>
      <section className="inner-page-padding">
        <Container>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <h1 className="text-4xl  font-bold text-brand-blue lg:text-6xl">
              {themeMap[theme].title}
            </h1>
            <TourToggleSwitch />
          </div>
        </Container>
      </section>
      <section className="pt-12">
        <Container>
          <CategorySlider />
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 gap-8 c-sm:grid-cols-2 c-lg:grid-cols-3">
            <ExplorationList theme={theme} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default SingleCategoryPage;
