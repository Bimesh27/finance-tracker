"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="flex flex-col m-6 max-w-4xl max-h-[calc(100vh-4rem)]">
      <h1 className="text-left text-[4rem] font-extrabold uppercase lg:text-[5rem]">
        Track Your Daily <br /> Expenses
      </h1>
      <p className="text-sm font-medium">
        Stay on top of your financial goals with our intuitive finance tracking
        app. Easily log your daily expenses, categorize them, and visualize your
        spending habits. With a clean and user-friendly interface.
      </p>
      <Button className="mt-10 rounded-none max-w-40">
        <Link href={"/dashboard"}>Try for free</Link>
        <ArrowRight />
      </Button>
    </main>
  );
}
