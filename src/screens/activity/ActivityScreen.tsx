/**
 * Activity Screen - Recent Transactions & History
 * 
 * Modern feed of recent expense activity.
 * 
 * @module Screens/Activity
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography, Card } from '@components/design-system';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const ActivityScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h1" color="text">
          Activity
        </Typography>
        <Typography variant="body" color="secondary" style={styles.subtitle}>
          Recent expense history
        </Typography>
      </View>
      
      {/* Empty State */}
      <ScrollView contentContainerStyle={styles.content}>
        <Card glass={false} elevation="flat" padding="xl" style={styles.emptyCard}>
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="receipt-outline" size={56} color={colors.primary} />
            </View>
            <Typography variant="h2" color="text" align="center" style={styles.emptyTitle}>
              No Activity Yet
            </Typography>
            <Typography variant="body" color="secondary" align="center">
              Your expense history will appear here
            </Typography>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    marginBottom: spacing.sm,
  },
});

export default ActivityScreen;
