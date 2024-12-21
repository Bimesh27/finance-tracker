"use client";

import { addExpanses } from "@/firebase/firebaseService";
import { toast } from "@/hooks/use-toast";
import { useUserId } from "@/hooks/useUserId";
import React, { useEffect, useState } from "react";
import DashBoardForm from "./_components/DashBoardForm";

function Dashboard() {
   const [amount, setAmount] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");
   const [paymentMethod, setPaymentMethod] = useState("Cash");
   const [isMounted, setIsMounted] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const { userId, isLoaded } = useUserId();
   console.log(userId, typeof userId);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   if (!userId || !isLoaded) {
      return null;
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userId || !amount || !category || !description || !paymentMethod) {
         toast({
            description: "Please fill in all fields",
            duration: 2000,
         });
         return;
      }

      if (!amount || isNaN(Number(amount))) {
         console.log("Invalid amount");
         toast({
            description: "Amount must be a valid number",
            duration: 2000,
         });
         return;
      }

      try {
         setIsLoading(true);
         if (!userId) {
            toast({
               description: "User id is requied",
            });
            return;
         }

         await addExpanses(
            userId,
            parseFloat(amount),
            category,
            description,
            paymentMethod
         );
         setIsLoading(false);

         setAmount("");
         setCategory("");
         setDescription("");
         setPaymentMethod("Cash");

         toast({
            description: "Record added successfully",
            duration: 2000,
         });

         return;
      } catch (error) {
         toast({
            description: "Error while adding record" + error,
            duration: 2000,
         });
      }
   };

   return (
      <div className="w-full min-h-[calc(100vh - 4rem)] flex justify-center">
         <DashBoardForm
            handleSubmit={handleSubmit}
            amount={amount}
            category={category}
            description={description}
            setAmount={setAmount}
            setCategory={setCategory}
            setDescription={setDescription}
            setPaymentMethod={setPaymentMethod}
            isLoading={isLoading}
         />
      </div>
   );
}
export default Dashboard;
