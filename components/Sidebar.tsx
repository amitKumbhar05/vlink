"use client";
import { SidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="bg-dark-1 flex flex-col h-screen w-fit sticky left-0 top-0 text-white justify-between p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {SidebarLinks.map((link) => {
          const isActive =
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                height={24}
                width={24}
                src={link.imagUrl}
                alt={link.label}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
