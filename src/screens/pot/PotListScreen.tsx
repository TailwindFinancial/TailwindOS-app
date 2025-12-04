/**
 * Trips Screen - Expense Groups & Pots
 * 
 * Modern, executive display of all trips (expense groups).
 * Beautiful card-based layout with stats and quick actions.
 * 
 * @module Screens/Pot/PotList
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Typography, Card, Button } from '@components/design-system';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Trip Card Component
 * Beautiful card for displaying trip info
 */
interface TripCardProps {
  name: string;
  totalSpent: number;
  currency: string;
  membersCount: number;
  color: string;
}

const TripCard: React.FC<TripCardProps> = ({ name, totalSpent, currency, membersCount, color }) => {
  return (
    <Pressable style={styles.tripCard}>
      <LinearGradient
        colors={[color + '20', color + '05']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.tripContent}>
        <View style={styles.tripHeader}>
          <View>
            <Typography variant="h3" color="text">
              {name}
            </Typography>
            <View style={styles.tripMeta}>
              <Ionicons name="people" size={14} color={colors.textSecondary} />
              <Typography variant="caption" color="secondary" style={styles.tripMetaText}>
                {membersCount} members
              </Typography>
            </View>
          </View>
          <View style={[styles.tripIcon, { backgroundColor: color + '20' }]}>
            <Ionicons name="airplane" size={24} color={color} />
          </View>
        </View>
        
        <View style={styles.tripFooter}>
          <View>
            <Typography variant="caption" color="tertiary">
              Total Spent
            </Typography>
            <Typography variant="h2" color="text" style={styles.tripAmount}>
              {currency}{totalSpent.toLocaleString()}
            </Typography>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
      </View>
    </Pressable>
  );
};

/**
 * Trips Screen Component
 */
export const PotListScreen: React.FC = () => {
  // Mock data for demonstration
  const mockTrips = [
    // Empty for now - will show empty state
  ];
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with action */}
        <View style={styles.header}>
          <View>
            <Typography variant="h1" color="text">
              Trips
            </Typography>
            <Typography variant="body" color="secondary" style={styles.headerSubtitle}>
              {mockTrips.length} active {mockTrips.length === 1 ? 'trip' : 'trips'}
            </Typography>
          </View>
          <Pressable style={styles.addButton}>
            <Ionicons name="add-circle" size={32} color={colors.primary} />
          </Pressable>
        </View>
        
        {/* Content */}
        {mockTrips.length === 0 ? (
          // Empty State
          <View style={styles.emptyContainer}>
            <Card glass={false} elevation="flat" padding="xl" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIconContainer}>
                  <Ionicons name="airplane-outline" size={64} color={colors.primary} />
                </View>
                <Typography variant="h2" color="text" align="center" style={styles.emptyTitle}>
                  No Trips Yet
                </Typography>
                <Typography variant="body" color="secondary" align="center" style={styles.emptyText}>
                  Create your first trip to start tracking shared expenses with friends
                </Typography>
                <Button variant="primary" size="lg" fullWidth style={styles.emptyButton}>
                  <Ionicons name="add" size={20} color={colors.background} style={styles.buttonIcon} />
                  Create Your First Trip
                </Button>
              </View>
            </Card>
          </View>
        ) : (
          // Trip List
          <View style={styles.tripList}>
            {mockTrips.map((trip, index) => (
              <TripCard key={index} {...trip} />
            ))}
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.lg,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerSubtitle: {
    marginTop: spacing.xs,
  },
  addButton: {
    padding: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    marginBottom: spacing.base,
  },
  emptyText: {
    marginBottom: spacing.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  tripList: {
    padding: spacing.lg,
  },
  tripCard: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  tripContent: {
    padding: spacing.lg,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  tripMetaText: {
    marginLeft: spacing.xs,
  },
  tripIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border + '30',
  },
  tripAmount: {
    marginTop: spacing.xs,
  },
});

export default PotListScreen;
