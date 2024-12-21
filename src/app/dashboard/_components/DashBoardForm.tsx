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
import { Loader2Icon } from "lucide-react";

interface DashboardProps {
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
   isLoading: boolean;
   amount: string;
   category: string;
   description: string;
   setAmount: React.Dispatch<React.SetStateAction<string>>;
   setCategory: React.Dispatch<React.SetStateAction<string>>;
   setDescription: React.Dispatch<React.SetStateAction<string>>;
   setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}

function DashBoardForm({
   handleSubmit,
   amount,
   category,
   description,
   setAmount,
   setCategory,
   setDescription,
   setPaymentMethod,
   isLoading
}: DashboardProps) {
   return (
      <form
         className="mt-10 flex flex-col items-center gap-6 max-w-[25rem] relative"
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
            <SelectTrigger className="w-[25rem] max-sm:w-[22rem]">
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
            {isLoading ? <span className="flex  items-center gap-2">
               Adding... <Loader2Icon className="animate-spin"/>
            </span>: "Add Record"}
         </Button>
      </form>
   );
}
export default DashBoardForm;
