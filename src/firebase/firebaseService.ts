import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addFinanceInfo = async (userId: string, data: {amount: number, category: string, description: string}) => {
  try {
    const userDocRef = doc(db, 'finance', userId);
    await setDoc(userDocRef, data, {merge: true});
    console.log("Finance data added Successfully");
    
  } catch (error) {
    console.log("Error document adding", error);
  }
}
