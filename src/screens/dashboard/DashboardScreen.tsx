/**
 * Dashboard Screen - Main Home Screen
 * 
 * This screen displays the user's dashboard with overview of pots, recent expenses,
 * and quick actions.
 * 
 * @module Screens/Dashboard
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography, Card, Button } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { colors, spacing } from '@constants/theme';

/**
 * Dashboard Screen Component
 * 
 * @returns {React.ReactElement} Dashboard screen UI
 */
export const DashboardScreen: React.FC = () => {
  // Get user from auth store
  const { user } = useAuthStore();
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h1" color="text">
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body" color="secondary" style={styles.subtitle}>
          Here's your expense overview
        </Typography>
      </View>
      
      {/* Quick Stats */}
      <View style={styles.section}>
        <Typography variant="h3" color="text" style={styles.sectionTitle}>
          Quick Stats
        </Typography>
        
        <Card elevation="raised" padding="lg">
          <Typography variant="body" color="secondary">
            🎯 Active Pots: 0
          </Typography>
          <Typography variant="body" color="secondary" style={styles.stat}>
            💸 Total Expenses: $0.00
          </Typography>
          <Typography variant="body" color="secondary" style={styles.stat}>
            👥 Friends: 0
          </Typography>
        </Card>
      </View>
      
      {/* Recent Activity */}
      <View style={styles.section}>
        <Typography variant="h3" color="text" style={styles.sectionTitle}>
          Recent Activity
        </Typography>
        
        <Card elevation="raised" padding="lg">
          <Typography variant="body" color="secondary" align="center">
            No recent activity
          </Typography>
        </Card>
      </View>
      
      {/* Quick Actions */}
      <View style={styles.section}>
        <Typography variant="h3" color="text" style={styles.sectionTitle}>
          Quick Actions
        </Typography>
        
        <Button variant="primary" size="md" fullWidth style={styles.actionButton}>
          Create New Pot
        </Button>
        <Button variant="secondary" size="md" fullWidth>
          Add Expense
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
  subtitle: {
    marginTop: spacing.sm,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.base,
  },
  stat: {
    marginTop: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.base,
  },
});

export default DashboardScreen;
