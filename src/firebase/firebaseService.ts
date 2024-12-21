import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addExpanses = async (
  userId: string,
  amount: number,
  category: string,
  description: string,
  paymentMethod: string
) => {
  try {
    const docRef = await addDoc(collection(db, "expanses"), {
      userId,
      amount,
      category,
      description,
      paymentMethod,
      date: Timestamp.now(),
    });

    console.log("Document written with ID: ", docRef);
  } catch (error) {
    console.log("Error adding document", error);
  }
};