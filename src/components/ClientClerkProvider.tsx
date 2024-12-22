"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";


const ClientClerkProvider = ({ children }: { children: React.ReactNode }) => {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   },[]);

   if(!isMounted) return null;
   
   return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClientClerkProvider;
