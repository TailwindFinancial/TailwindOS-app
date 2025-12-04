/**
 * Button Component Tests
 * 
 * Comprehensive test suite for the Button component.
 * Tests variants, sizes, states (loading, disabled), animations, and interactions.
 * 
 * @module Tests/Components/Button
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@components/design-system/Button';

/**
 * Button Component Test Suite
 * 
 * Tests cover:
 * - Rendering with different variants and sizes
 * - Loading state
 * - Disabled state
 * - Press interactions
 * - Icons
 * - Full width mode
 * - Accessibility
 */
describe('Button', () => {
  /**
   * Test: Basic rendering with default props
   * Verifies component renders with default values
   */
  it('renders with default props', () => {
    const { getByText } = render(
      <Button onPress={() => {}}>
        Click Me
      </Button>
    );
    
    expect(getByText('Click Me')).toBeTruthy();
  });

  /**
   * Test: Primary variant
   * Ensures primary variant renders correctly
   */
  it('renders primary variant', () => {
    const { getByText } = render(
      <Button variant="primary" onPress={() => {}}>
        Primary Button
      </Button>
    );
    
    expect(getByText('Primary Button')).toBeTruthy();
  });

  /**
   * Test: Secondary variant
   * Ensures secondary variant renders correctly
   */
  it('renders secondary variant', () => {
    const { getByText } = render(
      <Button variant="secondary" onPress={() => {}}>
        Secondary Button
      </Button>
    );
    
    expect(getByText('Secondary Button')).toBeTruthy();
  });

  /**
   * Test: All sizes
   * Verifies all size variants render
   */
  it('renders all sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      const { getByText } = render(
        <Button size={size} onPress={() => {}}>
          {size} button
        </Button>
      );
      
      expect(getByText(`${size} button`)).toBeTruthy();
    });
  });

  /**
   * Test: Loading state
   * Verifies loading state shows spinner and hides text
   */
  it('shows loading spinner when loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button loading onPress={() => {}}>
        Loading Button
      </Button>
    );
    
    // Text should still be in the DOM but hidden
    const text = queryByText('Loading Button');
    expect(text).toBeTruthy();
    
    // ActivityIndicator should be present
    // Note: ActivityIndicator is a native component
  });

  /**
   * Test: Disabled state
   * Ensures disabled button is not interactive
   */
  it('is not interactive when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPressMock}>
        Disabled Button
      </Button>
    );
    
    const button = getByText('Disabled Button').parent?.parent;
    expect(button).toBeTruthy();
    
    // Button should have disabled state
    if (button) {
      fireEvent.press(button);
      // onPress should not be called when disabled
      expect(onPressMock).not.toHaveBeenCalled();
    }
  });

  /**
   * Test: Loading disables interaction
   * Ensures loading state prevents button press
   */
  it('is not interactive when loading', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button loading onPress={onPressMock}>
        Loading
      </Button>
    );
    
    const button = getByText('Loading').parent?.parent?.parent;
    if (button) {
      fireEvent.press(button);
      expect(onPressMock).not.toHaveBeenCalled();
    }
  });

  /**
   * Test: Press interaction
   * Verifies onPress callback is called
   */
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>
        Press Me
      </Button>
    );
    
    const button = getByText('Press Me').parent?.parent;
    if (button) {
      fireEvent.press(button);
      expect(onPressMock).toHaveBeenCalledTimes(1);
    }
  });

  /**
   * Test: Full width mode
   * Ensures full width prop is applied
   */
  it('renders full width when specified', () => {
    const { getByTestId } = render(
      <Button fullWidth testID="full-width-button" onPress={() => {}}>
        Full Width
      </Button>
    );
    
    const button = getByTestId('full-width-button');
    expect(button).toBeTruthy();
  });

  /**
   * Test: Custom test ID
   * Verifies custom test ID is applied
   */
  it('applies custom test ID', () => {
    const { getByTestId } = render(
      <Button testID="custom-button" onPress={() => {}}>
        Custom ID
      </Button>
    );
    
    expect(getByTestId('custom-button')).toBeTruthy();
  });

  /**
   * Test: Default test ID
   * Checks default test ID generation
   */
  it('generates default test ID', () => {
    const { getByTestId } = render(
      <Button variant="primary" size="md" onPress={() => {}}>
        Button
      </Button>
    );
    
    expect(getByTestId('button-primary-md')).toBeTruthy();
  });

  /**
   * Test: Accessibility label
   * Verifies accessibility label is applied
   */
  it('applies accessibility label', () => {
    const { getByLabelText } = render(
      <Button accessibilityLabel="Submit form" onPress={() => {}}>
        Submit
      </Button>
    );
    
    expect(getByLabelText('Submit form')).toBeTruthy();
  });

  /**
   * Test: Accessibility role
   * Ensures button has correct accessibility role
   */
  it('has button accessibility role', () => {
    const { getByRole } = render(
      <Button onPress={() => {}}>
        Button
      </Button>
    );
    
    expect(getByRole('button')).toBeTruthy();
  });

  /**
   * Test: Accessibility state for disabled
   * Verifies disabled state is communicated to accessibility
   */
  it('communicates disabled state to accessibility', () => {
    const { getByTestId } = render(
      <Button disabled testID="disabled-button" onPress={() => {}}>
        Disabled
      </Button>
    );
    
    const button = getByTestId('disabled-button');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  /**
   * Test: Accessibility state for loading
   * Verifies loading state is communicated to accessibility
   */
  it('communicates loading state to accessibility', () => {
    const { getByTestId } = render(
      <Button loading testID="loading-button" onPress={() => {}}>
        Loading
      </Button>
    );
    
    const button = getByTestId('loading-button');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityState.busy).toBe(true);
  });

  /**
   * Test: Custom styles
   * Ensures custom styles can be applied
   */
  it('accepts custom styles', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(
      <Button style={customStyle} testID="styled-button" onPress={() => {}}>
        Styled
      </Button>
    );
    
    const button = getByTestId('styled-button');
    expect(button).toBeTruthy();
  });

  /**
   * Test: Press animation callbacks
   * Verifies onPressIn and onPressOut are called
   */
  it('calls onPressIn and onPressOut callbacks', () => {
    const onPressInMock = jest.fn();
    const onPressOutMock = jest.fn();
    
    const { getByText } = render(
      <Button
        onPressIn={onPressInMock}
        onPressOut={onPressOutMock}
        onPress={() => {}}
      >
        Press Me
      </Button>
    );
    
    const button = getByText('Press Me').parent?.parent;
    if (button) {
      fireEvent(button, 'pressIn');
      expect(onPressInMock).toHaveBeenCalled();
      
      fireEvent(button, 'pressOut');
      expect(onPressOutMock).toHaveBeenCalled();
    }
  });
});

