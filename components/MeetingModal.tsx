import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface meetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  handleClick?: () => void;
  buttonText?: string;
  className?: string;
  image?: string;
  buttonIcon?: string;
  children?: React.ReactNode;
}

function MeetingModal({
  isOpen,
  onClose,
  title,
  className,
  handleClick,
  buttonText,
  image,
  buttonIcon,
  children,
}: meetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-full max-w-[520px] gap-6 border-none text-white bg-dark-1 px-6 py-9">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" height={72} width={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-1 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="image" height={13} width={13} />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule a meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;
