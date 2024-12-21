"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const ClientClerkProvider = ({ children }: { children: React.ReactNode }) => {
   return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClientClerkProvider;
