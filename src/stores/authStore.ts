
import { create } from 'zustand';
import { setAuthToken, removeAuthToken, getAuthToken } from '@/utils/authUtils';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string; confirmPassword: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string, rememberMe?: boolean) => {
    console.log("Login attempt:", { email, password, rememberMe });
    
    // Simulate API call - you can replace this with real validation
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email,
        phone: "+1234567890",
        address: "123 Main St, City, Country"
      };

      // Generate a simple token (in real app, this would come from backend)
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Set token in cookie with 1 day expiration
      setAuthToken(token, rememberMe ? 30 : 1);
      
      set({ user: mockUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  register: async (userData) => {
    console.log("Register attempt:", userData);
    // Simulate API call
    const { password, confirmPassword, ...userInfo } = userData;
    
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    const mockUser: User = {
      id: "1",
      ...userInfo
    };
    
    // Generate token and set in cookie
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setAuthToken(token, 1);
    
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    removeAuthToken();
    set({ user: null, isAuthenticated: false });
  },
  updateProfile: (userData) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...userData } });
    }
  },
  checkAuth: () => {
    const token = getAuthToken();
    if (token) {
      // In a real app, you would validate the token with your backend
      // For now, we'll just set authenticated to true if token exists
      set({ isAuthenticated: true });
      
      // You could also fetch user data here if needed
      // For demo purposes, we'll use mock data
      const mockUser: User = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "user@example.com",
        phone: "+1234567890",
        address: "123 Main St, City, Country"
      };
      set({ user: mockUser });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  }
}));
