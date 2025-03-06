"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function MobileNav() {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            height={36}
            width={36}
            alt="Hamburger"
            className="cursor-pointer sm:hidden "
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-dark-1 border-none">
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src={"/icons/logo.svg"}
              height={32}
              width={32}
              alt="vlink Logo"
              className="max-sm:size-10"
            />
            <p className="text-[24px] font-extrabold text-white">vlink</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col text-white h-full pt-16 gap-6 ">
                {SidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);
                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          height={20}
                          width={20}
                          src={link.imagUrl}
                          alt={link.label}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
