import { useState, useEffect } from "react";
import { H3 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RatingLabel from "@/components/RatingLabel";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "@/contexts/leadContext";
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const ratingMap = {
  threestar: 3,
  fourstar: 4,
  fivestar: 5,
};

const convertAndSortHotels = (hotelCharges) => {
  // Define the desired order
  const desiredOrder = ["threestar", "fourstar", "fivestar"];

  // Convert to array
  const hotelArray = Object.entries(hotelCharges).map(([type, details]) => ({
    type,
    ...details,
  }));

  // Sort based on the desired order
  return hotelArray.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.type);
    const indexB = desiredOrder.indexOf(b.type);
    return indexA - indexB;
  });
};

const BookNowForm = ({ packageData }) => {
  const { openModal } = useModal();
  const pathname = usePathname();

  const hotels = convertAndSortHotels(packageData.hotelCharges);
  const initialHotel = hotels.filter((hotel) => hotel.isBase)[0];

  const [selectedHotel, setSelectedHotel] = useState(initialHotel);

  useEffect(() => {
    localStorage.setItem(
      "selectedPackage",
      `/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`
    );
  }, [packageData.packageSlug, selectedHotel?.type]);

  const handleValueChange = (value) => {
    setSelectedHotel(hotels.filter((hotel) => hotel.type === value)[0]);
  };

  const copyCurrentUrl = async () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      // Optional: Add some visual feedback
      // You could set a state to show a tooltip or change button text temporarily

      toast("Success", {
        description: "Link Copied to Clipboard",
      });
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <>
      {/* Form start */}

      <div className="self-start rounded-3xl bg-brand-blue p-6 text-white">
        <div className="mb-6">
          <p className="mb-4 text-xl">Hotel Type</p>

          <RadioGroup
            onValueChange={handleValueChange}
            defaultValue="3-star"
            className="flex  flex-col items-start gap-4 c-lg:flex-row"
          >
            {hotels.map(
              (hotel) =>
                hotel.isAvailable && (
                  <div className="flex items-center space-x-2" key={uuidv4()}>
                    <RadioGroupItem
                      className="hidden"
                      value={hotel.type}
                      id={hotel.type}
                    />
                    <Label
                      htmlFor={hotel.type}
                      className="flex cursor-pointer flex-col gap-2"
                    >
                      <RatingLabel
                        value={hotel.type}
                        rating={ratingMap[hotel.type]}
                        selectedHotel={selectedHotel}
                      />
                      {hotel.additionalCharge > 0 && (
                        <span className="text-xs">
                          +
                          {new Intl.NumberFormat("en-IN").format(
                            hotel.additionalCharge
                          )}
                        </span>
                      )}
                    </Label>
                  </div>
                )
            )}
          </RadioGroup>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 c-lg:flex-row">
            <H3>
              <span className="mr-2 font-light">Rs.</span>
              <span className="text-3xl c-lg:text-4xl">
                {new Intl.NumberFormat("en-IN").format(
                  packageData.basePrice + selectedHotel.additionalCharge
                )}
              </span>
            </H3>
            <span className="text-4xl opacity-50">/</span>
            <div className="flex flex-col">
              <span className="text-sm opacity-50">Price Per Person</span>
              {/* <span className="text-xs opacity-50">Inclusive of all taxes</span> */}
            </div>
          </div>
        </div>
        <Button
          onClick={openModal}
          variant="outline"
          className="mb-4 w-full border border-white py-6 text-lg font-bold hover:bg-white hover:text-brand-green c-md:text-xl"
          size="lg"
        >
          Request a Call back
        </Button>
        <Button
          variant="success"
          className="mb-2 w-full bg-brand-green py-6 text-lg font-bold c-md:text-xl"
          size="lg"
          asChild
        >
          <Link
            href={`/checkout/${packageData.packageSlug}?hotel=${selectedHotel?.type}`}
          >
            Book Now
          </Link>
        </Button>
        {/* <div className="text-center">
          <Link href="#" className="text-sm underline">
            EMI options available
          </Link>
        </div> */}
      </div>
      <div className="text-center">
        <Button
          type="button"
          onClick={copyCurrentUrl}
          className="mt-4 bg-transparent !p-0 text-xs text-[#636363] shadow-none transition-all duration-300 hover:bg-transparent hover:text-brand-blue"
        >
          <span> Share or copy package link:</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-[#ededed]">
            <Share2 />
          </span>
        </Button>
      </div>

      {/* Form end */}
    </>
  );
};

export default BookNowForm;
