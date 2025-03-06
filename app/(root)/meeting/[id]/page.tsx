"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // states
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);

  // hooks
  // const { id } = await params;
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(callId);

  // useEffect

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setCallId(id);
    };
    getId();
  }, [params]);

  // functions

  // render

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
