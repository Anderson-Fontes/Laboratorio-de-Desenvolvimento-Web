// src/types/index.ts
export interface Habit {
    id: string; 
    name: string; 
    category: string; 
    completed: boolean; 
  }
  
  export interface HabitState {
    habits: Habit[];
    filterCategory: string;
  }