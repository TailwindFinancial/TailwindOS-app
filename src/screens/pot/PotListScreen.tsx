/**
 * Pot List Screen - All Pots
 * 
 * This screen displays a list of all pots the user is part of.
 * 
 * @module Screens/Pot/PotList
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, Card, Button } from '@components/design-system';
import { colors, spacing } from '@constants/theme';

/**
 * Pot List Screen Component
 * 
 * @returns {React.ReactElement} Pot list screen UI
 */
export const PotListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1" color="text">
          My Pots
        </Typography>
      </View>
      
      <View style={styles.content}>
        <Card elevation="raised" padding="lg">
          <Typography variant="body" color="secondary" align="center">
            No pots yet
          </Typography>
          <Typography variant="bodySmall" color="tertiary" align="center" style={styles.subtitle}>
            Create a pot to start tracking expenses
          </Typography>
          
          <Button variant="primary" size="md" fullWidth style={styles.button}>
            Create Your First Pot
          </Button>
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
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.base,
  },
});

export default PotListScreen;
