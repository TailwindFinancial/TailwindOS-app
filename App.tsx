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

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
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
  // Load all required font variants from local TTF files
  // Using static fonts for specific weights we need (better performance than variable fonts)
  // This hook returns loading state and any errors
  const [fontsLoaded, fontError] = useFonts({
    // Fraunces font family (for headlines and display text)
    // Using 72pt static fonts from assets/fonts/Fraunces/static/
    'Fraunces_400Regular': require('./assets/fonts/Fraunces/static/Fraunces_72pt-Regular.ttf'),
    'Fraunces_600SemiBold': require('./assets/fonts/Fraunces/static/Fraunces_72pt-SemiBold.ttf'),
    'Fraunces_700Bold': require('./assets/fonts/Fraunces/static/Fraunces_72pt-Bold.ttf'),
    
    // Inter font family (for body text and UI)
    // Using 18pt static fonts from assets/fonts/Inter/static/
    // 18pt is optimal for mobile UI (not too large, not too small)
    'Inter_400Regular': require('./assets/fonts/Inter/static/Inter_18pt-Regular.ttf'),
    'Inter_500Medium': require('./assets/fonts/Inter/static/Inter_18pt-Medium.ttf'),
    'Inter_600SemiBold': require('./assets/fonts/Inter/static/Inter_18pt-SemiBold.ttf'),
    'Inter_700Bold': require('./assets/fonts/Inter/static/Inter_18pt-Bold.ttf'),
  });

  /**
   * Hide splash screen once fonts are loaded
   * Runs immediately when fonts finish loading (not waiting for layout)
   */
  useEffect(() => {
    // Function to hide splash screen
    async function hideSplash() {
      // Only proceed if fonts are loaded or there's an error
      if (fontsLoaded || fontError) {
        try {
          // Hide the splash screen asynchronously
          await SplashScreen.hideAsync();
        } catch (error) {
          // Splash already hidden or other error - ignore
          console.warn('Error hiding splash:', error);
        }
      }
    }
    
    // Call the hide function
    hideSplash();
  }, [fontsLoaded, fontError]); // Re-run when fonts load or error occurs

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
    <View style={styles.container}>
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

