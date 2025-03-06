import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <section className="flex flex-col gap-10 text-white size-full">
      <div className="w-full h-[300px] bg-hero bg-cover rounded-[20px] ">
        <div className="flex flex-col h-full justify-between lg:p-11 max-md:px-5 max-md:py-8 gap-10 size-full ">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting At 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extralight lg:text-7xl">{time}</h1>
            <p className="text-lg text-sky-1 font-medium lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
