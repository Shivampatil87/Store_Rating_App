import React, { useState, useEffect } from 'react';
import { Store as StoreIcon, Plus, Search } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import SearchBar from '../../components/ui/SearchBar';
import { Card, CardContent } from '../../components/ui/Card';
import StoreForm from '../../components/stores/StoreForm';
import StarRating from '../../components/ui/StarRating';
import Badge from '../../components/ui/Badge';
import { Store, User } from '../../lib/types';
import { mockApi } from '../../lib/mock-data';
import { formatDate } from '../../lib/utils';

const AdminStoresPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [storeOwners, setStoreOwners] = useState<User[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const storesData = await mockApi.getStores();
      const usersData = await mockApi.getUsers();
      
      // Filter users to only get store owners
      const owners = usersData.filter(user => user.role === 'store_owner');
      
      setStores(storesData);
      setFilteredStores(storesData);
      setStoreOwners(owners);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      } else if (filter === 'email') {
        return store.email.toLowerCase().includes(lowercaseQuery);
      } else if (filter === 'address') {
        return store.address.toLowerCase().includes(lowercaseQuery);
      }
      return true;
    });

    setFilteredStores(filtered);
  };

  const handleSort = (column: string) => {
    const newDirection = 
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    
    const sorted = [...filteredStores].sort((a, b) => {
      let comparison = 0;
      
      if (column === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (column === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (column === 'rating') {
        comparison = a.averageRating - b.averageRating;
      } else if (column === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredStores(sorted);
  };

  const handleAddStoreSuccess = () => {
    setIsAddingStore(false);
    loadData();
  };

  const columns = [
    {
      key: 'name',
      header: 'Store Name',
      cell: (store: Store) => <span className="font-medium text-gray-900">{store.name}</span>,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (store: Store) => store.email,
      sortable: true,
    },
    {
      key: 'address',
      header: 'Address',
      cell: (store: Store) => (
        <div className="max-w-md truncate">{store.address}</div>
      ),
      sortable: false,
    },
    {
      key: 'rating',
      header: 'Rating',
      cell: (store: Store) => (
        <div className="flex items-center gap-2">
          <StarRating value={store.averageRating} readOnly />
          <span className="text-sm font-medium">
            {store.averageRating.toFixed(1)} ({store.totalRatings})
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'date',
      header: 'Created At',
      cell: (store: Store) => formatDate(store.createdAt),
      sortable: true,
    },
  ];

  const filterOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'address', label: 'Address' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'rating', label: 'Rating' },
    { value: 'date', label: 'Created At' },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <StoreIcon className="mr-2 h-6 w-6" />
            Manage Stores
          </h1>
          <Button
            onClick={() => setIsAddingStore(true)}
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          >
            Add New Store
          </Button>
        </div>

        {isAddingStore ? (
          <StoreForm
            onSuccess={handleAddStoreSuccess}
            onCancel={() => setIsAddingStore(false)}
            storeOwners={storeOwners}
          />
        ) : (
          <>
            <SearchBar
              onSearch={handleSearch}
              onFilter={handleFilter}
              onSort={handleSort}
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              placeholder="Search stores..."
              className="mb-6"
            />

            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <Table
                    data={filteredStores}
                    columns={columns}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminStoresPage;