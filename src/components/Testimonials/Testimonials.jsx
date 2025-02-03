import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCardsDemo";
import Container from "../ui/Container";

const Testimonials = () => {
  return (
    <Container className="relative z-10">
      <div className="grid gap-8 lg:grid-cols-[max-content_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-center font-nord text-3xl font-bold text-brand-blue lg:text-left lg:text-4xl">
            Here’s what our <br /> customers say
          </p>
        </div>
        <InfiniteMovingCardsDemo />
      </div>
    </Container>
  );
};

export default Testimonials;
