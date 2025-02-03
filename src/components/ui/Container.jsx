import { cn } from "@/lib/utils";

const Container = ({ className, children }) => {
  return (
    <div
      className={cn(
        "px-5 w-full max-w-full mx-auto c-sm:max-w-[calc(100vw-70px)] c-md:max-w-[calc(100vw-100px)] c-lg:max-w-[calc(100vw-140px)] c-xxl:max-w-[1280px] c-xxxl:max-w-[1400px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
