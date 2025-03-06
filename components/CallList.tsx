"use client";
import { useGetCall } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function CallList({ type }: { type: "ended" | "upcoming" | "recording" }) {
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { isLoading, callRecordings, endedCalls, upcomingCalls } = useGetCall();
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return recordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No ended calls";
      case "upcoming":
        return "No upcoming calls";
      case "recording":
        return "No recording";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast.error("try agin later");
      }
    };
    if (type === "recording") fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard
            key={index || uuidv4()}
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time.toLocaleString()
            }
            icon={
              type === "recording"
                ? "/icons/recordings.svg"
                : type === "ended"
                ? "/icons/previous.svg"
                : "/icons/upcoming.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 20) ||
              (meeting as CallRecording)?.filename?.substring(0, 26) ||
              "Personal meeting"
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recording" ? "/icons/play.svg" : undefined}
            buttonText={type === "recording" ? "Play" : "Start"}
            link={
              type === "recording"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            handleClick={
              type === "recording"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
}

export default CallList;
