import {
   addDoc,
   collection,
   getDocs,
   query,
   Timestamp,
   where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

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
      console.log(querySnapshot);
      const expenses = querySnapshot.docs.map((doc) => doc.data());
      return expenses;
   } catch (error) {
      console.log("Error getting document", error);
   }
};
