/**
 * Move Money Screen - Settlements & Transfers
 * 
 * This screen handles settling debts and moving money between members.
 * 
 * @module Screens/MoveMoney
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography, Card, Button } from '@components/design-system';
import { colors, spacing } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

/**
 * Move Money Screen Component
 * 
 * @returns {React.ReactElement} Move money screen UI
 */
export const MoveMoneyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h1" color="text">
          Move Money
        </Typography>
        <Typography variant="body" color="secondary" style={styles.subtitle}>
          Settle expenses & send payments
        </Typography>
      </View>
      
      {/* Empty State */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.emptyState}>
          <Ionicons name="swap-horizontal-outline" size={64} color={colors.textTertiary} />
          <Typography variant="h3" color="secondary" align="center" style={styles.emptyTitle}>
            No Outstanding Balances
          </Typography>
          <Typography variant="body" color="tertiary" align="center" style={styles.emptyText}>
            You're all settled up!
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  /** Main container */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /** Header section */
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  /** Subtitle */
  subtitle: {
    marginTop: spacing.xs,
  },
  
  /** Content area */
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  
  /** Empty state container */
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  
  /** Empty state title */
  emptyTitle: {
    marginTop: spacing.lg,
  },
  
  /** Empty state text */
  emptyText: {
    marginTop: spacing.sm,
  },
});

export default MoveMoneyScreen;

