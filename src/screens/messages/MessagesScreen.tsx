/**
 * Messages Screen - Activity Feed & Notifications
 * 
 * This screen displays activity feed, notifications, and messages related to expenses and pots.
 * 
 * @module Screens/Messages
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography, Card } from '@components/design-system';
import { colors, spacing } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

/**
 * Messages Screen Component
 * 
 * @returns {React.ReactElement} Messages screen UI
 */
export const MessagesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Safe Area Padding */}
        <View style={styles.topPadding} />
        
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h1" color="text">
            Messages
          </Typography>
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            Chats & notifications
          </Typography>
        </View>
      
        {/* Empty State */}
        <View style={styles.content}>
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={colors.textTertiary} />
            <Typography variant="h3" color="secondary" align="center" style={styles.emptyTitle}>
              No Messages Yet
            </Typography>
            <Typography variant="body" color="tertiary" align="center" style={styles.emptyText}>
              Group chats and DMs will appear here
            </Typography>
          </View>
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
  
  /** Top padding */
  topPadding: {
    height: 60,
  },
  
  /** Header section */
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
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

export default MessagesScreen;

