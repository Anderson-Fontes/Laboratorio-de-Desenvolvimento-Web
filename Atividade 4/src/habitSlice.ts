import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// ------- Tipagem -------
export type HabitCategory = 'Saúde' | 'Estudo' | 'Lazer' | 'Todos';

export interface Habit {
  id: number;
  name: string;
  category: HabitCategory;
}

interface HabitState {
  habits: Habit[];
  activeFilter: HabitCategory;
}

// ------- Estado inicial -------
const initialState: HabitState = {
  habits: [],
  activeFilter: 'Todos',
};

// ------- Slice -------
const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    // Adiciona um hábito (id, nome, categoria)
    addHabit(state, action: PayloadAction<Habit>) {
      state.habits.push(action.payload);
    },

    // Remove hábito pelo id
    removeHabit(state, action: PayloadAction<number>) {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },

    // Armazena o filtro ativo — a filtragem acontece no selector (componente)
    filterHabits(state, action: PayloadAction<HabitCategory>) {
      state.activeFilter = action.payload;
    },
  },
});

export const { addHabit, removeHabit, filterHabits } = habitSlice.actions;
export default habitSlice.reducer;

/*
  TESTE MANUAL NO CONSOLE:

  import { store } from './store';
  import { addHabit, filterHabits } from './habitSlice';

  store.dispatch(addHabit({ id: 1, name: 'Correr 5km', category: 'Saúde' }));
  store.dispatch(addHabit({ id: 2, name: 'Ler 30min', category: 'Estudo' }));
  store.dispatch(addHabit({ id: 3, name: 'Jogar violão', category: 'Lazer' }));

  store.dispatch(filterHabits('Saúde'));

  const { habits, activeFilter } = store.getState().habits;
  const filtered = habits.filter(h => activeFilter === 'Todos' || h.category === activeFilter);
  console.log(filtered); // só "Correr 5km"
*/
