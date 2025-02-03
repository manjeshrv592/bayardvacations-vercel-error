"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BsArrowRightCircle } from "react-icons/bs";

const ItineraryHotelDetails = ({ details }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full justify-between rounded-full bg-gradient-to-tr from-[#348901] to-[#46B301] p-6">
          <span>Click here to see hotel name and location details</span>
          <BsArrowRightCircle className="!size-6" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80vh] w-[calc(100%-32px)] max-w-screen-c-lg overflow-y-scroll !rounded-3xl px-8">
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: details || "<p>No details available</p>",
                }}
                className="mb-10"
              ></div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ItineraryHotelDetails;
