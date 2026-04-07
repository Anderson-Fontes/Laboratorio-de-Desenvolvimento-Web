import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { addUser, removeUser } from './userSlice'
import type { User } from './userSlice'

/*
  Hook personalizado — Q8
  Encapsula useSelector + useDispatch para manipular usuários.
  O componente não precisa saber nada sobre Redux internamente.
*/
export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  const getUsers = () => users;

  const handleAddUser = (user: User) => {
    dispatch(addUser(user));
  };

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  return {
    users,
    getUsers,
    addUser: handleAddUser,
    removeUser: handleRemoveUser,
  };
}
