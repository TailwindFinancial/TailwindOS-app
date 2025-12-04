/**
 * Card Component - Container with Glassmorphism Effect
 * 
 * This component provides a beautiful card container for the Tailwind app.
 * It features a glassmorphism effect (frosted glass look) with blur, transparency,
 * and subtle borders. Can be pressable for interactive cards.
 * 
 * Features:
 * - Glassmorphism effect with blur and transparency
 * - Pressable variant for interactive cards
 * - Multiple elevation levels (flat, raised, floating)
 * - Customizable padding
 * - Press animation for pressable cards
 * - Shadow support
 * - Full accessibility support
 * 
 * Usage:
 * ```tsx
 * <Card>
 *   <Typography variant="h2">Card Title</Typography>
 *   <Typography variant="body">Card content goes here</Typography>
 * </Card>
 * 
 * <Card 
 *   pressable 
 *   onPress={() => navigation.navigate('Details')}
 * >
 *   <Typography variant="label">Tap me</Typography>
 * </Card>
 * ```
 * 
 * @module Components/DesignSystem/Card
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  PressableProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  animation,
} from '@constants/theme';

/**
 * Card elevation variants
 * Determines shadow depth and visual prominence
 */
export type CardElevation =
  | 'flat'      // No shadow, sits flat on surface
  | 'raised'    // Medium shadow, slightly elevated
  | 'floating'; // Large shadow, prominent elevation

/**
 * Card padding sizes
 */
export type CardPadding =
  | 'none'   // No padding (0px)
  | 'sm'     // Small padding (12px)
  | 'md'     // Medium padding (16px)
  | 'lg';    // Large padding (24px)

/**
 * Card component props
 */
export interface CardProps extends Omit<PressableProps, 'style'> {
  /** Card content */
  children: React.ReactNode;
  
  /** Whether card is pressable/interactive */
  pressable?: boolean;
  
  /** Elevation level (affects shadow) */
  elevation?: CardElevation;
  
  /** Padding size */
  padding?: CardPadding;
  
  /** Enable glassmorphism effect (blur + transparency) */
  glass?: boolean;
  
  /** Custom styles for the card */
  style?: ViewStyle | ViewStyle[];
  
  /** Test ID for testing */
  testID?: string;
  
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
}

/**
 * Card Component
 * 
 * A versatile container with beautiful glassmorphism effects and animations.
 * Can be static or interactive (pressable) with smooth press feedback.
 * 
 * @param {CardProps} props - Component props
 * @returns {React.ReactElement} Styled card container
 */
export const Card: React.FC<CardProps> = ({
  children,
  pressable = false,
  elevation = 'raised',
  padding = 'md',
  glass = true,
  style,
  testID,
  accessibilityLabel,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  // Shared values for animations (runs on UI thread)
  const scale = useSharedValue(1);         // Scale animation for press effect
  const opacity = useSharedValue(1);       // Opacity animation for press feedback

  /**
   * Handle press in - animate card to pressed state
   * Subtle scale-down effect for tactile feedback
   */
  const handlePressIn = (event: any) => {
    if (!pressable) return;
    
    // Animate scale down to 0.98 (very subtle)
    scale.value = withSpring(0.98, {
      damping: 20,      // Smooth, less bouncy
      stiffness: 300,   // Fast response
    });
    
    // Slightly reduce opacity
    opacity.value = withTiming(0.9, {
      duration: animation.duration.fast, // 150ms
    });
    
    // Call original onPressIn if provided
    onPressIn?.(event);
  };

  /**
   * Handle press out - animate card back to normal state
   * Returns to original size with subtle spring
   */
  const handlePressOut = (event: any) => {
    if (!pressable) return;
    
    // Animate scale back to 1
    scale.value = withSpring(1, {
      damping: 20,
      stiffness: 300,
    });
    
    // Restore full opacity
    opacity.value = withTiming(1, {
      duration: animation.duration.fast,
    });
    
    // Call original onPressOut if provided
    onPressOut?.(event);
  };

  /**
   * Animated style for press effect
   * Only applies scale when pressable
   */
  const animatedStyle = useAnimatedStyle(() => {
    if (!pressable) {
      return {}; // No animation for static cards
    }
    
    return {
      transform: [{ scale: scale.value }], // Scale animation
      opacity: opacity.value,               // Opacity animation
    };
  });

  // Get styles based on props
  const elevationStyle = elevationStyles[elevation];
  const paddingStyle = paddingStyles[padding];
  
  // Build container style
  const containerStyle = [
    styles.base,           // Base card styles
    elevationStyle,        // Elevation-specific styles
    paddingStyle,          // Padding styles
    style,                 // Custom styles from props
  ];

  /**
   * Render card content
   * Wraps in glassmorphism effect if enabled
   */
  const renderContent = () => {
    if (glass) {
      // Glassmorphism card with blur and gradient
      return (
        <View style={[styles.base, containerStyle]}>
          {/* Gradient overlay for depth */}
          <LinearGradient
            colors={[
              colors.glass,           // Semi-transparent white
              'rgba(255,255,255,0.02)', // Almost transparent
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          
          {/* Subtle border for definition */}
          <View style={styles.glassBorder} />
          
          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      );
    } else {
      // Solid card without glass effect
      return (
        <View style={[styles.base, styles.solid, containerStyle]}>
          {children}
        </View>
      );
    }
  };

  // Render pressable or static card
  if (pressable) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          testID={testID || 'card-pressable'}
          {...rest}
        >
          {renderContent()}
        </Pressable>
      </Animated.View>
    );
  }

  // Static card
  return (
    <Animated.View style={animatedStyle}>
      <View
        accessibilityLabel={accessibilityLabel}
        testID={testID || 'card-static'}
      >
        {renderContent()}
      </View>
    </Animated.View>
  );
};

/**
 * Base Styles
 * Common styles applied to all cards
 */
const styles = StyleSheet.create({
  /** Base card container */
  base: {
    borderRadius: borderRadius.lg,   // Large rounded corners (16px)
    overflow: 'hidden',              // Clip content to rounded corners
    position: 'relative',            // For absolute positioned elements
  },
  
  /** Solid card (non-glass) */
  solid: {
    backgroundColor: colors.surface, // Dark surface background
    borderWidth: 1,                  // 1px border
    borderColor: colors.border,      // Subtle border
  },
  
  /** Glass border overlay */
  glassBorder: {
    position: 'absolute',            // Position over card
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: borderRadius.lg,   // Match card radius
    borderWidth: 1,                  // 1px border
    borderColor: colors.glassBorder, // Semi-transparent white
  },
  
  /** Content container (ensures content appears above effects) */
  content: {
    position: 'relative',            // Above gradient and blur
    zIndex: 1,                       // Ensure content is on top
  },
});

/**
 * Elevation Styles
 * Defines shadow depth for different elevation levels
 */
const elevationStyles = StyleSheet.create({
  /** Flat - no shadow */
  flat: {
    ...shadows.none,
  },
  
  /** Raised - medium shadow */
  raised: {
    ...shadows.md,
  },
  
  /** Floating - large shadow */
  floating: {
    ...shadows.lg,
  },
});

/**
 * Padding Styles
 * Defines inner padding for different sizes
 */
const paddingStyles = StyleSheet.create({
  /** No padding */
  none: {
    padding: 0,
  },
  
  /** Small padding */
  sm: {
    padding: spacing.md, // 12px
  },
  
  /** Medium padding (default) */
  md: {
    padding: spacing.base, // 16px
  },
  
  /** Large padding */
  lg: {
    padding: spacing.lg, // 24px
  },
});

/**
 * Default export for convenience
 */
export default Card;

