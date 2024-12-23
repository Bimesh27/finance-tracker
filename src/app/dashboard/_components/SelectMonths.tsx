import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function SelectMonths() {
   const [selectedMonth, setSelectedMonth] = useState("");

   useEffect(() => {
      const currentDate = new Date();
      const currentMonth = currentDate.toISOString().slice(0, 7);
      setSelectedMonth(currentMonth);
   }, []);

   const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedMonth(e.target.value);
   };

   return (
      <Input
         type="month"
         className="w-[12rem]"
         defaultValue={Date.now()}
         value={selectedMonth}
         onChange={handleMonthChange}
      />
   );
}

export default SelectMonths;
