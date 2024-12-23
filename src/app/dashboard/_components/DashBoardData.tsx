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
import {
   deleteExpenses,
   getExpanses,
   updateExpenses,
} from "@/firebase/firebaseService";
import { LoaderCircle, LoaderIcon, Trash } from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Records } from "@/types/type";

interface DashboardProps {
   userId: string;
   records: Records[];
   setRecords: React.Dispatch<SetStateAction<Records[]>>;
}

function DashBoardData({ userId, setRecords, records }: DashboardProps) {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isDeleting, setIsDeleting] = useState<boolean>(false);
   const [deletingId, setDeletingId] = useState<string | undefined>("");
   const [editingRecords, setEditingRecords] = useState<Records | null>(null);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const data = await getExpanses(userId);

         setRecords(
            data?.map((doc) => ({
               id: doc.id,
               userId: doc.userId,
               amount: doc.amount,
               category: doc.category,
               description: doc.description,
               date: doc.date,
            })) || []
         );
      };

      fetchData();
      setIsLoading(false);
   }, [userId, setRecords]);

   useEffect(() => {
      setIsMounted(true);
   }, []);

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

   const handleBlur = async (recordId: string) => {
      if (editingRecords) {
         try {
            await updateExpenses(recordId, editingRecords);

            setRecords((prev) =>
               prev.map((record) =>
                  record.id === recordId
                     ? {
                          ...record,
                          ...editingRecords,
                       }
                     : record
               )
            );
            setEditingRecords(null);
         } catch (error) {
            console.log("Error updating records", error);
         }
      }
   };

   if (!isMounted) return null;

   return (
      <div className="flex justify-center flex-col gap-2 overflow-hidden w-full">
         <h1 className="text-center font-bold"> Records </h1>
         {!isLoading ? (
            <Table className="overflow-hidden max-h-[40rem] m-auto sm:max-w-[20rem]">
               <TableCaption>A list of your recent transactions.</TableCaption>
               <TableHeader className="w-full">
                  <TableRow>
                     <TableHead className=" font-semibold">Amount</TableHead>
                     <TableHead className=" font-semibold">Category</TableHead>
                     <TableHead className=" font-semibold">
                        Descripton
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {records ? (
                     records.map((record) => (
                        <TableRow key={record.description}>
                           <TableCell className="font-medium max-sm:max-w-4">
                              <input
                                 className=" dark:bg-[#0A0A0A] "
                                 type="number"
                                 value={
                                    editingRecords?.id === record.id
                                       ? editingRecords.amount || ""
                                       : record.amount
                                 }
                                 onFocus={() =>
                                    setEditingRecords({ ...record })
                                 }
                                 onChange={(e) => {
                                    setEditingRecords((prev) => ({
                                       ...prev!,
                                       amount: parseFloat(e.target.value),
                                    }));
                                 }}
                                 onBlur={() => handleBlur(record.id)}
                              />
                           </TableCell>
                           <TableCell className="max-sm:max-w-4 truncate">
                              <input
                                 type="text"
                                 value={
                                    editingRecords?.id === record.id
                                       ? editingRecords.category || ""
                                       : record.category
                                 }
                                 onFocus={() =>
                                    setEditingRecords({ ...record })
                                 }
                                 onChange={(e) =>
                                    setEditingRecords((prev) => ({
                                       ...prev!,
                                       category: e.target.value,
                                    }))
                                 }
                                 onBlur={() => handleBlur(record.id)}
                                 className=" truncate dark:bg-[#0A0A0A]"
                              />
                           </TableCell>
                           <TableCell className="max-sm:max-w-4 truncate">
                              <input
                                 type="text"
                                 value={
                                    editingRecords?.id === record.id
                                       ? editingRecords.description || ""
                                       : record.description
                                 }
                                 onFocus={() =>
                                    setEditingRecords({ ...record })
                                 }
                                 onChange={(e) =>
                                    setEditingRecords((prev) => ({
                                       ...prev!,
                                       description: e.target.value,
                                    }))
                                 }
                                 onBlur={() => handleBlur(record.id)}
                                 className=" dark:bg-[#0A0A0A] truncate pl-2"
                              />
                           </TableCell>
                           <TableCell className="pr-3">
                              {isDeleting && record.id === deletingId ? (
                                 <LoaderCircle className="animate-spin text-red-600 size-[1rem] " />
                              ) : (
                                 <Trash
                                    className=" size-[1rem] text-red-600 cursor-pointer"
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
