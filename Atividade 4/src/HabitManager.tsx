import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { addHabit, removeHabit, filterHabits } from './habitSlice'
import type { HabitCategory } from './habitSlice'

const CATEGORIES: HabitCategory[] = ['Saúde', 'Estudo', 'Lazer'];

/*
  Q5 — Usa o habitSlice (addHabit, removeHabit, filterHabits)
  Q6 — Formulário de cadastro de hábitos
  Q7 — Filtro por categoria com <select>
  Q9 — Seção "Gerenciar Hábitos" do mini dashboard
*/
export function HabitManager() {
  const dispatch = useDispatch<AppDispatch>();
  const { habits, activeFilter } = useSelector((state: RootState) => state.habits);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('Saúde');

  // Q6 — dispara addHabit ao enviar o formulário
  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch(addHabit({ id: Date.now(), name, category }));
    setName('');
  };

  // Q7 — dispara filterHabits ao mudar o select
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterHabits(e.target.value as HabitCategory));
  };

  // A filtragem é feita aqui no selector, não no reducer
  // O reducer só armazena o filtro ativo; o componente aplica
  const visibleHabits =
    activeFilter === 'Todos'
      ? habits
      : habits.filter((h) => h.category === activeFilter);

  return (
    <section>
      <h2>Gerenciar Hábitos</h2>

      {/* Formulário — Q6 */}
      <div>
        <input
          placeholder="Nome do hábito"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as HabitCategory)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      {/* Filtro — Q7 */}
      <div>
        <label>Filtrar por categoria: </label>
        <select value={activeFilter} onChange={handleFilter}>
          <option value="Todos">Todos</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Lista filtrada */}
      <ul>
        {visibleHabits.map((habit) => (
          <li key={habit.id}>
            <span>[{habit.category}]</span> {habit.name}
            <button onClick={() => dispatch(removeHabit(habit.id))}>Remover</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
