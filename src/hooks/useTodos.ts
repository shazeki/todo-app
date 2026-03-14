import { useState, useCallback } from 'react';
import type { Todo, Category } from '../types/todo';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '仕事', color: '#3b82f6' },
  { id: 'personal', name: '個人', color: '#10b981' },
  { id: 'shopping', name: '買い物', color: '#f59e0b' },
  { id: 'health', name: '健康', color: '#ef4444' },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() =>
    loadFromStorage<Todo[]>('todos', [])
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage<Category[]>('categories', DEFAULT_CATEGORIES)
  );

  const updateTodos = useCallback((updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const next = updater(prev);
      saveToStorage('todos', next);
      return next;
    });
  }, []);

  const addTodo = useCallback(
    (title: string, categoryId: string | null, dueDate: string | null) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        categoryId,
        dueDate,
        createdAt: new Date().toISOString(),
      };
      updateTodos((prev) => [newTodo, ...prev]);
    },
    [updateTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      updateTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [updateTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      updateTodos((prev) => prev.filter((t) => t.id !== id));
    },
    [updateTodos]
  );

  const editTodo = useCallback(
    (id: string, title: string, categoryId: string | null, dueDate: string | null) => {
      updateTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title, categoryId, dueDate } : t))
      );
    },
    [updateTodos]
  );

  const addCategory = useCallback(
    (name: string, color: string) => {
      const newCat: Category = { id: crypto.randomUUID(), name, color };
      setCategories((prev) => {
        const next = [...prev, newCat];
        saveToStorage('categories', next);
        return next;
      });
    },
    []
  );

  return {
    todos,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    addCategory,
  };
}
