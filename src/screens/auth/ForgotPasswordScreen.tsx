/**
 * Forgot Password Screen - Password Reset
 * 
 * Modern, executive password reset flow.
 * 
 * @module Screens/Auth/ForgotPassword
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, Button, Input, Card } from '@components/design-system';
import { AuthStackParamList } from '@types';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleResetPassword = async () => {
    setEmailError('');
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };
  
  if (isSuccess) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color={colors.success} />
          </View>
          <Typography variant="h1" color="text" align="center" style={styles.successTitle}>
            Check Your Email
          </Typography>
          <Typography variant="body" color="secondary" align="center" style={styles.successText}>
            We sent password reset instructions to
          </Typography>
          <Typography variant="label" color="text" align="center" style={styles.email}>
            {email}
          </Typography>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('Login')}
            style={styles.backButton}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="display" color="text">
            Reset Password
          </Typography>
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            Enter your email to receive reset instructions
          </Typography>
        </View>
        
        {/* Form */}
        <Card glass={false} elevation="flat" padding="lg" style={styles.formCard}>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            autoCapitalize="none"
          />
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleResetPassword}
          >
            Send Reset Link
          </Button>
        </Card>
        
        {/* Back to Login */}
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.backLink}>
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
          <Typography variant="label" color="primary" style={styles.backText}>
            Back to Sign In
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    width: '100%',
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
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  backText: {
    textDecorationLine: 'underline',
  },
  successIcon: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successTitle: {
    marginBottom: spacing.base,
  },
  successText: {
    marginBottom: spacing.xs,
  },
  email: {
    marginBottom: spacing.xl,
  },
  backButton: {
    marginTop: spacing.base,
  },
});

export default ForgotPasswordScreen;
