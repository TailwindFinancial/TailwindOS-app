/**
 * Profile Screen - User Profile & Settings
 * 
 * This screen displays user profile information and settings.
 * Includes logout functionality.
 * 
 * @module Screens/Profile
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Typography, Card, Button } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { colors, spacing } from '@constants/theme';

/**
 * Profile Screen Component
 * 
 * @returns {React.ReactElement} Profile screen UI
 */
export const ProfileScreen: React.FC = () => {
  // Get user and logout from auth store
  const { user, logout } = useAuthStore();
  
  /**
   * Handle logout with confirmation
   */
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h1" color="text">
          Profile
        </Typography>
      </View>
      
      {/* User Info */}
      <View style={styles.section}>
        <Card elevation="raised" padding="lg">
          <Typography variant="label" color="secondary">
            NAME
          </Typography>
          <Typography variant="h3" color="text" style={styles.value}>
            {user?.name}
          </Typography>
          
          <Typography variant="label" color="secondary" style={styles.label}>
            EMAIL
          </Typography>
          <Typography variant="body" color="text" style={styles.value}>
            {user?.email}
          </Typography>
          
          <Typography variant="label" color="secondary" style={styles.label}>
            PREFERRED CURRENCY
          </Typography>
          <Typography variant="body" color="text" style={styles.value}>
            {user?.preferredCurrency}
          </Typography>
        </Card>
      </View>
      
      {/* Settings */}
      <View style={styles.section}>
        <Typography variant="h3" color="text" style={styles.sectionTitle}>
          Settings
        </Typography>
        
        <Button variant="secondary" size="md" fullWidth style={styles.settingButton}>
          Edit Profile
        </Button>
        <Button variant="secondary" size="md" fullWidth style={styles.settingButton}>
          Change Password
        </Button>
        <Button variant="secondary" size="md" fullWidth style={styles.settingButton}>
          Notification Preferences
        </Button>
      </View>
      
      {/* Logout */}
      <View style={styles.section}>
        <Button variant="secondary" size="md" fullWidth onPress={handleLogout}>
          <Typography variant="label" color="error">
            Log Out
          </Typography>
        </Button>
      </View>
    </ScrollView>
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
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.base,
  },
  label: {
    marginTop: spacing.base,
  },
  value: {
    marginTop: spacing.xs,
  },
  settingButton: {
    marginBottom: spacing.base,
  },
});

export default ProfileScreen;


