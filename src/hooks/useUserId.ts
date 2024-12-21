import { useAuth } from "@clerk/nextjs"

export const useUserId = () => {
  const {userId} = useAuth();
  
  return {userId};

}