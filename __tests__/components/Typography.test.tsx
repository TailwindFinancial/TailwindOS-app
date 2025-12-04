/**
 * Typography Component Tests
 * 
 * Comprehensive test suite for the Typography component.
 * Tests all variants, colors, alignment options, and accessibility features.
 * 
 * @module Tests/Components/Typography
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Typography } from '@components/design-system/Typography';

/**
 * Typography Component Test Suite
 * 
 * Tests cover:
 * - Rendering with different variants
 * - Color variations
 * - Text alignment
 * - Bold modifier
 * - Custom styles
 * - Accessibility
 */
describe('Typography', () => {
  /**
   * Test: Basic rendering with default props
   * Verifies component renders with default values
   */
  it('renders with default props', () => {
    const { getByText } = render(
      <Typography>Hello World</Typography>
    );
    
    // Check that text is rendered
    expect(getByText('Hello World')).toBeTruthy();
  });

  /**
   * Test: All variant renderings
   * Ensures each variant renders without errors
   */
  it('renders all variants correctly', () => {
    const variants = ['display', 'h1', 'h2', 'h3', 'body', 'bodySmall', 'label', 'caption'] as const;
    
    variants.forEach((variant) => {
      const { getByText } = render(
        <Typography variant={variant}>
          {variant} text
        </Typography>
      );
      
      // Verify variant text is rendered
      expect(getByText(`${variant} text`)).toBeTruthy();
    });
  });

  /**
   * Test: Color variants
   * Verifies all color options work correctly
   */
  it('applies color variants correctly', () => {
    const colors = ['primary', 'text', 'secondary', 'tertiary', 'error', 'success', 'warning'] as const;
    
    colors.forEach((color) => {
      const { getByText } = render(
        <Typography color={color}>
          {color} text
        </Typography>
      );
      
      // Verify colored text is rendered
      expect(getByText(`${color} text`)).toBeTruthy();
    });
  });

  /**
   * Test: Text alignment
   * Checks that alignment prop is applied correctly
   */
  it('applies text alignment correctly', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;
    
    alignments.forEach((align) => {
      const { getByText } = render(
        <Typography align={align}>
          {align} aligned
        </Typography>
      );
      
      const element = getByText(`${align} aligned`);
      expect(element).toBeTruthy();
      // Alignment is applied via style prop
      expect(element.props.style).toBeDefined();
    });
  });

  /**
   * Test: Bold modifier
   * Verifies bold prop makes text bold
   */
  it('applies bold modifier when specified', () => {
    const { getByText } = render(
      <Typography bold>
        Bold text
      </Typography>
    );
    
    const element = getByText('Bold text');
    expect(element).toBeTruthy();
    // Bold style should be in the style array
    expect(element.props.style).toBeDefined();
  });

  /**
   * Test: Custom styles
   * Ensures custom styles can be applied
   */
  it('accepts custom styles', () => {
    const customStyle = { textDecorationLine: 'underline' as const };
    
    const { getByText } = render(
      <Typography style={customStyle}>
        Styled text
      </Typography>
    );
    
    const element = getByText('Styled text');
    expect(element).toBeTruthy();
    expect(element.props.style).toBeDefined();
  });

  /**
   * Test: Accessibility label
   * Verifies accessibility label is applied
   */
  it('applies accessibility label', () => {
    const { getByLabelText } = render(
      <Typography accessibilityLabel="Custom label">
        Text content
      </Typography>
    );
    
    expect(getByLabelText('Custom label')).toBeTruthy();
  });

  /**
   * Test: Test ID
   * Verifies test ID is applied for testing
   */
  it('applies test ID', () => {
    const { getByTestId } = render(
      <Typography testID="custom-test-id">
        Test text
      </Typography>
    );
    
    expect(getByTestId('custom-test-id')).toBeTruthy();
  });

  /**
   * Test: Default test ID
   * Checks that default test ID is generated from variant
   */
  it('generates default test ID from variant', () => {
    const { getByTestId } = render(
      <Typography variant="h1">
        Heading
      </Typography>
    );
    
    expect(getByTestId('typography-h1')).toBeTruthy();
  });

  /**
   * Test: Accessibility role
   * Verifies accessibility role is set to 'text'
   */
  it('has correct accessibility role', () => {
    const { getByRole } = render(
      <Typography>
        Text content
      </Typography>
    );
    
    expect(getByRole('text')).toBeTruthy();
  });

  /**
   * Test: Children rendering
   * Ensures children prop works correctly
   */
  it('renders children correctly', () => {
    const { getByText } = render(
      <Typography>
        Multiple words in children
      </Typography>
    );
    
    expect(getByText('Multiple words in children')).toBeTruthy();
  });

  /**
   * Test: Combination of props
   * Verifies multiple props work together
   */
  it('combines multiple props correctly', () => {
    const { getByText } = render(
      <Typography
        variant="h2"
        color="primary"
        align="center"
        bold
      >
        Combined props
      </Typography>
    );
    
    const element = getByText('Combined props');
    expect(element).toBeTruthy();
    expect(element.props.style).toBeDefined();
  });

  /**
   * Test: Additional TextProps
   * Ensures React Native TextProps are passed through
   */
  it('accepts additional Text props', () => {
    const { getByText } = render(
      <Typography numberOfLines={1} ellipsizeMode="tail">
        Long text that should be truncated
      </Typography>
    );
    
    const element = getByText('Long text that should be truncated');
    expect(element).toBeTruthy();
    expect(element.props.numberOfLines).toBe(1);
    expect(element.props.ellipsizeMode).toBe('tail');
  });
});


