import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   query,
   Timestamp,
   updateDoc,
   where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Records } from "@/types/type";

export const addExpanses = async (
   userId: string,
   amount: number,
   category: string,
   description: string,
   paymentMethod: string
) => {
   try {
      const docRef = await addDoc(collection(db, "expenses"), {
         userId,
         amount,
         category,
         description,
         paymentMethod,
         date: Timestamp.now(),
      });

      console.log("Document written with ID: ", docRef?.id);
   } catch (error) {
      console.log("Error adding document", error);
   }
};

export const getExpanses = async (userId: string) => {
   try {
      const q = query(
         collection(db, "expenses"),
         where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      // console.log(querySnapshot);

      const expenses: Records[] = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         userId: doc.data().userId,
         amount: doc.data().amount,
         category: doc.data().category,
         description: doc.data().description,
         paymentMethod: doc.data().paymentMethod,
         date: doc.data().date,
      }));

      return expenses;
   } catch (error) {
      console.log("Error getting document", error);
   }
};

export const deleteExpenses = async (expensesId: string) => {
   try {
      const expensesDecRef = doc(db, "expenses", expensesId);
      await deleteDoc(expensesDecRef);
      console.log(
         `Expenses record with id: ${expensesId} delete successufully`
      );

      deleteDoc(expensesDecRef);
   } catch (error) {
      console.log("Error delete expenses", error);
   }
};

export const updateExpenses = async (
   expenseId: string,
   updatedData: Partial<{
      amount: number;
      category: string;
      description: string;
      paymentMethod: string;
   }>
) => {
   try {
      const expenseDoc = doc(db, "expenses", expenseId);
      await updateDoc(expenseDoc, updatedData);
      console.log("Document updated Successfully");
   } catch (error) {
      console.log("Error updating document", error);
   }
};
