import { useState } from 'react';
import type { Todo, Category } from '../types/todo';

interface Props {
  todo: Todo;
  categories: Category[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, categoryId: string | null, dueDate: string | null) => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' });
}

function isOverdue(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + 'T00:00:00') < today;
}

export function TodoItem({ todo, categories, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editCategoryId, setEditCategoryId] = useState(todo.categoryId ?? '');
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? '');

  const category = categories.find((c) => c.id === todo.categoryId);
  const overdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate);

  const handleEditSubmit = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed, editCategoryId || null, editDueDate || null);
    setEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(todo.title);
    setEditCategoryId(todo.categoryId ?? '');
    setEditDueDate(todo.dueDate ?? '');
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="todo-item editing">
        <input
          className="edit-input"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditSubmit();
            if (e.key === 'Escape') handleEditCancel();
          }}
          autoFocus
        />
        <div className="edit-meta">
          <select
            className="add-todo-select"
            value={editCategoryId}
            onChange={(e) => setEditCategoryId(e.target.value)}
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
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <button className="btn-save" onClick={handleEditSubmit}>保存</button>
          <button className="btn-cancel" onClick={handleEditCancel}>キャンセル</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}${overdue ? ' overdue' : ''}`}>
      <button
        className="todo-check"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '未完了にする' : '完了にする'}
      >
        {todo.completed ? '✓' : ''}
      </button>
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        <div className="todo-badges">
          {category && (
            <span
              className="badge-category"
              style={{ backgroundColor: category.color + '22', color: category.color, borderColor: category.color + '55' }}
            >
              {category.name}
            </span>
          )}
          {todo.dueDate && (
            <span className={`badge-due${overdue ? ' overdue' : ''}`}>
              {overdue ? '⚠ ' : '📅 '}{formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button className="btn-edit" onClick={() => setEditing(true)} aria-label="編集">✏️</button>
        <button className="btn-delete" onClick={() => onDelete(todo.id)} aria-label="削除">🗑️</button>
      </div>
    </li>
  );
}
