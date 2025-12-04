/**
 * Forgot Password Screen - Password Reset
 * 
 * This screen handles password reset requests.
 * User enters email and receives reset instructions.
 * 
 * @module Screens/Auth/ForgotPassword
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, Button, Input } from '@components/design-system';
import { AuthStackParamList } from '@types';
import { colors, spacing } from '@constants/theme';

/**
 * Forgot Password Screen Props
 */
type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

/**
 * Forgot Password Screen Component
 * 
 * @param {ForgotPasswordScreenProps} props - Navigation props
 * @returns {React.ReactElement} Forgot password screen UI
 */
export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  // Local state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  /**
   * Validate email
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Handle password reset request
   */
  const handleResetPassword = async () => {
    // Clear error
    setEmailError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Show success message
    setIsSuccess(true);
  };
  
  /**
   * Navigate back to login
   */
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };
  
  // Success view
  if (isSuccess) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Typography variant="h1" color="success" align="center">
            Check Your Email
          </Typography>
          <Typography variant="body" color="secondary" align="center" style={styles.message}>
            We've sent password reset instructions to {email}
          </Typography>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleBackToLogin}
            style={styles.button}
          >
            Back to Login
          </Button>
        </View>
      </View>
    );
  }
  
  // Reset form view
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h1" color="primary" align="center">
          Reset Password
        </Typography>
        <Typography variant="body" color="secondary" align="center" style={styles.message}>
          Enter your email and we'll send you instructions to reset your password
        </Typography>
        
        {/* Email Input */}
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        {/* Reset Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          onPress={handleResetPassword}
          style={styles.button}
        >
          Send Reset Link
        </Button>
        
        {/* Back to Login */}
        <Button variant="secondary" size="sm" onPress={handleBackToLogin}>
          <Typography variant="body" color="primary">
            Back to Login
          </Typography>
        </Button>
      </View>
    </View>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  content: {
    width: '100%',
  },
  message: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.base,
  },
});

export default ForgotPasswordScreen;

