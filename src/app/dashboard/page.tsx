"use client";

import { addExpanses, getExpanses } from "@/firebase/firebaseService";
import { toast } from "@/hooks/use-toast";
import { useUserId } from "@/hooks/useUserId";
import React, { useEffect, useState } from "react";
import DashBoardForm from "./_components/DashBoardForm";
import DashBoardData from "./_components/DashBoardData";
import { Records } from "@/types/type";

function Dashboard() {
   const [amount, setAmount] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");
   const [paymentMethod, setPaymentMethod] = useState("");
   const [isMounted, setIsMounted] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const { userId, isLoaded } = useUserId();
   const [records, setRecords] = useState<Records[]>([]);
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
         const fetchData = async () => {
            const data = await getExpanses(userId);
            console.log("data", data);

            setRecords(
               data?.map((doc) => ({
                  id: doc.id,
                  userId: doc.userId,
                  amount: doc.amount,
                  category: doc.category,
                  description: doc.description,
                  paymentMethod: doc.paymentMethod,
                  date: doc.date,
               })) || []
            );
         };

         fetchData();
         setIsLoading(false);

         setAmount("");
         setCategory("");
         setDescription("");
         setPaymentMethod("");

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
         <div className="flex flex-col gap-6 w-full items-center mb-10">
            <DashBoardForm
               handleSubmit={handleSubmit}
               amount={amount}
               category={category}
               description={description}
               paymentMethod={paymentMethod}
               setAmount={setAmount}
               setCategory={setCategory}
               setDescription={setDescription}
               setPaymentMethod={setPaymentMethod}
               isLoading={isLoading}
            />
            <hr />
            <DashBoardData
               userId={userId}
               setRecords={setRecords}
               records={records}
            />
         </div>
      </div>
   );
}
export default Dashboard;
