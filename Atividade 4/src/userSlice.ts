import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// ------- Tipagem -------
export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
}

// ------- Estado inicial -------
const initialState: UserState = {
  users: [],
};

// ------- Slice -------
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Adiciona um usuário ao array
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },

    // Remove um usuário pelo id
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

/*
  TESTE MANUAL NO CONSOLE (cole no main.tsx abaixo do ReactDOM.render):

  import { store } from './store';
  import { addUser } from './userSlice';

  store.dispatch(addUser({ id: 1, name: 'Ana', email: 'ana@email.com' }));
  store.dispatch(addUser({ id: 2, name: 'Bruno', email: 'bruno@email.com' }));
  console.log(store.getState().users);
*/
