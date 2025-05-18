import React, { useState, useEffect } from 'react';
import { Users, Plus, Search } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import SearchBar from '../../components/ui/SearchBar';
import { Card, CardContent } from '../../components/ui/Card';
import UserForm from '../../components/users/UserForm';
import Badge from '../../components/ui/Badge';
import { User, Store } from '../../lib/types';
import { mockApi } from '../../lib/mock-data';
import { formatDate } from '../../lib/utils';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const usersData = await mockApi.getUsers();
      const storesData = await mockApi.getStores();
      setUsers(usersData);
      setFilteredUsers(usersData);
      setStores(storesData);
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
    filterUsers(query, filterBy);
  };

  const handleFilter = (filter: string) => {
    setFilterBy(filter);
    filterUsers(searchQuery, filter);
  };

  const filterUsers = (query: string, filter: string) => {
    if (!query) {
      setFilteredUsers(users);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = users.filter((user) => {
      if (filter === 'name') {
        return user.name.toLowerCase().includes(lowercaseQuery);
      } else if (filter === 'email') {
        return user.email.toLowerCase().includes(lowercaseQuery);
      } else if (filter === 'address') {
        return user.address.toLowerCase().includes(lowercaseQuery);
      } else if (filter === 'role') {
        return user.role.toLowerCase().includes(lowercaseQuery);
      }
      return true;
    });

    setFilteredUsers(filtered);
  };

  const handleSort = (column: string) => {
    const newDirection = 
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    
    const sorted = [...filteredUsers].sort((a, b) => {
      let comparison = 0;
      
      if (column === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (column === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (column === 'role') {
        comparison = a.role.localeCompare(b.role);
      } else if (column === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredUsers(sorted);
  };

  const handleAddUserSuccess = () => {
    setIsAddingUser(false);
    loadData();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'store_owner':
        return 'secondary';
      case 'user':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'System Administrator';
      case 'store_owner':
        return 'Store Owner';
      case 'user':
        return 'Normal User';
      default:
        return role;
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (user: User) => <span className="font-medium text-gray-900">{user.name}</span>,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (user: User) => user.email,
      sortable: true,
    },
    {
      key: 'address',
      header: 'Address',
      cell: (user: User) => (
        <div className="max-w-md truncate">{user.address}</div>
      ),
      sortable: false,
    },
    {
      key: 'role',
      header: 'Role',
      cell: (user: User) => (
        <Badge variant={getRoleBadgeVariant(user.role)}>
          {getRoleDisplayName(user.role)}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: 'date',
      header: 'Created At',
      cell: (user: User) => formatDate(user.createdAt),
      sortable: true,
    },
  ];

  const filterOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'address', label: 'Address' },
    { value: 'role', label: 'Role' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'role', label: 'Role' },
    { value: 'date', label: 'Created At' },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" />
            Manage Users
          </h1>
          <Button
            onClick={() => setIsAddingUser(true)}
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          >
            Add New User
          </Button>
        </div>

        {isAddingUser ? (
          <UserForm
            onSuccess={handleAddUserSuccess}
            onCancel={() => setIsAddingUser(false)}
            stores={stores}
          />
        ) : (
          <>
            <SearchBar
              onSearch={handleSearch}
              onFilter={handleFilter}
              onSort={handleSort}
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              placeholder="Search users..."
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
                    data={filteredUsers}
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

export default AdminUsersPage;