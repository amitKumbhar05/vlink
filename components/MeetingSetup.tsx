"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function MeetingSetup({
  setIsSetupCompleted,
}: {
  setIsSetupCompleted: (value: boolean) => void;
}) {
  // States
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  // hooks

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be use within streamCall component !");
  }

  // useEffect

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  // functions

  // renders

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center text-white gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview className="h-[300px] w-[300px]" />
      <div className="flex h-16 gap-3 items-center justify-center">
        <label className="flex justify-center items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={() => setIsMicCamToggledOn(!isMicCamToggledOn)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="bg-green-500 px-4 py-2.5 rounded"
        onClick={() => {
          call.join();
          setIsSetupCompleted(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
}

export default MeetingSetup;
