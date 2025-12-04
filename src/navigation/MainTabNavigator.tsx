/**
 * Main Tab Navigator - Bottom Tab Navigation
 * 
 * This navigator provides the main app navigation with bottom tabs:
 * - Dashboard (Home)
 * - Pots (Expense groups)
 * - Activity (Recent history)
 * - Profile (User settings)
 * 
 * Uses a bottom tab navigator for easy access to main app sections.
 * 
 * @module Navigation/MainTabNavigator
 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@types';
import { DashboardScreen } from '@screens/dashboard/DashboardScreen';
import { PotListScreen } from '@screens/pot/PotListScreen';
import { ActivityScreen } from '@screens/activity/ActivityScreen';
import { ProfileScreen } from '@screens/profile/ProfileScreen';
import { colors, iconSize } from '@constants/theme';

/**
 * Create bottom tab navigator
 * Tab navigator provides persistent bottom navigation bar
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main Tab Navigator Component
 * 
 * Renders the main app tab navigator with:
 * - Dashboard tab (home icon)
 * - Pots tab (pot/group icon)
 * - Activity tab (list icon)
 * - Profile tab (user icon)
 * 
 * All tabs use consistent dark theme styling with cyan accent color.
 * 
 * @returns {React.ReactElement} Bottom tab navigator
 */
export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      // Screen options applied to all tabs
      screenOptions={{
        // Header styling
        headerStyle: {
          backgroundColor: colors.background,    // Black header background
          elevation: 0,                          // Remove shadow on Android
          shadowOpacity: 0,                      // Remove shadow on iOS
          borderBottomWidth: 0,                  // Remove bottom border
        },
        headerTintColor: colors.text,            // White header text
        headerTitleStyle: {
          fontFamily: 'Fraunces_600SemiBold',    // Fraunces font for headers
          fontSize: 24,                          // Large header size
          color: colors.text,                    // White text
        },
        
        // Tab bar styling
        tabBarStyle: {
          backgroundColor: colors.surface,       // Dark surface background
          borderTopWidth: 1,                     // Top border
          borderTopColor: colors.border,         // Subtle border color
          elevation: 0,                          // Remove shadow on Android
          shadowOpacity: 0,                      // Remove shadow on iOS
          height: 60,                            // Fixed tab bar height
          paddingBottom: 8,                      // Bottom padding
          paddingTop: 8,                         // Top padding
        },
        tabBarActiveTintColor: colors.primary,   // Cyan for active tab
        tabBarInactiveTintColor: colors.textSecondary, // Gray for inactive tabs
        tabBarLabelStyle: {
          fontFamily: 'Inter_600SemiBold',       // Inter font for tab labels
          fontSize: 12,                          // Small label size
        },
        
        // Hide header by default (screens can override)
        headerShown: true,
      }}
    >
      {/* Dashboard Tab - Home screen */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Home',                         // Tab label
          tabBarIcon: ({ color, size }) => (
            // Home icon (using emoji for now, replace with icon library later)
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      
      {/* Pots Tab - Expense groups */}
      <Tab.Screen
        name="Pots"
        component={PotListScreen}
        options={{
          title: 'Pots',                         // Tab label
          tabBarIcon: ({ color, size }) => (
            // Pot icon (using emoji for now, replace with icon library later)
            <Text style={{ fontSize: size, color }}>🎯</Text>
          ),
        }}
      />
      
      {/* Activity Tab - Recent history */}
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: 'Activity',                     // Tab label
          tabBarIcon: ({ color, size }) => (
            // Activity/List icon (using emoji for now)
            <Text style={{ fontSize: size, color }}>📋</Text>
          ),
        }}
      />
      
      {/* Profile Tab - User settings */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',                      // Tab label
          tabBarIcon: ({ color, size }) => (
            // User/Profile icon (using emoji for now)
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Default export for convenience
 */
export default MainTabNavigator;

