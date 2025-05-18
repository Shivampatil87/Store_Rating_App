import { User, Store, Rating, UserRole } from './types';
import { delay } from './utils';

// Mock users data
const users: User[] = [
  {
    id: '1',
    name: 'System Administrator Example Name Here',
    email: 'admin@example.com',
    address: '123 Admin Street, City, Country',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Normal User Example Name Here Please',
    email: 'user@example.com',
    address: '456 User Avenue, City, Country',
    role: 'user',
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Store Owner Example Name Here Please',
    email: 'store@example.com',
    address: '789 Store Boulevard, City, Country',
    role: 'store_owner',
    createdAt: '2023-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Another Normal User Example Name Here',
    email: 'user2@example.com',
    address: '101 User Street, City, Country',
    role: 'user',
    createdAt: '2023-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: 'Another Store Owner Example Name Here',
    email: 'store2@example.com',
    address: '102 Store Street, City, Country',
    role: 'store_owner',
    createdAt: '2023-01-05T00:00:00Z',
  },
];

// Mock stores data
const stores: Store[] = [
  {
    id: '1',
    name: 'Coffee Shop Example Name Here Please',
    email: 'coffee@example.com',
    address: '123 Coffee Street, City, Country',
    ownerId: '3',
    averageRating: 4.5,
    totalRatings: 10,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Bookstore Example Name Here Please',
    email: 'books@example.com',
    address: '456 Book Avenue, City, Country',
    ownerId: '5',
    averageRating: 3.8,
    totalRatings: 5,
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Electronics Store Example Name Please',
    email: 'electronics@example.com',
    address: '789 Electronics Boulevard, City, Country',
    ownerId: '3',
    averageRating: 4.2,
    totalRatings: 15,
    createdAt: '2023-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Clothing Store Example Name Please',
    email: 'clothing@example.com',
    address: '101 Fashion Street, City, Country',
    ownerId: '5',
    averageRating: 4.0,
    totalRatings: 8,
    createdAt: '2023-01-04T00:00:00Z',
  },
];

// Mock ratings data
const ratings: Rating[] = [
  {
    id: '1',
    storeId: '1',
    userId: '2',
    value: 5,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z',
  },
  {
    id: '2',
    storeId: '1',
    userId: '4',
    value: 4,
    createdAt: '2023-02-02T00:00:00Z',
    updatedAt: '2023-02-02T00:00:00Z',
  },
  {
    id: '3',
    storeId: '2',
    userId: '2',
    value: 4,
    createdAt: '2023-02-03T00:00:00Z',
    updatedAt: '2023-02-03T00:00:00Z',
  },
  {
    id: '4',
    storeId: '3',
    userId: '4',
    value: 5,
    createdAt: '2023-02-04T00:00:00Z',
    updatedAt: '2023-02-04T00:00:00Z',
  },
  {
    id: '5',
    storeId: '4',
    userId: '2',
    value: 3,
    createdAt: '2023-02-05T00:00:00Z',
    updatedAt: '2023-02-05T00:00:00Z',
  },
];

// Mock API functions with artificial delay to simulate network requests
export const mockApi = {
  // Auth functions
  login: async (email: string, password: string) => {
    await delay(1000);
    
    // Demo credentials for each role
    if (email === 'admin@example.com' && password === 'Admin123!') {
      return users.find((user) => user.id === '1');
    } else if (email === 'user@example.com' && password === 'User123!') {
      return users.find((user) => user.id === '2');
    } else if (email === 'store@example.com' && password === 'Store123!') {
      return users.find((user) => user.id === '3');
    }
    
    throw new Error('Invalid credentials');
  },
  
  signup: async (userData: Partial<User>) => {
    await delay(1000);
    
    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const newUser: User = {
      id: String(users.length + 1),
      name: userData.name || '',
      email: userData.email || '',
      address: userData.address || '',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    return newUser;
  },
  
  // User functions
  getUsers: async () => {
    await delay(1000);
    return users;
  },
  
  getUserById: async (id: string) => {
    await delay(500);
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
  
  createUser: async (userData: Partial<User>) => {
    await delay(1000);
    
    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const newUser: User = {
      id: String(users.length + 1),
      name: userData.name || '',
      email: userData.email || '',
      address: userData.address || '',
      role: (userData.role as UserRole) || 'user',
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    return newUser;
  },
  
  // Store functions
  getStores: async () => {
    await delay(1000);
    return stores;
  },
  
  getStoreById: async (id: string) => {
    await delay(500);
    const store = stores.find((store) => store.id === id);
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  },
  
  createStore: async (storeData: Partial<Store>) => {
    await delay(1000);
    
    const existingStore = stores.find((store) => store.email === storeData.email);
    if (existingStore) {
      throw new Error('Store with this email already exists');
    }
    
    const newStore: Store = {
      id: String(stores.length + 1),
      name: storeData.name || '',
      email: storeData.email || '',
      address: storeData.address || '',
      ownerId: storeData.ownerId || '0',
      averageRating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
    };
    
    stores.push(newStore);
    return newStore;
  },
  
  // Rating functions
  getRatings: async () => {
    await delay(1000);
    return ratings;
  },
  
  getRatingsByStoreId: async (storeId: string) => {
    await delay(500);
    return ratings.filter((rating) => rating.storeId === storeId);
  },
  
  getRatingsByUserId: async (userId: string) => {
    await delay(500);
    return ratings.filter((rating) => rating.userId === userId);
  },
  
  submitRating: async (ratingData: Partial<Rating>) => {
    await delay(1000);
    
    const existingRatingIndex = ratings.findIndex(
      (rating) => rating.storeId === ratingData.storeId && rating.userId === ratingData.userId
    );
    
    if (existingRatingIndex >= 0) {
      // Update existing rating
      const updatedRating = {
        ...ratings[existingRatingIndex],
        value: ratingData.value || 1,
        updatedAt: new Date().toISOString(),
      };
      
      ratings[existingRatingIndex] = updatedRating;
      
      // Update store average rating
      updateStoreRating(ratingData.storeId || '');
      
      return updatedRating;
    } else {
      // Create new rating
      const newRating: Rating = {
        id: String(ratings.length + 1),
        storeId: ratingData.storeId || '',
        userId: ratingData.userId || '',
        value: ratingData.value || 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      ratings.push(newRating);
      
      // Update store average rating
      updateStoreRating(ratingData.storeId || '');
      
      return newRating;
    }
  },
  
  // Stats functions
  getAdminStats: async () => {
    await delay(1000);
    return {
      totalUsers: users.length,
      totalStores: stores.length,
      totalRatings: ratings.length,
    };
  },
  
  getStoreOwnerStats: async (ownerId: string) => {
    await delay(1000);
    
    const ownerStores = stores.filter((store) => store.ownerId === ownerId);
    
    if (ownerStores.length === 0) {
      throw new Error('No stores found for this owner');
    }
    
    const storeIds = ownerStores.map((store) => store.id);
    const storeRatings = ratings.filter((rating) => storeIds.includes(rating.storeId));
    
    const averageRating = 
      storeRatings.length > 0
        ? storeRatings.reduce((acc, rating) => acc + rating.value, 0) / storeRatings.length
        : 0;
    
    const recentRatings = storeRatings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((rating) => ({
        ...rating,
        user: {
          name: users.find((user) => user.id === rating.userId)?.name || '',
          email: users.find((user) => user.id === rating.userId)?.email || '',
        },
      }));
    
    return {
      averageRating,
      totalRatings: storeRatings.length,
      recentRatings,
    };
  },
  
  // Helper function to update store ratings
  updateStoreRating: (storeId: string) => {
    updateStoreRating(storeId);
  },
};

// Helper function to update store ratings
function updateStoreRating(storeId: string) {
  const storeIndex = stores.findIndex((store) => store.id === storeId);
  if (storeIndex >= 0) {
    const storeRatings = ratings.filter((rating) => rating.storeId === storeId);
    
    if (storeRatings.length > 0) {
      const averageRating = 
        storeRatings.reduce((acc, rating) => acc + rating.value, 0) / storeRatings.length;
      
      stores[storeIndex] = {
        ...stores[storeIndex],
        averageRating,
        totalRatings: storeRatings.length,
      };
    }
  }
}

// Get stores with user ratings for a specific user
export const getStoresWithUserRatings = async (userId: string) => {
  await delay(1000);
  
  const userRatings = ratings.filter((rating) => rating.userId === userId);
  
  return stores.map((store) => {
    const userRating = userRatings.find((rating) => rating.storeId === store.id);
    return {
      ...store,
      userRating: userRating ? userRating.value : null,
    };
  });
};

// Provide credential info for demo purposes
export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@example.com',
    password: 'Admin123!',
  },
  user: {
    email: 'user@example.com',
    password: 'User123!',
  },
  storeOwner: {
    email: 'store@example.com',
    password: 'Store123!',
  },
};