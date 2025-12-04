/**
 * Login Screen - Modern Executive Authentication
 * 
 * Clean, minimal, executive login experience.
 * No clutter, just beautiful form design with smooth interactions.
 * 
 * @module Screens/Auth/Login
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, Button, Input, Card } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { AuthStackParamList } from '@types';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

/** Login Screen Props */
type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

/**
 * Login Screen Component
 * Modern, executive authentication experience
 */
export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Auth store
  const { login, isLoading, error } = useAuthStore();
  
  /** Validate email */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /** Validate form */
  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    return isValid;
  };
  
  /** Handle login */
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      await login({ email: email.trim(), password });
    } catch (error) {
      // Error handled by store
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Modern Header */}
        <View style={styles.header}>
          <Typography variant="display" color="text">
            Welcome back
          </Typography>
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            Sign in to your account
          </Typography>
        </View>
        
        {/* Login Form - Clean Card */}
        <Card glass={false} elevation="flat" padding="lg" style={styles.formCard}>
          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            autoCapitalize="none"
          />
          
          {/* Forgot Password */}
          <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
            <Typography variant="bodySmall" color="primary">
              Forgot password?
            </Typography>
          </Pressable>
          
          {/* Error Alert */}
          {error && (
            <View style={styles.errorAlert}>
              <Ionicons name="alert-circle" size={18} color={colors.error} />
              <Typography variant="bodySmall" color="error" style={styles.errorText}>
                {error}
              </Typography>
            </View>
          )}
          
          {/* Sign In Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleLogin}
          >
            Sign In
          </Button>
        </Card>
        
        {/* Register Prompt */}
        <View style={styles.registerPrompt}>
          <Typography variant="body" color="secondary">
            New to Tailwind?
          </Typography>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Typography variant="label" color="primary" style={styles.registerLink}>
              Create account
            </Typography>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/**
 * Styles - Modern Executive Design
 */
const styles = StyleSheet.create({
  /** Container */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /** Scroll content */
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  
  /** Header */
  header: {
    marginBottom: spacing.xxl,
  },
  
  /** Subtitle */
  subtitle: {
    marginTop: spacing.sm,
  },
  
  /** Form card */
  formCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  
  /** Forgot password */
  forgot: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  
  /** Error alert */
  errorAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '10',
    padding: spacing.base,
    borderRadius: borderRadius.md,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.error + '30',
  },
  
  /** Error text */
  errorText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  
  /** Register prompt */
  registerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  
  /** Register link */
  registerLink: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
