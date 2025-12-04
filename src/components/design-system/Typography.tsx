/**
 * Typography Component - Text Display System
 * 
 * This component provides a consistent typography system for the Tailwind app.
 * It supports multiple variants (Display, H1-H3, Body, Label, Caption) with
 * consistent styling based on the design system theme.
 * 
 * Features:
 * - Multiple text variants for visual hierarchy
 * - Automatic font family selection (Fraunces for headlines, Inter for body)
 * - Color variants (primary, secondary, tertiary, error, success)
 * - Text alignment options
 * - Custom style overrides
 * - Accessibility support
 * 
 * Usage:
 * ```tsx
 * <Typography variant="h1" color="primary">
 *   Welcome to Tailwind
 * </Typography>
 * 
 * <Typography variant="body" align="center">
 *   Track expenses with friends
 * </Typography>
 * ```
 * 
 * @module Components/DesignSystem/Typography
 */

import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { colors, fontSizes, fontWeights, lineHeights } from '@constants/theme';

/**
 * Typography variant types
 * Defines all available text styles
 */
export type TypographyVariant =
  | 'display'      // Extra large, bold headlines (Fraunces)
  | 'h1'           // Main page titles (Fraunces)
  | 'h2'           // Section headers (Fraunces)
  | 'h3'           // Sub-section headers (Fraunces)
  | 'body'         // Default body text (Inter)
  | 'bodySmall'    // Smaller body text (Inter)
  | 'label'        // Form labels and UI text (Inter)
  | 'caption';     // Small captions and hints (Inter)

/**
 * Text color variants
 * Maps to theme color tokens
 */
export type TypographyColor =
  | 'primary'      // Primary brand cyan
  | 'text'         // Default white text
  | 'secondary'    // Muted gray text
  | 'tertiary'     // Subtle gray text
  | 'error'        // Error red
  | 'success'      // Success green
  | 'warning';     // Warning orange

/**
 * Text alignment options
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Typography component props
 * Extends React Native TextProps for full Text component compatibility
 */
export interface TypographyProps extends TextProps {
  /** Text content to display */
  children: React.ReactNode;
  
  /** Visual variant - determines size, weight, and font family */
  variant?: TypographyVariant;
  
  /** Text color variant */
  color?: TypographyColor;
  
  /** Text alignment */
  align?: TextAlign;
  
  /** Whether to make text bold (overrides variant weight) */
  bold?: boolean;
  
  /** Additional custom styles */
  style?: TextStyle | TextStyle[];
  
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Typography Component
 * 
 * Renders styled text with consistent typography based on the design system.
 * Automatically selects the appropriate font family, size, weight, and color
 * based on the variant prop.
 * 
 * @param {TypographyProps} props - Component props
 * @returns {React.ReactElement} Styled text component
 */
export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'text',
  align = 'left',
  bold = false,
  style,
  accessibilityLabel,
  testID,
  ...rest
}) => {
  // Get the base style for the selected variant
  const variantStyle = styles[variant];
  
  // Get the color style for the selected color
  const colorStyle = colorStyles[color];
  
  // Build the final style array
  // Order matters: base variant → color → alignment → bold → custom styles
  const textStyle = [
    variantStyle,      // Variant-specific styles (font, size, weight)
    colorStyle,        // Color styling
    align !== 'left' && { textAlign: align }, // Alignment (only if not default)
    bold && styles.bold, // Bold override if specified
    style,             // Custom styles from props (highest priority)
  ];

  return (
    <Text
      style={textStyle}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      testID={testID || `typography-${variant}`}
      {...rest}
    >
      {children}
    </Text>
  );
};

/**
 * Variant Styles
 * 
 * Each variant defines font family, size, weight, and line height.
 * Headlines use Fraunces (serif), body text uses Inter (sans-serif).
 */
const styles = StyleSheet.create({
  /** Display - Extra large headlines for hero sections */
  display: {
    fontFamily: 'Fraunces_700Bold', // Bold Fraunces
    fontSize: fontSizes.xxl,         // 48px
    lineHeight: fontSizes.xxl * lineHeights.tight, // 1.2x line height
    letterSpacing: -0.5,            // Tighter tracking for large text
  },
  
  /** H1 - Main page titles and important headlines */
  h1: {
    fontFamily: 'Fraunces_700Bold', // Bold Fraunces
    fontSize: fontSizes.xl,          // 36px
    lineHeight: fontSizes.xl * lineHeights.tight, // 1.2x line height
    letterSpacing: -0.5,            // Tighter tracking
  },
  
  /** H2 - Section headers */
  h2: {
    fontFamily: 'Fraunces_600SemiBold', // Semibold Fraunces
    fontSize: fontSizes.lg,              // 28px
    lineHeight: fontSizes.lg * lineHeights.tight, // 1.2x line height
  },
  
  /** H3 - Sub-section headers */
  h3: {
    fontFamily: 'Fraunces_600SemiBold', // Semibold Fraunces
    fontSize: fontSizes.md,              // 22px
    lineHeight: fontSizes.md * lineHeights.normal, // 1.5x line height
  },
  
  /** Body - Default body text for paragraphs */
  body: {
    fontFamily: 'Inter_400Regular',     // Regular Inter
    fontSize: fontSizes.base,           // 16px
    lineHeight: fontSizes.base * lineHeights.normal, // 1.5x line height
  },
  
  /** Body Small - Smaller body text for secondary content */
  bodySmall: {
    fontFamily: 'Inter_400Regular',     // Regular Inter
    fontSize: fontSizes.sm,             // 14px
    lineHeight: fontSizes.sm * lineHeights.normal, // 1.5x line height
  },
  
  /** Label - Form labels and UI text */
  label: {
    fontFamily: 'Inter_600SemiBold',    // Semibold Inter
    fontSize: fontSizes.sm,             // 14px
    lineHeight: fontSizes.sm * lineHeights.normal, // 1.5x line height
    letterSpacing: 0.5,                 // Slightly wider tracking
  },
  
  /** Caption - Small captions, hints, and metadata */
  caption: {
    fontFamily: 'Inter_400Regular',     // Regular Inter
    fontSize: fontSizes.xs,             // 12px
    lineHeight: fontSizes.xs * lineHeights.normal, // 1.5x line height
  },
  
  /** Bold modifier - makes any variant bold */
  bold: {
    fontWeight: fontWeights.bold,       // 700 weight
  },
});

/**
 * Color Styles
 * 
 * Maps color variants to theme color tokens.
 * All colors are optimized for dark theme with high contrast.
 */
const colorStyles = StyleSheet.create({
  /** Primary brand color - vibrant cyan */
  primary: {
    color: colors.primary,
  },
  
  /** Default text color - high contrast white */
  text: {
    color: colors.text,
  },
  
  /** Secondary text color - muted gray */
  secondary: {
    color: colors.textSecondary,
  },
  
  /** Tertiary text color - subtle gray */
  tertiary: {
    color: colors.textTertiary,
  },
  
  /** Error color - red for warnings and errors */
  error: {
    color: colors.error,
  },
  
  /** Success color - green for positive states */
  success: {
    color: colors.success,
  },
  
  /** Warning color - orange for caution */
  warning: {
    color: colors.warning,
  },
});

/**
 * Default export for convenience
 */
export default Typography;
