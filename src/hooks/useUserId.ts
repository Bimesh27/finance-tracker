import { useAuth } from "@clerk/nextjs";

export const useUserId = () => {
   const { userId,isLoaded } = useAuth();

   return  {userId, isLoaded} ;
};
