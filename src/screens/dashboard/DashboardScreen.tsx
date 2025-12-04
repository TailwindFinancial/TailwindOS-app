/**
 * Dashboard Screen - Modern Executive Home Screen
 * 
 * Beautiful, modern dashboard with:
 * - Spending overview with circular progress charts
 * - Active trips summary
 * - Recent expense feed
 * - Quick stats cards
 * - Clean, executive design with gen-z appeal
 * 
 * @module Screens/Dashboard
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { Typography, Card, CircularProgress } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen width for responsive layouts
const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Stat Card Component
 * Beautiful integrated card for displaying statistics
 */
interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.statContent}>
        <Typography variant="caption" color="tertiary">
          {label}
        </Typography>
        <Typography variant="h3" color="text" style={styles.statValue}>
          {value}
        </Typography>
      </View>
    </View>
  );
};

/**
 * Dashboard Screen Component
 * 
 * @returns {React.ReactElement} Modern, executive dashboard UI
 */
export const DashboardScreen: React.FC = () => {
  // Get user from auth store
  const { user } = useAuthStore();
  
  // Mock data for demonstration
  const monthlyBudget = 2000;
  const spent = 650;
  const progress = spent / monthlyBudget;
  
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting Header */}
      <View style={styles.greeting}>
        <Typography variant="body" color="secondary">
          Good morning,
        </Typography>
        <Typography variant="h1" color="text" style={styles.name}>
          {user?.name?.split(' ')[0]}
        </Typography>
      </View>
      
      {/* Spending Overview Card with Circular Progress */}
      <View style={styles.section}>
        <Card glass={false} elevation="flat" padding="lg" style={styles.spendingCard}>
          <LinearGradient
            colors={[colors.primary + '20', colors.primary + '05']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          
          <View style={styles.spendingContent}>
            {/* Circular Progress Ring */}
            <CircularProgress
              progress={progress}
              size={140}
              strokeWidth={14}
              color={colors.primary}
              trackColor={colors.surface}
              showPercentage={false}
              label={`$${spent}`}
            />
            
            {/* Spending Details */}
            <View style={styles.spendingDetails}>
              <Typography variant="label" color="secondary">
                Monthly Spending
              </Typography>
              <Typography variant="h2" color="text" style={styles.spendingAmount}>
                ${spent.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="tertiary">
                of ${monthlyBudget.toLocaleString()} budget
              </Typography>
              
              {/* Progress Bar */}
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${progress * 100}%` }
                  ]} 
                />
              </View>
              
              <Typography variant="caption" color="success">
                ${(monthlyBudget - spent).toLocaleString()} remaining
              </Typography>
            </View>
          </View>
        </Card>
      </View>
      
      {/* Quick Stats Grid */}
      <View style={styles.section}>
        <View style={styles.statsGrid}>
          <StatCard
            icon="calendar-outline"
            label="This Month"
            value="$650"
            color={colors.primary}
          />
          <StatCard
            icon="trending-up-outline"
            label="vs Last Month"
            value="+12%"
            color={colors.success}
          />
        </View>
        <View style={styles.statsGrid}>
          <StatCard
            icon="people-outline"
            label="Active Trips"
            value="0"
            color={colors.info}
          />
          <StatCard
            icon="receipt-outline"
            label="Total Expenses"
            value="0"
            color={colors.warning}
          />
        </View>
      </View>
      
      {/* Active Trips Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color="text">
            Active Trips
          </Typography>
          <Pressable>
            <Typography variant="label" color="primary">
              See All
            </Typography>
          </Pressable>
        </View>
        
        {/* Empty State */}
        <Card elevation="flat" padding="lg" style={styles.emptyCard}>
          <View style={styles.emptyState}>
            <Ionicons name="airplane-outline" size={48} color={colors.textTertiary} />
            <Typography variant="body" color="secondary" align="center" style={styles.emptyText}>
              No active trips
            </Typography>
            <Typography variant="caption" color="tertiary" align="center">
              Create a trip to start tracking expenses
            </Typography>
          </View>
        </Card>
      </View>
      
      {/* Recent Activity Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color="text">
            Recent Activity
          </Typography>
        </View>
        
        <Card elevation="flat" padding="lg" style={styles.emptyCard}>
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color={colors.textTertiary} />
            <Typography variant="body" color="secondary" align="center" style={styles.emptyText}>
              No recent activity
            </Typography>
            <Typography variant="caption" color="tertiary" align="center">
              Your expense history will appear here
            </Typography>
          </View>
        </Card>
      </View>
      
      {/* Bottom spacing for tab bar */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

/**
 * Styles - Modern, Executive, Clean
 */
const styles = StyleSheet.create({
  /** Main container */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /** Greeting section */
  greeting: {
    padding: spacing.lg,
    paddingTop: spacing.base,
  },
  
  /** User name */
  name: {
    marginTop: spacing.xs,
  },
  
  /** Section container */
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.base,
  },
  
  /** Section header */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  
  /** Spending card */
  spendingCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  
  /** Spending content */
  spendingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  /** Spending details */
  spendingDetails: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  
  /** Spending amount */
  spendingAmount: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  
  /** Progress bar container */
  progressBar: {
    height: 4,
    backgroundColor: colors.surface,
    borderRadius: 2,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  
  /** Progress bar fill */
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  
  /** Stats grid */
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  
  /** Individual stat card */
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  /** Stat icon container */
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  
  /** Stat content */
  statContent: {
    flex: 1,
  },
  
  /** Stat value */
  statValue: {
    marginTop: 2,
  },
  
  /** Empty card */
  emptyCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  
  /** Empty state */
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  
  /** Empty text */
  emptyText: {
    marginTop: spacing.base,
  },
  
  /** Bottom spacer for tab bar */
  bottomSpacer: {
    height: spacing.xxxl,
  },
});

export default DashboardScreen;
