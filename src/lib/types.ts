// User-related types
export type UserRole = 'admin' | 'user' | 'store_owner';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: UserRole;
  createdAt: string;
}

export interface StoreOwner extends User {
  storeId: string;
  averageRating: number;
}

// Store-related types
export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  averageRating: number;
  totalRatings: number;
  createdAt: string;
}

// Rating-related types
export interface Rating {
  id: string;
  storeId: string;
  userId: string;
  value: number; // 1-5
  createdAt: string;
  updatedAt: string;
}

export interface RatingWithUser extends Rating {
  user: {
    name: string;
    email: string;
  };
}

export interface StoreWithUserRating extends Store {
  userRating: number | null;
}

// Stats-related types
export interface AdminStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export interface StoreOwnerStats {
  averageRating: number;
  totalRatings: number;
  recentRatings: RatingWithUser[];
}

// Auth-related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}