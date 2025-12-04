/**
 * Register Screen - Modern Account Creation
 * 
 * Clean, executive registration flow.
 * 
 * @module Screens/Auth/Register
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

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const { register, isLoading, error } = useAuthStore();
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      await register({ name: name.trim(), email: email.trim(), password });
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
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="display" color="text">
            Create Account
          </Typography>
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            Join Tailwind and manage expenses with friends
          </Typography>
        </View>
        
        {/* Registration Form */}
        <Card glass={false} elevation="flat" padding="lg" style={styles.formCard}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            error={nameError}
            autoCapitalize="words"
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            autoCapitalize="none"
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            autoCapitalize="none"
          />
          
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={confirmPasswordError}
            autoCapitalize="none"
          />
          
          {error && (
            <View style={styles.errorAlert}>
              <Ionicons name="alert-circle" size={18} color={colors.error} />
              <Typography variant="bodySmall" color="error" style={styles.errorText}>
                {error}
              </Typography>
            </View>
          )}
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleRegister}
          >
            Create Account
          </Button>
        </Card>
        
        {/* Login Prompt */}
        <View style={styles.loginPrompt}>
          <Typography variant="body" color="secondary">
            Already have an account?
          </Typography>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Typography variant="label" color="primary" style={styles.loginLink}>
              Sign in
            </Typography>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  formCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
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
  errorText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loginLink: {
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
