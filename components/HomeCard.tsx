import Image from "next/image";
import React from "react";

function HomeCard(props: {
  img: string;
  className: string;
  title: string;
  Description: string;
  handleClick: () => void;
}) {
  return (
    <div
      className={`${props.className} px-4 py-6 flex flex-col justify-between w-full min-h-[260px] xl:max-w-[270px] rounded-[14px] cursor-pointer `}
      onClick={props.handleClick}
    >
      <div className="flex-center glassmorphism size-10 rounded-[10px]">
        <Image src={props.img} alt="add-meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <p className="text-lg font-normal">{props.Description}</p>
      </div>
    </div>
  );
}

export default HomeCard;
