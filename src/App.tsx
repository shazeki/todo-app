import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import type { FilterType } from './types/todo';
import './App.css';

export default function App() {
  const { todos, categories, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">✓</span> Todo
        </h1>
        <p className="app-subtitle">{activeCount} 件の未完了タスク</p>
      </header>

      <main className="app-main">
        <AddTodo categories={categories} onAdd={addTodo} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        <TodoList
          todos={todos}
          categories={categories}
          filter={filter}
          selectedCategoryId={selectedCategoryId}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>
    </div>
  );
}
