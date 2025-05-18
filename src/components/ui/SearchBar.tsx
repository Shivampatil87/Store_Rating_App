import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import Input from './Input';
import Select from './Select';
import Button from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter?: (filterBy: string) => void;
  onSort?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  filterOptions?: { value: string; label: string }[];
  sortOptions?: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onSearch,
  onFilter,
  onSort,
  filterOptions,
  sortOptions,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => {
  const [query, setQuery] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSort = (sortBy: string) => {
    if (onSort) {
      onSort(sortBy, sortOrder);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={cn('space-y-4', className)}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>
        <Button type="submit" variant="primary" size="md">
          Search
        </Button>
      </form>

      {(filterOptions || sortOptions) && (
        <div className="flex flex-wrap gap-4">
          {filterOptions && onFilter && (
            <div className="w-full md:w-auto">
              <Select
                label="Filter by"
                options={filterOptions}
                onChange={(e) => onFilter(e.target.value)}
              />
            </div>
          )}

          {sortOptions && onSort && (
            <div className="flex flex-wrap gap-2 items-end">
              <div className="w-full md:w-auto">
                <Select
                  label="Sort by"
                  options={sortOptions}
                  onChange={(e) => handleSort(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={toggleSortOrder}
                className="min-w-[100px]"
              >
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;