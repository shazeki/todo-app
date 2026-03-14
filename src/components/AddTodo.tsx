import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Category } from '../types/todo';

interface Props {
  categories: Category[];
  onAdd: (title: string, categoryId: string | null, dueDate: string | null) => void;
}

export function AddTodo({ categories, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, categoryId || null, dueDate || null);
    setTitle('');
    setCategoryId('');
    setDueDate('');
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        className="add-todo-input"
        type="text"
        placeholder="新しいTODOを入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <div className="add-todo-meta">
        <select
          className="add-todo-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">カテゴリなし</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          className="add-todo-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          title="期限日"
        />
        <button className="add-todo-btn" type="submit">
          追加
        </button>
      </div>
    </form>
  );
}
