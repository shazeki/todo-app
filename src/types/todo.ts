export type Priority = 'high' | 'medium' | 'low';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string | null;
  dueDate: string | null; // ISO date string "YYYY-MM-DD"
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';
