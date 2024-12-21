"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addExpanses } from "@/firebase/firebaseService";
import { toast } from "@/hooks/use-toast";
import { useUserId } from "@/hooks/useUserId";
import React, { useEffect, useState } from "react";

function Dashboard() {
   const [amount, setAmount] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");
   const [paymentMethod, setPaymentMethod] = useState("Cash");
   const [isMounted, setIsMounted] = useState(false);
   const {userId, isLoaded} = useUserId();
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
         return toast({
            description: "Please fill in all fields",
            duration: 2000,
         });
      }

      if (!amount || isNaN(Number(amount))) {
         console.log("Invalid amount");
         return toast({
            description: "Amount must be a valid number",
            duration: 2000,
         });
      }

      try {
         if (!userId) {
            throw new Error("user is is required");
         }

         await addExpanses(
            userId,
            parseFloat(amount),
            category,
            description,
            paymentMethod
         );

         setAmount("");
         setCategory("");
         setDescription("");
         setPaymentMethod("Cash");

         toast({
            description: "Record added successfully",
            duration: 2000
         });
      } catch (error) {
         toast({
            description: "Error while adding record" + error,
            duration:2000
         });
      }
   };

   return (
      <div className="w-full min-h-[calc(100vh - 4rem)] flex justify-center">
         <form
            className="mt-10 flex flex-col items-center gap-6"
            onSubmit={handleSubmit}
         >
            <div className="flex flex-col w-[25rem] space-y-2 max-sm:w-[22rem]">
               <Label htmlFor="amount">Amount</Label>
               <Input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                     setAmount(e.target.value);
                  }}
               />
            </div>
            <div className="flex flex-col w-[25rem] space-y-2 max-sm:w-[22rem]">
               <Label htmlFor="amount">Category</Label>
               <Input
                  type="text"
                  id="amount"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => {
                     setCategory(e.target.value);
                  }}
               />
            </div>
            <div className="flex flex-col w-[25rem] space-y-2 max-sm:w-[22rem]">
               <Label htmlFor="description">Description</Label>
               <Textarea
                  placeholder="Enter your description"
                  id="description"
                  value={description}
                  onChange={(e) => {
                     setDescription(e.target.value);
                  }}
               />
            </div>
            <Select>
               <SelectTrigger className="w-ful max-sm:w-[22rem]">
                  <SelectValue placeholder="Payment method" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem
                     value="Cash"
                     onSelect={() => setPaymentMethod("Cash")}
                  >
                     Cash
                  </SelectItem>
                  <SelectItem
                     value="Online"
                     onSelect={() => setPaymentMethod("Online")}
                  >
                     Online
                  </SelectItem>
               </SelectContent>
            </Select>

            <Button className="w-full" type="submit">
               Add Record
            </Button>
         </form>
      </div>
   );
}
export default Dashboard;
