"use client";

import { Activity } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) return null;

   return (
      <header className="w-full h-16 border flex items-center justify-between px-10">
         <Link href={"/"}>
            <Activity />
         </Link>
         <div className="flex items-center gap-4">
            <ModeToggle />
            <SignedOut>
               <SignInButton>
                  <Button className="px-4 py-2 rounded-lg text-sm transition-all">
                     Sign in
                  </Button>
               </SignInButton>
            </SignedOut>
            <SignedIn>
               <UserButton />
            </SignedIn>
         </div>
      </header>
   );
}
export default Header;
