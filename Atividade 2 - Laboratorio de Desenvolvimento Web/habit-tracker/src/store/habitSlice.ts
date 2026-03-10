import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Habit, HabitState } from '../types';

const initialState: HabitState = {
  habits: [],
  filterCategory: 'Todas',
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    editHabit: (state, action: PayloadAction<{ id: string; name: string; category: string }>) => {
      const habit = state.habits.find(h => h.id === action.payload.id);
      if (habit) {
        habit.name = action.payload.name;
        habit.category = action.payload.category;
      }
    },
    toggleHabitComplete: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
    },
    clearCompletedHabits: (state) => {
      state.habits = state.habits.filter(h => !h.completed);
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
  },
});

export const {
  addHabit,
  editHabit,
  toggleHabitComplete,
  deleteHabit,
  clearCompletedHabits,
  setFilterCategory,
} = habitSlice.actions;

export default habitSlice.reducer;