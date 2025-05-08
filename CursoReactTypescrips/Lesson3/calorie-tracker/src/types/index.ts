// src/types/index.ts
export type Category = {
    id: number;
    name: string;
  };
  
  export type Activity = {
    id: string;
    category: number;
    name: string;
    calories: number;
    date: string; // <-- añadimos esto
  };
  