/**
 * Theme Constants - Design System Foundation
 * 
 * This file defines all visual design tokens for the Tailwind app.
 * It provides a centralized, consistent design language across all components.
 * 
 * Categories:
 * - Colors: Primary palette, semantic colors, and neutral shades
 * - Typography: Font families, sizes, weights, and line heights
 * - Spacing: Consistent spacing scale based on 4px grid
 * - Border Radius: Corner radius values for different component sizes
 * - Shadows: Elevation and depth for UI elements
 * - Animation: Timing and easing functions for transitions
 * 
 * All values are carefully chosen to create a cohesive, beautiful user interface
 * with excellent contrast and accessibility.
 * 
 * @module Theme
 */

// ============================================================================
// Colors
// ============================================================================

/**
 * Color Palette
 * 
 * Primary: Vibrant cyan (#5DD9D2) - Used for CTAs, highlights, and brand identity
 * Secondary: Deep blue-gray (#2E3A59) - Used for secondary actions and backgrounds
 * Background: Pure black (#000000) - Main app background for OLED displays
 * Surface: Dark gray (#1A1A1A) - Card and component backgrounds
 * 
 * Color choices prioritize:
 * - High contrast for readability
 * - OLED-friendly dark theme
 * - Vibrant accent colors that pop
 * - Professional, modern aesthetic
 */
export const colors = {
  // ========== Primary Colors ==========
  
  /** Primary brand color - vibrant cyan */
  primary: '#5DD9D2',
  
  /** Lighter variant of primary (hover states, disabled) */
  primaryLight: '#7FE5DF',
  
  /** Darker variant of primary (pressed states) */
  primaryDark: '#3AB5AF',
  
  /** Secondary brand color - deep blue-gray */
  secondary: '#2E3A59',
  
  /** Lighter variant of secondary */
  secondaryLight: '#3F4E73',
  
  /** Darker variant of secondary */
  secondaryDark: '#1F2740',
  
  // ========== Background Colors ==========
  
  /** Main app background - pure black for OLED */
  background: '#000000',
  
  /** Surface color for cards and elevated components */
  surface: '#1A1A1A',
  
  /** Slightly elevated surface (layered cards) */
  surfaceElevated: '#242424',
  
  /** Overlay/modal background (semi-transparent) */
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // ========== Text Colors ==========
  
  /** Primary text color - high contrast white */
  text: '#FFFFFF',
  
  /** Secondary text color - muted gray */
  textSecondary: '#A0A0A0',
  
  /** Tertiary text color - subtle gray */
  textTertiary: '#666666',
  
  /** Disabled text color */
  textDisabled: '#444444',
  
  // ========== Semantic Colors ==========
  
  /** Success green - for positive actions and confirmations */
  success: '#4CAF50',
  
  /** Success green (light variant) */
  successLight: '#66BB6A',
  
  /** Error red - for warnings and destructive actions */
  error: '#F44336',
  
  /** Error red (light variant) */
  errorLight: '#EF5350',
  
  /** Warning orange - for cautionary messages */
  warning: '#FF9800',
  
  /** Warning orange (light variant) */
  warningLight: '#FFA726',
  
  /** Info blue - for informational messages */
  info: '#2196F3',
  
  /** Info blue (light variant) */
  infoLight: '#42A5F5',
  
  // ========== Border Colors ==========
  
  /** Default border color */
  border: '#333333',
  
  /** Lighter border (hover states) */
  borderLight: '#444444',
  
  /** Focus state border */
  borderFocus: '#5DD9D2',
  
  // ========== Glassmorphism Effect ==========
  
  /** Glass surface with blur effect */
  glass: 'rgba(255, 255, 255, 0.05)',
  
  /** Glass border for elevated feel */
  glassBorder: 'rgba(255, 255, 255, 0.1)',
} as const;

// ============================================================================
// Typography
// ============================================================================

/**
 * Font Families
 * 
 * Fraunces: Serif display font for headlines and prominent text
 * Inter: Sans-serif body font for readable paragraph text
 * 
 * These fonts work together to create visual hierarchy while maintaining
 * excellent readability across all screen sizes.
 */
export const fontFamilies = {
  /** Display font for headlines (Fraunces Variable) */
  display: 'Fraunces',
  
  /** Body font for content (Inter Variable) */
  body: 'Inter',
  
  /** Monospace font for code and numbers */
  mono: 'Courier New',
} as const;

/**
 * Font Sizes
 * 
 * Scale follows a consistent ratio for visual harmony.
 * Sizes are optimized for mobile readability (44pt touch targets, etc.)
 */
export const fontSizes = {
  /** Extra extra large - hero text */
  xxl: 48,
  
  /** Extra large - main headlines */
  xl: 36,
  
  /** Large - section headers */
  lg: 28,
  
  /** Medium large - sub-headers */
  md: 22,
  
  /** Base size - body text */
  base: 16,
  
  /** Small - secondary text */
  sm: 14,
  
  /** Extra small - captions and labels */
  xs: 12,
  
  /** Extra extra small - tiny labels */
  xxs: 10,
} as const;

/**
 * Font Weights
 * 
 * Using variable fonts allows any weight, but these are the primary values
 * we use for consistent typography hierarchy.
 */
export const fontWeights = {
  /** Light weight - 300 */
  light: '300' as const,
  
  /** Regular weight - 400 */
  regular: '400' as const,
  
  /** Medium weight - 500 */
  medium: '500' as const,
  
  /** Semibold weight - 600 */
  semibold: '600' as const,
  
  /** Bold weight - 700 */
  bold: '700' as const,
  
  /** Extra bold weight - 800 */
  extrabold: '800' as const,
} as const;

/**
 * Line Heights
 * 
 * Optimized for readability and visual balance.
 * Headlines use tighter leading, body text uses more generous spacing.
 */
export const lineHeights = {
  /** Tight line height for headlines */
  tight: 1.2,
  
  /** Normal line height for body text */
  normal: 1.5,
  
  /** Relaxed line height for longer paragraphs */
  relaxed: 1.75,
} as const;

// ============================================================================
// Spacing
// ============================================================================

/**
 * Spacing Scale
 * 
 * Based on a 4px grid system for consistent, predictable spacing.
 * All layout spacing should use these values for visual harmony.
 * 
 * Usage: margin, padding, gap, etc.
 */
export const spacing = {
  /** 4px - minimal spacing */
  xs: 4,
  
  /** 8px - small spacing */
  sm: 8,
  
  /** 12px - compact spacing */
  md: 12,
  
  /** 16px - default spacing */
  base: 16,
  
  /** 24px - comfortable spacing */
  lg: 24,
  
  /** 32px - large spacing */
  xl: 32,
  
  /** 48px - extra large spacing */
  xxl: 48,
  
  /** 64px - huge spacing for major sections */
  xxxl: 64,
} as const;

// ============================================================================
// Border Radius
// ============================================================================

/**
 * Border Radius Values
 * 
 * Creates consistent, modern rounded corners across all components.
 * Smaller radii for buttons, larger for cards and modals.
 */
export const borderRadius = {
  /** No radius - sharp corners */
  none: 0,
  
  /** Small radius - tight curves */
  sm: 6,
  
  /** Medium radius - default for most elements */
  md: 12,
  
  /** Large radius - cards and containers */
  lg: 16,
  
  /** Extra large radius - modals and sheets */
  xl: 24,
  
  /** Full radius - circular elements (avatars, pills) */
  full: 9999,
} as const;

// ============================================================================
// Shadows
// ============================================================================

/**
 * Shadow Definitions
 * 
 * Creates depth and elevation for UI components.
 * Subtle shadows maintain the dark theme aesthetic while providing structure.
 */
export const shadows = {
  /** No shadow */
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  /** Small shadow - slightly elevated */
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  
  /** Medium shadow - cards and buttons */
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  /** Large shadow - modals and overlays */
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  
  /** Extra large shadow - high elevation */
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

// ============================================================================
// Animation
// ============================================================================

/**
 * Animation Timing
 * 
 * Consistent animation durations for smooth, predictable transitions.
 * Faster for micro-interactions, slower for major state changes.
 */
export const animation = {
  /** Duration values in milliseconds */
  duration: {
    /** 150ms - instant feedback (button press) */
    fast: 150,
    
    /** 250ms - standard transitions */
    normal: 250,
    
    /** 400ms - slower, more dramatic transitions */
    slow: 400,
  },
  
  /** Easing functions for natural motion */
  easing: {
    /** Standard ease - balanced acceleration/deceleration */
    standard: 'ease-in-out',
    
    /** Ease out - decelerating motion (entering elements) */
    out: 'ease-out',
    
    /** Ease in - accelerating motion (exiting elements) */
    in: 'ease-in',
    
    /** Linear - constant speed (loaders, progress bars) */
    linear: 'linear',
  },
} as const;

// ============================================================================
// Component-Specific Sizes
// ============================================================================

/**
 * Button Heights
 * Ensures touch targets meet accessibility guidelines (minimum 44pt)
 */
export const buttonHeight = {
  /** Small button - 36px */
  sm: 36,
  
  /** Medium button (default) - 48px */
  md: 48,
  
  /** Large button - 56px */
  lg: 56,
} as const;

/**
 * Input Heights
 * Consistent sizing for form inputs
 */
export const inputHeight = {
  /** Small input - 36px */
  sm: 36,
  
  /** Medium input (default) - 48px */
  md: 48,
  
  /** Large input - 56px */
  lg: 56,
} as const;

/**
 * Icon Sizes
 * Standard sizes for icons and glyphs
 */
export const iconSize = {
  /** Extra small icon - 12px */
  xs: 12,
  
  /** Small icon - 16px */
  sm: 16,
  
  /** Medium icon - 24px */
  md: 24,
  
  /** Large icon - 32px */
  lg: 32,
  
  /** Extra large icon - 48px */
  xl: 48,
} as const;

// ============================================================================
// Exports
// ============================================================================

/**
 * Complete theme object
 * Combines all theme constants into a single exportable object
 */
export const theme = {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  borderRadius,
  shadows,
  animation,
  buttonHeight,
  inputHeight,
  iconSize,
} as const;

/**
 * Default export for convenience
 * Usage: import theme from '@constants/theme'
 */
export default theme;
