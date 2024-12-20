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
import { useState } from "react";

function Dashboard() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      amount,
      category,
      description,
      paymentMethod,
    });
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
            type="text"
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
            <SelectItem value="Cash" onSelect={() => setPaymentMethod("Cash")}>
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

        <Button className="w-full">Add Record</Button>
      </form>
    </div>
  );
}
export default Dashboard;
