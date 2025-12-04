/**
 * Profile Screen - User Profile
 * 
 * Displays user profile (moved most settings to More tab).
 * Clean, minimal profile view.
 * 
 * @module Screens/Profile
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Typography, Card, Button } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const ProfileScreen: React.FC = () => {
  const { user } = useAuthStore();
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={colors.primary} />
          </View>
          <Typography variant="h1" color="text" style={styles.name}>
            {user?.name}
          </Typography>
          <Typography variant="body" color="secondary">
            {user?.email}
          </Typography>
        </View>
        
        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Typography variant="h2" color="primary">
              0
            </Typography>
            <Typography variant="caption" color="secondary" style={styles.statLabel}>
              Active Trips
            </Typography>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Typography variant="h2" color="primary">
              $0
            </Typography>
            <Typography variant="caption" color="secondary" style={styles.statLabel}>
              Total Spent
            </Typography>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Typography variant="h2" color="primary">
              0
            </Typography>
            <Typography variant="caption" color="secondary" style={styles.statLabel}>
              Friends
            </Typography>
          </View>
        </View>
        
        {/* Quick Settings */}
        <View style={styles.section}>
          <Typography variant="h3" color="text" style={styles.sectionTitle}>
            Preferences
          </Typography>
          
          <Card glass={false} elevation="flat" padding="none" style={styles.settingsCard}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primary + '15' }]}>
                  <Ionicons name="notifications-outline" size={20} color={colors.primary} />
                </View>
                <Typography variant="body" color="text">
                  Notifications
                </Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </Pressable>
            
            <View style={styles.settingDivider} />
            
            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.success + '15' }]}>
                  <Ionicons name="cash-outline" size={20} color={colors.success} />
                </View>
                <Typography variant="body" color="text">
                  Default Currency
                </Typography>
              </View>
              <Typography variant="label" color="secondary">
                {user?.preferredCurrency}
              </Typography>
            </Pressable>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary + '30',
    marginBottom: spacing.base,
  },
  name: {
    marginBottom: spacing.xs,
  },
  statsSection: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  statLabel: {
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.base,
  },
  settingsCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.border + '30',
    marginHorizontal: spacing.base,
  },
});

export default ProfileScreen;
