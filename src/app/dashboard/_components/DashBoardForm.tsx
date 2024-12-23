import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}

function DashBoardForm({
   handleSubmit,
   amount,
   category,
   description,
   setAmount,
   setCategory,
   setDescription,
   isLoading,
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

         <Button className="w-full" type="submit">
            {isLoading ? (
               <span className="flex  items-center gap-2">
                  Adding... <Loader2Icon className="animate-spin" />
               </span>
            ) : (
               "Add Record"
            )}
         </Button>
      </form>
   );
}
export default DashBoardForm;
