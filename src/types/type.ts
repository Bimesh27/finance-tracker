export interface Records {
   userId: string;
   amount: number;
   category: string;
   description: string;
   paymentMethod: string;
   date: Date;
   id: string;
}

export interface UpdateDataShape {
   userId: string;
   amount: number;
   category: string;
   description: string;
   paymentMethod: string;
   date: Date;
}