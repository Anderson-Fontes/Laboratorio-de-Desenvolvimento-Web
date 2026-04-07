import { useState } from 'react'
import { useUsers } from './useUsers'

/*
  Q4 — Lista usuários com useSelector (via hook customizado)
  Q8 — Usa apenas o hook useUsers, sem Redux direto no componente
  Q9 — Seção "Gerenciar Usuários" do mini dashboard
*/
export function UserManager() {
  const { users, addUser, removeUser } = useUsers();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    addUser({ id: Date.now(), name, email });
    setName('');
    setEmail('');
  };

  // Botão de dados fictícios — Q4
  const handleAddFake = () => {
    const fakeUsers = [
      { id: Date.now(), name: 'Ana Costa', email: 'ana@email.com' },
      { id: Date.now() + 1, name: 'Bruno Lima', email: 'bruno@email.com' },
      { id: Date.now() + 2, name: 'Carla Souza', email: 'carla@email.com' },
    ];
    fakeUsers.forEach((u) => addUser(u));
  };

  return (
    <section>
      <h2>Gerenciar Usuários</h2>

      {/* Formulário */}
      <div>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Adicionar</button>
        <button onClick={handleAddFake}>+ Dados Fictícios</button>
      </div>

      {/* Lista — Q4 */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
            <button onClick={() => removeUser(user.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
