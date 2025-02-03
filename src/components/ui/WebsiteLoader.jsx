"use client";
import React from "react";
import Lottie from "lottie-react";
import WebsiteLoaderData from "@/animations/BV_Loading.json";

const WebsiteLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="max-h-96 max-w-96">
        <Lottie animationData={WebsiteLoaderData} loop={true} />
      </div>
    </div>
  );
};

export default WebsiteLoader;
