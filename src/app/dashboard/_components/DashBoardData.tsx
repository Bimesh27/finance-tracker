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
import { deleteExpenses, getExpanses } from "@/firebase/firebaseService";
import { LoaderCircle, LoaderIcon, Trash } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Records } from "@/types/type";

interface DashboardProps {
   userId: string;
   records: Records[];
   setRecords: React.Dispatch<SetStateAction<Records[]>>;
}

function DashBoardData({ userId, setRecords, records }: DashboardProps) {
   const [isLoading, setIsLoading] = useState(true);
   const [isDeleting, setIsDeleting] = useState(false);
   const [deletingId, setDeletingId] = useState("");

   useEffect(() => {
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
   }, [userId, setRecords]);


   const totalAmount = records.reduce((total, record) => {
      return total + (record.amount || 0); // Add item.amount if it exists, otherwise add 0
   }, 0);

   const handleDelete = async (expensesId: string) => {
      try {
         setIsDeleting(true);
         await deleteExpenses(expensesId);
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
         setIsDeleting(false);
         toast({
            description: "Record deleted successfully",
         });
      } catch (error) {
         toast({
            description: "Error deleting record" + error,
         });
      }
   };

   return (
      <div className="flex justify-center flex-col gap-2 overflow-hidden w-full">
         <h1 className="text-center font-bold"> Records </h1>
         {!isLoading ? (
            <Table className="w-[40rem] max-sm:w-[30rem] overflow-scroll max-h-[40rem] m-auto">
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
                        <TableRow key={record.description}>
                           <TableCell className="font-medium">
                              &#8377;{record.amount}
                           </TableCell>
                           <TableCell>{record.category}</TableCell>
                           <TableCell>{record.description}</TableCell>
                           <TableCell className="text-right">
                              {record.paymentMethod}
                           </TableCell>
                           <TableCell>
                              {isDeleting && record.id === deletingId ? (
                                 <LoaderCircle className="animate-spin text-red-600 size-[1rem] mx-4 " />
                              ) : (
                                 <Trash
                                    className="mx-4 size-[1rem] text-red-600 cursor-pointer"
                                    onClick={() => {
                                       handleDelete(record?.id);
                                       setDeletingId(record.id);
                                    }}
                                 />
                              )}
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
                     <TableCell colSpan={3}>&#8377;{totalAmount}</TableCell>
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
