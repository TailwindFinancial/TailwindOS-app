/**
 * LoadingSpinner Component - Loading Indicator
 * 
 * This component provides a loading spinner for the Tailwind app.
 * It supports multiple sizes, colors, and can be used inline or as a
 * full-screen overlay.
 * 
 * Features:
 * - Multiple sizes (small, medium, large)
 * - Color variants (primary, white, custom)
 * - Full-screen overlay mode
 * - Optional loading text
 * - Smooth rotation animation
 * - Accessibility support
 * 
 * Usage:
 * ```tsx
 * // Inline spinner
 * <LoadingSpinner size="md" />
 * 
 * // Full-screen loading overlay
 * <LoadingSpinner 
 *   fullScreen 
 *   text="Loading your data..."
 * />
 * 
 * // Small spinner with custom color
 * <LoadingSpinner size="sm" color={colors.primary} />
 * ```
 * 
 * @module Components/DesignSystem/LoadingSpinner
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  ViewStyle,
} from 'react-native';
import { Typography } from './Typography';
import { colors, spacing } from '@constants/theme';

/**
 * Spinner size variants
 */
export type SpinnerSize =
  | 'sm'     // Small - 16px
  | 'md'     // Medium - 24px
  | 'lg';    // Large - 32px

/**
 * Spinner color presets
 */
export type SpinnerColor =
  | 'primary'   // Primary cyan color
  | 'white'     // White (default)
  | 'secondary'; // Secondary gray

/**
 * LoadingSpinner component props
 */
export interface LoadingSpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  
  /** Spinner color (preset or custom hex) */
  color?: SpinnerColor | string;
  
  /** Whether to show as full-screen overlay */
  fullScreen?: boolean;
  
  /** Optional loading text (shown below spinner) */
  text?: string;
  
  /** Custom container styles */
  style?: ViewStyle | ViewStyle[];
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * LoadingSpinner Component
 * 
 * A versatile loading indicator that can be used inline or as a full-screen overlay.
 * Uses React Native's built-in ActivityIndicator with enhanced styling and options.
 * 
 * @param {LoadingSpinnerProps} props - Component props
 * @returns {React.ReactElement} Loading spinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text,
  style,
  testID,
}) => {
  // Map size to ActivityIndicator size
  const activitySize = mapSize(size);
  
  // Map color preset to actual color value
  const spinnerColor = mapColor(color);

  /**
   * Render the spinner and optional text
   * Reusable for both inline and full-screen modes
   */
  const renderSpinner = () => (
    <View style={[styles.container, style]}>
      {/* Activity indicator (native spinner) */}
      <ActivityIndicator
        size={activitySize}
        color={spinnerColor}
        testID={testID || 'loading-spinner'}
        accessibilityLabel="Loading"
        accessibilityRole="progressbar"
      />
      
      {/* Optional loading text */}
      {text && (
        <Typography
          variant="body"
          color="secondary"
          align="center"
          style={styles.text}
        >
          {text}
        </Typography>
      )}
    </View>
  );

  // Full-screen overlay mode
  if (fullScreen) {
    return (
      <Modal
        transparent
        visible
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <View style={styles.fullScreenContainer}>
            {renderSpinner()}
          </View>
        </View>
      </Modal>
    );
  }

  // Inline spinner mode
  return renderSpinner();
};

/**
 * Map size preset to ActivityIndicator size
 * React Native ActivityIndicator only accepts 'small' and 'large'
 * 
 * @param {SpinnerSize} size - Size preset
 * @returns {'small' | 'large'} ActivityIndicator size
 */
const mapSize = (size: SpinnerSize): 'small' | 'large' => {
  switch (size) {
    case 'sm':
      return 'small';  // Small (native)
    case 'md':
      return 'small';  // Small (native) - default looks good
    case 'lg':
      return 'large';  // Large (native)
    default:
      return 'small';
  }
};

/**
 * Map color preset to actual color value
 * 
 * @param {SpinnerColor | string} color - Color preset or custom hex
 * @returns {string} Color hex value
 */
const mapColor = (color: SpinnerColor | string): string => {
  // If it's a custom hex color, return as-is
  if (color.startsWith('#')) {
    return color;
  }
  
  // Map preset to theme color
  switch (color as SpinnerColor) {
    case 'primary':
      return colors.primary;      // Cyan
    case 'white':
      return colors.text;         // White
    case 'secondary':
      return colors.textSecondary; // Gray
    default:
      return colors.primary;      // Default to primary
  }
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  /** Base container for inline spinner */
  container: {
    alignItems: 'center',           // Center horizontally
    justifyContent: 'center',       // Center vertically
  },
  
  /** Loading text below spinner */
  text: {
    marginTop: spacing.base,        // Space above text (16px)
  },
  
  /** Full-screen overlay background */
  overlay: {
    flex: 1,                        // Fill screen
    backgroundColor: colors.overlay, // Semi-transparent black
    alignItems: 'center',           // Center horizontally
    justifyContent: 'center',       // Center vertically
  },
  
  /** Container for full-screen spinner */
  fullScreenContainer: {
    backgroundColor: colors.surface, // Dark card background
    borderRadius: 16,               // Rounded corners
    padding: spacing.xl,            // Generous padding (32px)
    minWidth: 150,                  // Minimum width for text
    alignItems: 'center',           // Center content
    justifyContent: 'center',       // Center content
  },
});

/**
 * Default export for convenience
 */
export default LoadingSpinner;

