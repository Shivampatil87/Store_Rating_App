import React, { useState, useEffect } from 'react';
import { Store as StoreIcon, Search } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import StoreCard from '../../components/stores/StoreCard';
import SearchBar from '../../components/ui/SearchBar';
import { StoreWithUserRating } from '../../lib/types';
import { getStoresWithUserRatings } from '../../lib/mock-data';
import useAuthStore from '../../store/authStore';

const StoresPage = () => {
  const { user } = useAuthStore();
  const [stores, setStores] = useState<StoreWithUserRating[]>([]);
  const [filteredStores, setFilteredStores] = useState<StoreWithUserRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  const loadStores = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const storesData = await getStoresWithUserRatings(user.id);
        setStores(storesData);
        setFilteredStores(storesData);
      } catch (error) {
        console.error('Failed to load stores:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadStores();
  }, [user]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterStores(query, filterBy);
  };

  const handleFilter = (filter: string) => {
    setFilterBy(filter);
    filterStores(searchQuery, filter);
  };

  const filterStores = (query: string, filter: string) => {
    if (!query) {
      setFilteredStores(stores);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = stores.filter((store) => {
      if (filter === 'name') {
        return store.name.toLowerCase().includes(lowercaseQuery);
      } else if (filter === 'address') {
        return store.address.toLowerCase().includes(lowercaseQuery);
      }
      return true;
    });

    setFilteredStores(filtered);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sorted = [...filteredStores].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        comparison = a.averageRating - b.averageRating;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    setFilteredStores(sorted);
  };

  const filterOptions = [
    { value: 'name', label: 'Name' },
    { value: 'address', label: 'Address' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Rating' },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <StoreIcon className="mr-2 h-6 w-6" />
            Stores
          </h1>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          placeholder="Search stores by name or address..."
          className="mb-8"
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stores found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No stores matching "${searchQuery}"`
                : "There are no stores available yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onRatingUpdate={loadStores}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StoresPage;