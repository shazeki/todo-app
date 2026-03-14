import type { FilterType, Category } from '../types/todo';

interface Props {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  categories: Category[];
  selectedCategoryId: string | null;
  onCategoryChange: (id: string | null) => void;
  activeCount: number;
  completedCount: number;
}

export function FilterBar({
  filter,
  onFilterChange,
  categories,
  selectedCategoryId,
  onCategoryChange,
  activeCount,
  completedCount,
}: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
          <button
            key={f}
            className={`filter-tab${filter === f ? ' active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f === 'all' ? `すべて (${activeCount + completedCount})` : f === 'active' ? `未完了 (${activeCount})` : `完了済み (${completedCount})`}
          </button>
        ))}
      </div>
      <div className="category-filter">
        <button
          className={`category-chip${selectedCategoryId === null ? ' active' : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          すべて
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip${selectedCategoryId === cat.id ? ' active' : ''}`}
            style={
              selectedCategoryId === cat.id
                ? { backgroundColor: cat.color, color: '#fff', borderColor: cat.color }
                : { borderColor: cat.color, color: cat.color }
            }
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
