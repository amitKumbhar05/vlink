import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

function MeetingRoom() {
  // types
  type callLayoutTypes = "grid" | "speaker-left" | "speaker-right";

  // States
  const [layout, setLayout] = useState<callLayoutTypes>("speaker-left");
  const [showParticipents, setShowParticipents] = useState(false);

  // Hooks
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const { useCallCallingState } = useCallStateHooks();
  const router = useRouter();
  // useEffect

  // functions

  //   render
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
        break;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />;
        break;
      default:
        return <SpeakerLayout participantsBarPosition={"left"} />;
        break;
    }
  };

  // render
  return (
    <section className="h-screen w-full relative text-white pt-4 overflow-hidden">
      <div className="relative flex justify-center items-center size-full">
        <div className="flex items-center max-w-[1000px] size-full">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] ml-2 hidden", {
            "show-block": showParticipents,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipents(false)} />
        </div>
      </div>
      <div className="flex bottom-0 fixed w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["grid", "speaker-left", "speaker-right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as callLayoutTypes)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipents((prev) => !prev)}>
          <div className="cursor-pointer rounded bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
}

export default MeetingRoom;
