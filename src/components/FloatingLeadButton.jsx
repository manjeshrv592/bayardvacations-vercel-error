import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useModal } from "@/contexts/leadContext";

const FloatingLeadButton = () => {
  const { openModal, isOpen } = useModal();

  return (
    <>
      {!isOpen && (
        <Button
          onClick={openModal}
          className="fixed bottom-4 right-4 z-[200] flex aspect-square size-16 items-center justify-center rounded-[50%] bg-brand-green p-0 hover:bg-brand-green-hovered"
        >
          <MessageSquare className="!size-6" />
        </Button>
      )}
    </>
  );
};

export default FloatingLeadButton;
