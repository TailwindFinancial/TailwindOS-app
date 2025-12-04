/**
 * Auth Store - Authentication State Management
 * 
 * This store manages user authentication state using Zustand.
 * It handles login, logout, user profile updates, and session persistence
 * using AsyncStorage for maintaining login state across app restarts.
 * 
 * Features:
 * - User authentication state (user, token, isAuthenticated)
 * - Login and logout actions
 * - User profile updates
 * - Session persistence with AsyncStorage
 * - Loading states for async operations
 * - Error handling
 * - Mock authentication for development
 * 
 * Usage:
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuthStore();
 * 
 * // Login
 * await login({ email: 'user@example.com', password: 'password123' });
 * 
 * // Logout
 * logout();
 * 
 * // Check auth state
 * if (isAuthenticated) {
 *   // User is logged in
 * }
 * ```
 * 
 * @module Store/Auth
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthCredentials, RegisterData } from '@types';

/**
 * Auth Store State
 * Defines the shape of authentication state
 */
interface AuthState {
  // ========== State ==========
  
  /** Current authenticated user (null if not logged in) */
  user: User | null;
  
  /** Authentication token (JWT) */
  token: string | null;
  
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  
  /** Loading state for async operations */
  isLoading: boolean;
  
  /** Error message (null if no error) */
  error: string | null;
  
  // ========== Actions ==========
  
  /**
   * Log in user with credentials
   * 
   * @param {AuthCredentials} credentials - Email and password
   * @returns {Promise<void>}
   */
  login: (credentials: AuthCredentials) => Promise<void>;
  
  /**
   * Register new user account
   * 
   * @param {RegisterData} data - Registration information
   * @returns {Promise<void>}
   */
  register: (data: RegisterData) => Promise<void>;
  
  /**
   * Log out current user
   * Clears all auth state and removes from storage
   */
  logout: () => void;
  
  /**
   * Update user profile information
   * 
   * @param {Partial<User>} updates - Fields to update
   */
  updateUser: (updates: Partial<User>) => void;
  
  /**
   * Load authentication state from storage
   * Called on app startup to restore session
   * 
   * @returns {Promise<void>}
   */
  loadAuth: () => Promise<void>;
  
  /**
   * Clear error message
   */
  clearError: () => void;
  
  /**
   * Set loading state
   * 
   * @param {boolean} loading - Loading state
   */
  setLoading: (loading: boolean) => void;
}

/**
 * AsyncStorage Keys
 * Keys used for storing auth data
 */
const STORAGE_KEYS = {
  USER: '@tailwind/user',      // User object
  TOKEN: '@tailwind/token',    // JWT token
} as const;

/**
 * Auth Store
 * 
 * Zustand store for managing authentication state.
 * Provides actions for login, logout, and session management.
 * Automatically persists auth state to AsyncStorage.
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  // ========== Initial State ==========
  
  user: null,              // No user logged in initially
  token: null,             // No token initially
  isAuthenticated: false,  // Not authenticated initially
  isLoading: false,        // Not loading initially
  error: null,             // No error initially
  
  // ========== Actions ==========
  
  /**
   * Login Action
   * 
   * Authenticates user with email and password.
   * In production, this would call the API. For now, uses mock authentication.
   * Saves user and token to AsyncStorage for persistence.
   * 
   * @param {AuthCredentials} credentials - Login credentials
   */
  login: async (credentials: AuthCredentials) => {
    // Set loading state
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - accept any credentials
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: 'mock-user-id-123',
        email: credentials.email,
        name: credentials.email.split('@')[0], // Use email prefix as name
        preferredCurrency: 'USD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Update state with authenticated user
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // Persist to AsyncStorage for session restoration
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
      
    } catch (error) {
      // Handle login errors
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      throw error; // Re-throw so caller can handle
    }
  },
  
  /**
   * Register Action
   * 
   * Creates a new user account.
   * In production, this would call the API. For now, uses mock registration.
   * Automatically logs in the user after successful registration.
   * 
   * @param {RegisterData} data - Registration data
   */
  register: async (data: RegisterData) => {
    // Set loading state
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - accept all registrations
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: 'mock-user-id-' + Date.now(),
        email: data.email,
        name: data.name,
        preferredCurrency: data.preferredCurrency || 'USD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Update state with new user
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // Persist to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
      
    } catch (error) {
      // Handle registration errors
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      throw error; // Re-throw so caller can handle
    }
  },
  
  /**
   * Logout Action
   * 
   * Logs out the current user by:
   * 1. Clearing all auth state
   * 2. Removing data from AsyncStorage
   * 3. Resetting to initial state
   */
  logout: () => {
    // Clear state
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    // Clear AsyncStorage (async, but we don't wait)
    AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
  },
  
  /**
   * Update User Action
   * 
   * Updates the current user's profile information.
   * In production, this would sync with the API.
   * Updates both state and AsyncStorage.
   * 
   * @param {Partial<User>} updates - Fields to update
   */
  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    
    // Only update if user is logged in
    if (!user) {
      return;
    }
    
    // Merge updates with existing user
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(), // Update timestamp
    };
    
    // Update state
    set({ user: updatedUser });
    
    // Persist to AsyncStorage (async, but we don't wait)
    AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  },
  
  /**
   * Load Auth Action
   * 
   * Loads authentication state from AsyncStorage.
   * Called on app startup to restore previous session.
   * If valid user and token are found, restores the session.
   */
  loadAuth: async () => {
    try {
      // Set loading state
      set({ isLoading: true });
      
      // Load user and token from AsyncStorage
      const [userJson, token] = await AsyncStorage.multiGet([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.TOKEN,
      ]);
      
      // Extract values
      const user = userJson[1] ? JSON.parse(userJson[1]) : null;
      const storedToken = token[1];
      
      // If both user and token exist, restore session
      if (user && storedToken) {
        set({
          user,
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // No session to restore
        set({ isLoading: false });
      }
      
    } catch (error) {
      // Handle load errors (corrupted data, etc.)
      console.error('Failed to load auth state:', error);
      
      // Clear potentially corrupted data
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
      
      set({ isLoading: false });
    }
  },
  
  /**
   * Clear Error Action
   * 
   * Clears the current error message.
   * Useful for dismissing error messages after user acknowledges them.
   */
  clearError: () => {
    set({ error: null });
  },
  
  /**
   * Set Loading Action
   * 
   * Manually set loading state.
   * Useful for showing loading indicators during operations.
   * 
   * @param {boolean} loading - Loading state
   */
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

/**
 * Default export for convenience
 */
export default useAuthStore;

