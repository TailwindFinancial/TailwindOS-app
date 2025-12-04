/**
 * Login Screen - User Authentication
 * 
 * This screen handles user login with email and password.
 * It includes form validation, error handling, and navigation to register/forgot password.
 * 
 * Features:
 * - Email and password input fields
 * - Form validation
 * - Loading state during authentication
 * - Error message display
 * - Navigation to register and forgot password screens
 * - Remember me functionality (future)
 * 
 * @module Screens/Auth/Login
 */

import React, { useState } from 'react';
import {
  View,                       // Container view
  StyleSheet,                 // Styling helper
  KeyboardAvoidingView,       // Moves content above keyboard
  Platform,                   // Detect platform
  ScrollView,                 // Allows scrolling on smaller screens
  Image,                      // Displays the Tailwind logo asset
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, Button, Input } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { AuthStackParamList } from '@types';
import { colors, spacing } from '@constants/theme';

/**
 * Login Screen Props
 * Type definition for navigation props
 */
type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

/**
 * Login Screen Component
 * 
 * Renders the login form with email/password inputs.
 * Handles authentication via authStore and navigates to main app on success.
 * 
 * @param {LoginScreenProps} props - Navigation props
 * @returns {React.ReactElement} Login screen UI
 */
export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // ========== Local State ==========
  
  /** Email input value */
  const [email, setEmail] = useState('');
  
  /** Password input value */
  const [password, setPassword] = useState('');
  
  /** Email validation error */
  const [emailError, setEmailError] = useState('');
  
  /** Password validation error */
  const [passwordError, setPasswordError] = useState('');
  
  // ========== Auth Store ==========
  
  /** Get auth actions and state from store */
  const { login, isLoading, error } = useAuthStore();
  
  // ========== Validation ==========
  
  /**
   * Validate email format
   * Checks if email is valid using regex
   * 
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  const validateEmail = (email: string): boolean => {
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate form inputs
   * Checks email and password meet requirements
   * 
   * @returns {boolean} Whether form is valid
   */
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    return isValid;
  };
  
  // ========== Handlers ==========
  
  /**
   * Handle login button press
   * Validates form and attempts authentication
   */
  const handleLogin = async () => {
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    try {
      // Attempt login via auth store
      await login({ email: email.trim(), password });
      
      // Navigation is handled automatically by AppNavigator
      // when isAuthenticated changes to true
      
    } catch (error) {
      // Error is handled by auth store
      // Error message will be displayed from store.error
    }
  };
  
  /**
   * Navigate to register screen
   */
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  /**
   * Navigate to forgot password screen
   */
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  
  // ========== Render ==========
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Brand logo - replaces previous placeholder text-only header */}
          <Image
            source={require('../../../assets/transparant-bg-logo.png')} // Transparent logo asset
            style={styles.logo}                                        // Scales logo consistently
            resizeMode="contain"                                       // Preserve aspect ratio
          />
          <Typography variant="display" color="primary" align="center">
            Tailwind
          </Typography>
          <Typography variant="body" color="secondary" align="center" style={styles.subtitle}>
            Track expenses with friends
          </Typography>
        </View>
        
        {/* Login Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          
          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
          />
          
          {/* Store Error Message */}
          {error && (
            <Typography variant="bodySmall" color="error" style={styles.errorText}>
              {error}
            </Typography>
          )}
          
          {/* Forgot Password Link */}
          <Button
            variant="secondary"
            size="sm"
            onPress={handleForgotPassword}
            style={styles.forgotButton}
          >
            <Typography variant="bodySmall" color="primary">
              Forgot Password?
            </Typography>
          </Button>
          
          {/* Login Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleLogin}
            style={styles.loginButton}
          >
            Log In
          </Button>
          
          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Typography variant="body" color="secondary">
              Don't have an account?{' '}
            </Typography>
            <Button
              variant="secondary"
              size="sm"
              onPress={handleRegister}
            >
              <Typography variant="body" color="primary">
                Sign Up
              </Typography>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  /** Main container - fills screen */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /** Scroll view content */
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  
  /** Header section */
  header: {
    marginBottom: spacing.xxl,
    alignItems: 'center',
  },
  /** Logo image styling */
  logo: {
    width: 140,                 // Fixed width for consistency
    height: 140,                // Matches width for square logo
    marginBottom: spacing.base, // Space between logo and headline
  },
  
  /** Subtitle text */
  subtitle: {
    marginTop: spacing.sm,
  },
  
  /** Form container */
  form: {
    width: '100%',
  },
  
  /** Error message */
  errorText: {
    marginBottom: spacing.base,
  },
  
  /** Forgot password button */
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  
  /** Login button */
  loginButton: {
    marginBottom: spacing.base,
  },
  
  /** Register link container */
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.base,
  },
});

/**
 * Default export
 */
export default LoginScreen;
