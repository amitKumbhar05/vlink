import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { UserButton, SignedIn} from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className="w-full flex-between fixed bg-dark-1 px-6 py-4 lg:px-10 z-50">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/icons/logo.svg"}
          height={32}
          width={32}
          alt="vlink Logo"
          className="max-sm:size-10"
        />
        <p className="text-[24px] font-extrabold text-white max-sm:hidden ">
          vlink
        </p>
      </Link>
      <div className="flex-between gap-6">
        {/* {Cleark} */}
        <SignedIn>
              <UserButton />
            </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
