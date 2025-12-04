/**
 * App.tsx - Root Application Component
 * 
 * This is the entry point for the Tailwind mobile application.
 * It handles:
 * - Font loading (Fraunces for headlines, Inter for body text)
 * - App initialization and loading states
 * - Rendering the main navigation structure
 * 
 * The component shows a loading screen while fonts and assets are being loaded,
 * then transitions to the main app navigation.
 * 
 * @module App
 */

import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Fraunces_400Regular,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Typography } from './src/components/design-system';

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

/**
 * Main App Component
 * 
 * Root component that initializes the application and manages the loading state.
 * Loads custom fonts (Fraunces and Inter) before rendering the main app.
 * Shows a splash screen while fonts are being loaded.
 * 
 * @returns {React.ReactElement | null} The root app component or null while loading
 */
export default function App(): React.ReactElement | null {
  // Load all required font variants using Expo Google Fonts
  // This hook returns loading state and any errors
  const [fontsLoaded, fontError] = useFonts({
    // Fraunces font family (for headlines and display text)
    Fraunces_400Regular,    // Regular weight (400)
    Fraunces_600SemiBold,   // Semibold weight (600)
    Fraunces_700Bold,       // Bold weight (700)
    
    // Inter font family (for body text and UI)
    Inter_400Regular,       // Regular weight (400)
    Inter_500Medium,        // Medium weight (500)
    Inter_600SemiBold,      // Semibold weight (600)
    Inter_700Bold,          // Bold weight (700)
  });

  /**
   * Hide splash screen once fonts are loaded
   * Uses useCallback to memoize the function and prevent unnecessary re-renders
   */
  const onLayoutRootView = useCallback(async () => {
    // Only hide splash screen if fonts are loaded or there's an error
    if (fontsLoaded || fontError) {
      // Hide the splash screen asynchronously
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If fonts are not yet loaded and there's no error, return null
  // This keeps the splash screen visible
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // If there was an error loading fonts, show error message
  if (fontError) {
    return (
      <View style={styles.errorContainer}>
        <Typography variant="body" color="error">
          Error loading fonts: {fontError.message}
        </Typography>
      </View>
    );
  }

  // Fonts are loaded successfully, render the app
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* StatusBar controls the system status bar appearance */}
      {/* 'light' style shows white text on dark background */}
      <StatusBar style="light" />
      
      {/* App Navigator - Main navigation structure */}
      {/* Handles auth flow and main app navigation */}
      <AppNavigator />
    </View>
  );
}

/**
 * Styles for the App component
 * 
 * Uses React Native StyleSheet for optimized styling.
 * All colors reference the theme constants.
 */
const styles = StyleSheet.create({
  /** Main container - fills the entire screen */
  container: {
    flex: 1, // Take up full screen
    backgroundColor: '#000000', // Pure black background
  },
  
  /** Error container style */
  errorContainer: {
    flex: 1, // Fill screen
    justifyContent: 'center', // Center content
    alignItems: 'center', // Center content
    backgroundColor: '#000000', // Black background
    padding: 20, // Inner padding
  },
});

