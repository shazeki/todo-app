import type { Todo, Category, FilterType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  categories: Category[];
  filter: FilterType;
  selectedCategoryId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, categoryId: string | null, dueDate: string | null) => void;
}

export function TodoList({
  todos,
  categories,
  filter,
  selectedCategoryId,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const filtered = todos.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (selectedCategoryId && t.categoryId !== selectedCategoryId) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <p>TODOがありません</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
