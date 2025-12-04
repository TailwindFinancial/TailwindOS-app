/**
 * Register Screen - New User Registration
 * 
 * This screen handles new user account creation.
 * Collects name, email, and password for registration.
 * 
 * @module Screens/Auth/Register
 */

import React, { useState } from 'react';
import {
  View,                       // Container
  StyleSheet,                 // Styling helper
  KeyboardAvoidingView,       // Moves form above keyboard
  Platform,                   // Platform detection
  ScrollView,                 // Allows scrolling
  Image,                      // Displays Tailwind logo
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, Button, Input } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { AuthStackParamList } from '@types';
import { colors, spacing } from '@constants/theme';

/**
 * Register Screen Props
 */
type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

/**
 * Register Screen Component
 * 
 * @param {RegisterScreenProps} props - Navigation props
 * @returns {React.ReactElement} Register screen UI
 */
export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  // Local state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Auth store
  const { register, isLoading, error } = useAuthStore();
  
  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Clear errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    
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
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    return isValid;
  };
  
  /**
   * Handle registration
   */
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    } catch (error) {
      // Error handled by store
    }
  };
  
  /**
   * Navigate back to login
   */
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };
  
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
          {/* Brand logo for consistent onboarding visuals */}
          <Image
            source={require('../../../assets/transparant-bg-logo.png')} // Transparent background logo
            style={styles.logo}                                       // Consistent sizing
            resizeMode="contain"                                      // Preserve aspect ratio
          />
          <Typography variant="h1" color="primary" align="center">
            Create Account
          </Typography>
          <Typography variant="body" color="secondary" align="center" style={styles.subtitle}>
            Join Tailwind and start tracking expenses
          </Typography>
        </View>
        
        {/* Registration Form */}
        <View style={styles.form}>
          {/* Name Input */}
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            error={nameError}
            autoCapitalize="words"
            textContentType="name"
          />
          
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
            placeholder="At least 8 characters"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            autoCapitalize="none"
            textContentType="newPassword"
          />
          
          {/* Confirm Password Input */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={confirmPasswordError}
            autoCapitalize="none"
            textContentType="newPassword"
          />
          
          {/* Store Error */}
          {error && (
            <Typography variant="bodySmall" color="error" style={styles.errorText}>
              {error}
            </Typography>
          )}
          
          {/* Register Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleRegister}
            style={styles.registerButton}
          >
            Sign Up
          </Button>
          
          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Typography variant="body" color="secondary">
              Already have an account?{' '}
            </Typography>
            <Button variant="secondary" size="sm" onPress={handleBackToLogin}>
              <Typography variant="body" color="primary">
                Log In
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  /** Logo styling for register header */
  logo: {
    width: 120,                 // Slightly smaller to fit layout
    height: 120,                // Square image
    marginBottom: spacing.base, // Space between logo and title
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  form: {
    width: '100%',
  },
  errorText: {
    marginBottom: spacing.base,
  },
  registerButton: {
    marginBottom: spacing.base,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.base,
  },
});

export default RegisterScreen;

