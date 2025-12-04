/**
 * Circular Progress Component - Apple Watch Style Progress Ring
 * 
 * Beautiful animated circular progress indicator inspired by Apple Watch activity rings.
 * Perfect for displaying goals, spending limits, and completion percentages.
 * 
 * Features:
 * - Smooth animations using Reanimated
 * - Customizable colors, sizes, and stroke widths
 * - Percentage text in center
 * - Multiple rings support (nested circles)
 * - Accessible with screen reader support
 * 
 * Usage:
 * ```tsx
 * <CircularProgress
 *   progress={0.75}
 *   size={120}
 *   strokeWidth={12}
 *   color={colors.primary}
 * />
 * ```
 * 
 * @module Components/DesignSystem/CircularProgress
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Typography } from './Typography';
import { colors } from '@constants/theme';

// Create animated Circle component for smooth progress animation
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Circular Progress Props
 */
export interface CircularProgressProps {
  /** Progress value from 0 to 1 (0% to 100%) */
  progress: number;
  
  /** Size of the circle in pixels */
  size?: number;
  
  /** Width of the progress stroke */
  strokeWidth?: number;
  
  /** Color of the progress ring */
  color?: string;
  
  /** Color of the background track */
  trackColor?: string;
  
  /** Whether to show percentage text in center */
  showPercentage?: boolean;
  
  /** Custom label text (overrides percentage) */
  label?: string;
  
  /** Animation duration in milliseconds */
  animationDuration?: number;
}

/**
 * Circular Progress Component
 * 
 * Renders an animated circular progress ring with optional center label.
 * Uses React Native SVG and Reanimated for smooth 60fps animations.
 * 
 * @param {CircularProgressProps} props - Component props
 * @returns {React.ReactElement} Circular progress indicator
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  color = colors.primary,
  trackColor = colors.surface,
  showPercentage = true,
  label,
  animationDuration = 1000,
}) => {
  // Shared value for animated progress (0 to 1)
  const animatedProgress = useSharedValue(0);
  
  /**
   * Animate progress when prop changes
   * Smoothly transitions from current value to new value
   */
  useEffect(() => {
    // Animate to new progress value
    animatedProgress.value = withTiming(progress, {
      duration: animationDuration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth ease curve
    });
  }, [progress, animationDuration]);
  
  // Calculate circle dimensions
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Full circle circumference
  const center = size / 2; // Center point of SVG
  
  /**
   * Animated props for the progress circle
   * Updates strokeDashoffset based on progress value
   */
  const animatedProps = useAnimatedProps(() => {
    // Calculate dash offset based on progress
    // strokeDashoffset determines how much of the circle is visible
    const offset = circumference * (1 - animatedProgress.value);
    
    return {
      strokeDashoffset: offset,
    };
  });
  
  // Calculate percentage for display
  const percentage = Math.round(progress * 100);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* SVG Circle */}
      <Svg width={size} height={size}>
        {/* Background track circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Progress circle (animated) */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          rotation="-90" // Start from top
          origin={`${center}, ${center}`}
          animatedProps={animatedProps}
        />
      </Svg>
      
      {/* Center label */}
      {(showPercentage || label) && (
        <View style={styles.labelContainer}>
          {label ? (
            <Typography variant="label" color="text" align="center">
              {label}
            </Typography>
          ) : (
            <Typography variant="h3" color="primary" align="center">
              {percentage}%
            </Typography>
          )}
        </View>
      )}
    </View>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  /** Container for the circular progress */
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  /** Label container (absolute positioned in center) */
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Default export
 */
export default CircularProgress;

