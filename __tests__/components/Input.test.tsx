/**
 * Input Component Tests
 * 
 * Comprehensive test suite for the Input component.
 * Tests input types, states, validation, password toggle, and interactions.
 * 
 * @module Tests/Components/Input
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@components/design-system/Input';

/**
 * Input Component Test Suite
 * 
 * Tests cover:
 * - Rendering with different types and sizes
 * - Label display
 * - Error state
 * - Helper text
 * - Password visibility toggle
 * - Character count
 * - Disabled state
 * - Focus/blur interactions
 * - Accessibility
 */
describe('Input', () => {
  /**
   * Test: Basic rendering with default props
   * Verifies component renders with default values
   */
  it('renders with default props', () => {
    const { getByTestId } = render(
      <Input value="" onChangeText={() => {}} />
    );
    
    expect(getByTestId('input-text')).toBeTruthy();
  });

  /**
   * Test: Label display
   * Ensures label is shown when provided
   */
  it('displays label when provided', () => {
    const { getByText } = render(
      <Input label="Email Address" value="" onChangeText={() => {}} />
    );
    
    expect(getByText('Email Address')).toBeTruthy();
  });

  /**
   * Test: Placeholder text
   * Verifies placeholder is applied
   */
  it('shows placeholder text', () => {
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter your email"
        value=""
        onChangeText={() => {}}
      />
    );
    
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  /**
   * Test: Value display
   * Ensures input value is displayed
   */
  it('displays input value', () => {
    const { getByDisplayValue } = render(
      <Input value="test@example.com" onChangeText={() => {}} />
    );
    
    expect(getByDisplayValue('test@example.com')).toBeTruthy();
  });

  /**
   * Test: Text change handler
   * Verifies onChangeText is called when text changes
   */
  it('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByTestId } = render(
      <Input value="" onChangeText={onChangeTextMock} />
    );
    
    const input = getByTestId('input-text');
    fireEvent.changeText(input, 'new text');
    
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });

  /**
   * Test: Error state
   * Ensures error message is displayed
   */
  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <Input
        value=""
        onChangeText={() => {}}
        error="This field is required"
      />
    );
    
    expect(getByText('This field is required')).toBeTruthy();
  });

  /**
   * Test: Helper text
   * Verifies helper text is shown
   */
  it('displays helper text when provided', () => {
    const { getByText } = render(
      <Input
        value=""
        onChangeText={() => {}}
        helperText="Enter a valid email address"
      />
    );
    
    expect(getByText('Enter a valid email address')).toBeTruthy();
  });

  /**
   * Test: Error takes priority over helper text
   * Ensures error message is shown instead of helper text
   */
  it('shows error instead of helper text when both provided', () => {
    const { getByText, queryByText } = render(
      <Input
        value=""
        onChangeText={() => {}}
        error="Invalid email"
        helperText="Enter a valid email"
      />
    );
    
    expect(getByText('Invalid email')).toBeTruthy();
    expect(queryByText('Enter a valid email')).toBeNull();
  });

  /**
   * Test: Password type
   * Verifies password input hides text by default
   */
  it('hides text for password type', () => {
    const { getByTestId } = render(
      <Input
        type="password"
        value="secret123"
        onChangeText={() => {}}
      />
    );
    
    const input = getByTestId('input-password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  /**
   * Test: Password visibility toggle
   * Ensures password can be shown/hidden
   */
  it('toggles password visibility when toggle button pressed', () => {
    const { getByTestId, getByText } = render(
      <Input
        type="password"
        value="secret123"
        onChangeText={() => {}}
      />
    );
    
    const input = getByTestId('input-password');
    expect(input.props.secureTextEntry).toBe(true);
    
    // Find and press the toggle button
    const toggleButton = getByText('👁️‍🗨️').parent;
    if (toggleButton) {
      fireEvent.press(toggleButton);
      
      // After toggle, secureTextEntry should be false
      expect(input.props.secureTextEntry).toBe(false);
    }
  });

  /**
   * Test: Email keyboard type
   * Verifies email input uses email keyboard
   */
  it('uses email keyboard for email type', () => {
    const { getByTestId } = render(
      <Input
        type="email"
        value=""
        onChangeText={() => {}}
      />
    );
    
    const input = getByTestId('input-email');
    expect(input.props.keyboardType).toBe('email-address');
  });

  /**
   * Test: Number keyboard type
   * Verifies number input uses numeric keyboard
   */
  it('uses numeric keyboard for number type', () => {
    const { getByTestId } = render(
      <Input
        type="number"
        value=""
        onChangeText={() => {}}
      />
    );
    
    const input = getByTestId('input-number');
    expect(input.props.keyboardType).toBe('numeric');
  });

  /**
   * Test: Phone keyboard type
   * Verifies phone input uses phone pad keyboard
   */
  it('uses phone pad keyboard for phone type', () => {
    const { getByTestId } = render(
      <Input
        type="phone"
        value=""
        onChangeText={() => {}}
      />
    );
    
    const input = getByTestId('input-phone');
    expect(input.props.keyboardType).toBe('phone-pad');
  });

  /**
   * Test: Disabled state
   * Ensures disabled input is not editable
   */
  it('is not editable when disabled', () => {
    const { getByTestId } = render(
      <Input
        disabled
        value=""
        onChangeText={() => {}}
      />
    );
    
    const input = getByTestId('input-text');
    expect(input.props.editable).toBe(false);
  });

  /**
   * Test: Character count
   * Verifies character counter is shown
   */
  it('shows character count when enabled', () => {
    const { getByText } = render(
      <Input
        value="Hello"
        onChangeText={() => {}}
        maxLength={50}
        showCount
      />
    );
    
    expect(getByText('5/50')).toBeTruthy();
  });

  /**
   * Test: Max length enforcement
   * Ensures maxLength prop is applied
   */
  it('enforces max length', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={() => {}}
        maxLength={10}
      />
    );
    
    const input = getByTestId('input-text');
    expect(input.props.maxLength).toBe(10);
  });

  /**
   * Test: Focus handler
   * Verifies onFocus callback is called
   */
  it('calls onFocus when input is focused', () => {
    const onFocusMock = jest.fn();
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={() => {}}
        onFocus={onFocusMock}
      />
    );
    
    const input = getByTestId('input-text');
    fireEvent(input, 'focus');
    
    expect(onFocusMock).toHaveBeenCalled();
  });

  /**
   * Test: Blur handler
   * Verifies onBlur callback is called
   */
  it('calls onBlur when input loses focus', () => {
    const onBlurMock = jest.fn();
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={() => {}}
        onBlur={onBlurMock}
      />
    );
    
    const input = getByTestId('input-text');
    fireEvent(input, 'blur');
    
    expect(onBlurMock).toHaveBeenCalled();
  });

  /**
   * Test: All sizes
   * Verifies all size variants render
   */
  it('renders all sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <Input
          size={size}
          value=""
          onChangeText={() => {}}
          testID={`input-${size}`}
        />
      );
      
      expect(getByTestId(`input-${size}`)).toBeTruthy();
    });
  });

  /**
   * Test: Custom test ID
   * Verifies custom test ID is applied
   */
  it('applies custom test ID', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={() => {}}
        testID="custom-input"
      />
    );
    
    expect(getByTestId('custom-input')).toBeTruthy();
  });

  /**
   * Test: Accessibility label from label prop
   * Ensures accessibility label is set from label
   */
  it('uses label as accessibility label', () => {
    const { getByLabelText } = render(
      <Input
        label="Username"
        value=""
        onChangeText={() => {}}
      />
    );
    
    expect(getByLabelText('Username')).toBeTruthy();
  });

  /**
   * Test: Accessibility state for disabled
   * Verifies disabled state is communicated to accessibility
   */
  it('communicates disabled state to accessibility', () => {
    const { getByTestId } = render(
      <Input
        disabled
        value=""
        onChangeText={() => {}}
        testID="disabled-input"
      />
    );
    
    const input = getByTestId('disabled-input');
    expect(input.props.accessibilityState.disabled).toBe(true);
  });
});


