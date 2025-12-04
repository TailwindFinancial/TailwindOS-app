/**
 * Input Component - Text Input Field
 * 
 * This component provides a fully-featured text input for the Tailwind app.
 * It supports labels, error states, password fields with toggle visibility,
 * icons, and smooth focus animations.
 * 
 * Features:
 * - Label support (optional)
 * - Error state with error message
 * - Password field with show/hide toggle
 * - Left and right icon support
 * - Focus animation (border color change)
 * - Placeholder text
 * - Multiline support (textarea)
 * - Character count (optional)
 * - Full accessibility support
 * 
 * Usage:
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="your@email.com"
 *   value={email}
 *   onChangeText={setEmail}
 *   keyboardType="email-address"
 * />
 * 
 * <Input
 *   label="Password"
 *   type="password"
 *   value={password}
 *   onChangeText={setPassword}
 *   error="Password must be at least 8 characters"
 * />
 * ```
 * 
 * @module Components/DesignSystem/Input
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Typography } from './Typography';
import {
  colors,
  spacing,
  borderRadius,
  inputHeight,
  fontSizes,
  animation,
} from '@constants/theme';

/**
 * Input type variants
 * Determines input behavior and keyboard type
 */
export type InputType = 
  | 'text'        // Regular text input
  | 'email'       // Email input (shows @ on keyboard)
  | 'password'    // Password input (hidden text)
  | 'number'      // Numeric input
  | 'phone';      // Phone number input

/**
 * Input size variants
 */
export type InputSize =
  | 'sm'     // Small - 36px height
  | 'md'     // Medium - 48px height (default)
  | 'lg';    // Large - 56px height

/**
 * Input component props
 */
export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Input label (shown above input) */
  label?: string;
  
  /** Input type - affects keyboard and behavior */
  type?: InputType;
  
  /** Input size */
  size?: InputSize;
  
  /** Error message (shows red border and error text) */
  error?: string;
  
  /** Helper text shown below input */
  helperText?: string;
  
  /** Icon to show on the left */
  iconLeft?: React.ReactNode;
  
  /** Icon to show on the right */
  iconRight?: React.ReactNode;
  
  /** Whether input is disabled */
  disabled?: boolean;
  
  /** Custom container styles */
  containerStyle?: ViewStyle | ViewStyle[];
  
  /** Custom input styles */
  inputStyle?: ViewStyle | ViewStyle[];
  
  /** Maximum character count (shows counter) */
  maxLength?: number;
  
  /** Show character counter */
  showCount?: boolean;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Input Component
 * 
 * A feature-rich text input with animations and comprehensive state management.
 * Supports various input types including password fields with visibility toggle.
 * 
 * @param {InputProps} props - Component props
 * @returns {React.ReactElement} Styled, interactive input field
 */
export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  size = 'md',
  error,
  helperText,
  iconLeft,
  iconRight,
  disabled = false,
  containerStyle,
  inputStyle,
  maxLength,
  showCount = false,
  value = '',
  testID,
  onFocus,
  onBlur,
  ...rest
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  
  // State for focus tracking
  const [isFocused, setIsFocused] = useState(false);
  
  // Shared value for border color animation
  const borderColorProgress = useSharedValue(0);

  /**
   * Handle input focus
   * Triggers border animation and calls user's onFocus handler
   */
  const handleFocus = (event: any) => {
    setIsFocused(true);
    
    // Animate border color to cyan
    borderColorProgress.value = withTiming(1, {
      duration: animation.duration.fast, // 150ms
    });
    
    // Call user's onFocus handler if provided
    onFocus?.(event);
  };

  /**
   * Handle input blur
   * Reverts border animation and calls user's onBlur handler
   */
  const handleBlur = (event: any) => {
    setIsFocused(false);
    
    // Animate border color back to default
    borderColorProgress.value = withTiming(0, {
      duration: animation.duration.fast, // 150ms
    });
    
    // Call user's onBlur handler if provided
    onBlur?.(event);
  };

  /**
   * Toggle password visibility
   * Switches between showing plain text and hidden characters
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Animated border style
   * Smoothly transitions border color on focus
   */
  const animatedBorderStyle = useAnimatedStyle(() => {
    // Interpolate between default border and focus border colors
    const borderColor = error
      ? colors.error // Red border if error
      : isFocused
      ? colors.borderFocus // Cyan border when focused
      : colors.border; // Default gray border
    
    return {
      borderColor,
    };
  });

  // Determine keyboard type based on input type
  const keyboardType = getKeyboardType(type);
  
  // Determine if password should be hidden
  const secureTextEntry = type === 'password' && !showPassword;
  
  // Get size-specific styles
  const sizeStyle = sizeStyles[size];
  
  // Build input container style
  const inputContainerStyle = [
    styles.inputContainer,
    sizeStyle,
    disabled && styles.disabled,
    animatedBorderStyle,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Typography
          variant="label"
          color="text"
          style={styles.label}
        >
          {label}
        </Typography>
      )}

      {/* Input container with border and icons */}
      <Animated.View style={inputContainerStyle}>
        {/* Left icon */}
        {iconLeft && (
          <View style={styles.iconLeft}>
            {iconLeft}
          </View>
        )}

        {/* Text input */}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor={colors.textTertiary}
          editable={!disabled}
          maxLength={maxLength}
          accessibilityLabel={label}
          accessibilityState={{
            disabled,
          }}
          testID={testID || `input-${type}`}
          {...rest}
        />

        {/* Right icon or password toggle */}
        {type === 'password' ? (
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.iconRight}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Typography variant="bodySmall" color="secondary">
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Typography>
          </Pressable>
        ) : iconRight ? (
          <View style={styles.iconRight}>
            {iconRight}
          </View>
        ) : null}
      </Animated.View>

      {/* Error message, helper text, or character count */}
      <View style={styles.footer}>
        {/* Error message takes priority */}
        {error ? (
          <Typography
            variant="caption"
            color="error"
            style={styles.errorText}
          >
            {error}
          </Typography>
        ) : helperText ? (
          <Typography
            variant="caption"
            color="secondary"
            style={styles.helperText}
          >
            {helperText}
          </Typography>
        ) : null}

        {/* Character count */}
        {showCount && maxLength && (
          <Typography
            variant="caption"
            color="tertiary"
            style={styles.count}
          >
            {value.length}/{maxLength}
          </Typography>
        )}
      </View>
    </View>
  );
};

/**
 * Get keyboard type based on input type
 * Maps our input types to React Native keyboard types
 * 
 * @param {InputType} type - Input type
 * @returns {TextInputProps['keyboardType']} Keyboard type
 */
const getKeyboardType = (type: InputType): TextInputProps['keyboardType'] => {
  switch (type) {
    case 'email':
      return 'email-address';
    case 'number':
      return 'numeric';
    case 'phone':
      return 'phone-pad';
    default:
      return 'default';
  }
};

/**
 * Base Styles
 * Common styles applied to all inputs
 */
const styles = StyleSheet.create({
  /** Main container */
  container: {
    marginBottom: spacing.base, // Space below input (16px)
  },
  
  /** Label */
  label: {
    marginBottom: spacing.sm, // Space between label and input (8px)
  },
  
  /** Input container with border */
  inputContainer: {
    flexDirection: 'row',           // Horizontal layout for icons + input
    alignItems: 'center',           // Vertical centering
    backgroundColor: colors.surface, // Dark surface background
    borderRadius: borderRadius.md,   // Rounded corners (12px)
    borderWidth: 1,                  // 1px border
    borderColor: colors.border,      // Default border color
    paddingHorizontal: spacing.base, // Horizontal padding (16px)
    overflow: 'hidden',              // Clip content to rounded corners
  },
  
  /** Text input field */
  input: {
    flex: 1,                         // Take available space
    fontFamily: 'Inter_400Regular',  // Inter font
    fontSize: fontSizes.base,        // 16px
    color: colors.text,              // White text
    padding: 0,                      // Remove default padding
    margin: 0,                       // Remove default margin
  },
  
  /** Disabled state */
  disabled: {
    opacity: 0.5,                    // Reduced opacity
    backgroundColor: colors.surfaceElevated, // Slightly different background
  },
  
  /** Left icon container */
  iconLeft: {
    marginRight: spacing.sm,         // Space between icon and input (8px)
  },
  
  /** Right icon container */
  iconRight: {
    marginLeft: spacing.sm,          // Space between input and icon (8px)
  },
  
  /** Footer container (error/helper/count) */
  footer: {
    flexDirection: 'row',            // Horizontal layout
    justifyContent: 'space-between', // Space between helper and count
    alignItems: 'center',            // Vertical centering
    marginTop: spacing.xs,           // Space above footer (4px)
  },
  
  /** Error text */
  errorText: {
    flex: 1, // Take available space
  },
  
  /** Helper text */
  helperText: {
    flex: 1, // Take available space
  },
  
  /** Character count */
  count: {
    marginLeft: spacing.sm, // Space from helper text (8px)
  },
});

/**
 * Size Styles
 * Defines dimensions for different input sizes
 */
const sizeStyles = StyleSheet.create({
  /** Small input - compact size */
  sm: {
    height: inputHeight.sm,          // 36px height
    paddingHorizontal: spacing.sm,   // 8px horizontal padding
  },
  
  /** Medium input - default size */
  md: {
    height: inputHeight.md,          // 48px height
    paddingHorizontal: spacing.base, // 16px horizontal padding
  },
  
  /** Large input - prominent size */
  lg: {
    height: inputHeight.lg,          // 56px height
    paddingHorizontal: spacing.lg,   // 24px horizontal padding
  },
});

/**
 * Default export for convenience
 */
export default Input;

