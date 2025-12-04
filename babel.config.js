/**
 * Babel Configuration
 * 
 * This file configures Babel for the Tailwind mobile app.
 * It includes essential plugins for React Native, Reanimated, and module path aliases.
 * 
 * Key Features:
 * - Expo preset for React Native compatibility
 * - Reanimated plugin for smooth animations (MUST be listed last)
 * - Module resolver for clean imports using @ aliases
 * 
 * @see https://docs.expo.dev/guides/customizing-metro/
 * @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation
 */

module.exports = function(api) {
  // Cache the configuration to improve build performance
  api.cache(true);
  
  return {
    // Use Expo's default Babel preset for React Native
    presets: ['babel-preset-expo'],
    
    plugins: [
      // Module resolver enables path aliases defined in tsconfig.json
      // This allows imports like "@components/Button" instead of "../../../components/Button"
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@services': './src/services',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@types': './src/types',
            '@hooks': './src/hooks',
          },
        },
      ],
      // React Native Reanimated plugin MUST be listed last
      // This plugin transforms Reanimated's worklet functions for UI thread execution
      'react-native-reanimated/plugin',
    ],
  };
};


