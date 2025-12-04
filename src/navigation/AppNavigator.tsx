/**
 * App Navigator - Root Navigation Structure
 * 
 * This is the root navigator that manages the entire app navigation.
 * It switches between Auth flow and Main app based on authentication state.
 * 
 * Flow:
 * - If user is not authenticated → Show AuthNavigator (Login/Register)
 * - If user is authenticated → Show MainTabNavigator (Dashboard/Pots/etc)
 * 
 * Uses Zustand auth store to determine authentication state.
 * 
 * @module Navigation/AppNavigator
 */

import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingSpinner } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { RootStackParamList } from '@types';
import { colors } from '@constants/theme';

/**
 * Create native stack navigator for root navigation
 * This navigator switches between Auth and Main based on auth state
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * App Navigator Component
 * 
 * Root navigation component that:
 * 1. Loads auth state from storage on mount
 * 2. Shows loading screen while checking auth
 * 3. Renders AuthNavigator if not authenticated
 * 4. Renders MainTabNavigator if authenticated
 * 
 * @returns {React.ReactElement} Root navigator wrapped in NavigationContainer
 */
export const AppNavigator: React.FC = () => {
  // Get auth state and actions from store
  const { isAuthenticated, isLoading, loadAuth } = useAuthStore();
  
  /**
   * Load auth state on mount
   * Checks AsyncStorage for saved session and restores if valid
   */
  useEffect(() => {
    // Load authentication state from storage
    // Wrap in try-catch to prevent unhandled promise rejections
    loadAuth().catch((error) => {
      console.error('Failed to load auth in AppNavigator:', error);
      // Ensure loading state is cleared even on error
      useAuthStore.getState().setLoading(false);
    });
  }, []); // Empty dependency array = run once on mount
  
  /**
   * Show loading screen while checking authentication
   * Prevents flash of wrong screen
   */
  if (isLoading) {
    return (
      <LoadingSpinner
        fullScreen
        size="lg"
        text="Loading..."
      />
    );
  }
  
  /**
   * Build a navigation theme that extends React Navigation's default dark theme.
   * We must spread the original object so required properties (fonts, animation helpers, etc.)
   * remain defined. Overriding the entire theme object causes undefined fonts and triggers the
   * "Cannot read property 'regular' of undefined" runtime error inside the header config.
   */
  const navigationTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  /**
   * Render navigation
   * NavigationContainer manages navigation state and provides context
   */
  return (
    <NavigationContainer
      // Dark theme for navigation with preserved font definitions
      theme={navigationTheme}
    >
      <Stack.Navigator
        // Screen options for root navigator
        screenOptions={{
          headerShown: false,                // Hide headers (navigators handle their own)
          contentStyle: {
            backgroundColor: colors.background, // Black background
          },
        }}
      >
        {/* Conditional rendering based on authentication state */}
        {isAuthenticated ? (
          // User is authenticated → Show main app
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{
              // No transition animation for auth state changes
              animation: 'none',
            }}
          />
        ) : (
          // User is not authenticated → Show auth flow
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              // No transition animation for auth state changes
              animation: 'none',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Default export for convenience
 */
export default AppNavigator;
