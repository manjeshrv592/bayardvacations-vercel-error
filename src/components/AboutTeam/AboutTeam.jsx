// /components/AboutTeam/AboutTeam.tsx
import Image from "next/image";
import Container from "../ui/Container";

export default function AboutTeam() {
  return (
    <Container>
      <div className="section-header-margin relative aspect-[2.5/1] w-full overflow-hidden rounded-3xl">
        <Image
          src="/media/about_team.png"
          alt="Our team at Bayard Vacations"
          fill
          sizes="(max-width: 768px) 100vw, 1300px"
          priority
          className="object-cover"
        />
      </div>

      {/* Text content */}
      <div className="w-full max-w-[1050px] px-4 md:px-0">
        <div className="grid grid-cols-1 gap-5 text-white md:gap-10 lg:grid-cols-[25%_75%]">
          {/* Hello text */}
          <h1 className="font-nord text-3xl font-bold text-[#59df02] md:pr-3  md:text-4xl lg:text-right">
            Hello!
          </h1>

          {/* Description text */}
          <div className="flex flex-col items-center md:flex-row md:items-start">
            {/* Vertical line - hidden on mobile */}
            <div className="hidden h-[140px] border-l-2 border-[#59df02] pr-5 md:block"></div>

            {/* Text content */}
            <p className="text-lg leading-7 md:text-xl">
              We take pride in addressing ourselves as{" "}
              <b>&apos;Travel Gurus&apos;</b>. We&apos;re a group of passionate
              travellers, adventure seekers, and cultural enthusiasts working
              towards making your experiences the most treasured ones. With a
              diverse range of backgrounds and experiences, we promise you a
              unique craft in every trip we plan.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
