import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { getExpanses } from "@/firebase/firebaseService";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Records {
   userId: string;
   amount: number;
   category: string;
   description: string;
   paymentMethod: string;
   date: Date;
}

function DashBoardData({ userId }: { userId: string }) {
   const [records, setRecords] = useState<Records[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getExpanses(userId);
         console.log("data", data);

         setRecords(
            data?.map((doc) => ({
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
   }, [userId]);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) return null;

   const totalAmount = records.reduce((total, record) => {
      return total + (record.amount || 0); // Add item.amount if it exists, otherwise add 0
   }, 0);

   return (
      <div className="flex justify-center flex-col gap-2 overflow-hidden w-full">
         <h1 className="text-center font-bold"> Records </h1>
         {!isLoading ? (
            <Table className="w-[40rem] max-sm:w-[30rem] overflow-scroll max-h-[40rem]">
               <TableCaption>A list of your recent transactions.</TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-[100px]">Amount</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Descripton</TableHead>
                     <TableHead className="text-right">Method</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {records ? (
                     records.map((record) => (
                        <TableRow key={record.amount}>
                           <TableCell className="font-medium">
                              &#8377;{record.amount}
                           </TableCell>
                           <TableCell>{record.category}</TableCell>
                           <TableCell>{record.description}</TableCell>
                           <TableCell className="text-right">
                              {record.paymentMethod}
                           </TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <h1>No record found</h1>
                  )}
               </TableBody>
               <TableFooter>
                  <TableRow className="text-center">
                     <TableCell colSpan={2}>Total Spend: </TableCell>
                     <TableCell>&#8377;{totalAmount}</TableCell>
                  </TableRow>
               </TableFooter>
            </Table>
         ) : (
            <div className="flex gap-1 w-full justify-center">
               Getting Records
               <LoaderIcon className="animate-spin" />
            </div>
         )}
      </div>
   );
}
export default DashBoardData;
