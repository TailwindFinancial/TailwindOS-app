/**
 * Activity Screen - Activity Feed
 * 
 * This screen displays recent activity and expense history.
 * 
 * @module Screens/Activity
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, Card } from '@components/design-system';
import { colors, spacing } from '@constants/theme';

/**
 * Activity Screen Component
 * 
 * @returns {React.ReactElement} Activity screen UI
 */
export const ActivityScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1" color="text">
          Activity
        </Typography>
      </View>
      
      <View style={styles.content}>
        <Card elevation="raised" padding="lg">
          <Typography variant="body" color="secondary" align="center">
            No activity yet
          </Typography>
          <Typography variant="bodySmall" color="tertiary" align="center" style={styles.subtitle}>
            Your expense history will appear here
          </Typography>
        </Card>
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
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
  },
});

export default ActivityScreen;


