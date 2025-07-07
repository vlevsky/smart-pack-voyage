import React, { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    packed?: 'all' | 'packed' | 'unpacked';
    category?: string;
    luggage?: string;
  };
  onFilterChange: (filters: any) => void;
  sortBy: 'name' | 'date' | 'category';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, order: 'asc' | 'desc') => void;
  categories: string[];
  luggageOptions: string[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  sortBy,
  sortOrder,
  onSortChange,
  categories,
  luggageOptions,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = Object.values(filters).filter(value => 
    value && value !== 'all'
  ).length;

  const clearAllFilters = () => {
    onFilterChange({
      packed: 'all',
      category: 'all',
      luggage: 'all',
    });
    onSearchChange('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2"
        >
          {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          Sort: {sortBy}
        </Button>

        {(activeFilterCount > 0 || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-500 hover:text-red-600"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select
              value={filters.packed || 'all'}
              onValueChange={(value) => onFilterChange({ ...filters, packed: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="packed">Packed Only</SelectItem>
                <SelectItem value="unpacked">Unpacked Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select
              value={filters.category || 'all'}
              onValueChange={(value) => onFilterChange({ ...filters, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select
              value={sortBy}
              onValueChange={(value) => onSortChange(value, sortOrder)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};