# Tailwind Lite Architecture Documentation

This document provides a comprehensive overview of the Tailwind Lite mobile application architecture.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Application Structure](#application-structure)
4. [Data Flow](#data-flow)
5. [Navigation Architecture](#navigation-architecture)
6. [State Management](#state-management)
7. [Design System](#design-system)
8. [API Integration](#api-integration)
9. [Security Considerations](#security-considerations)

## Overview

Tailwind Lite is built using a modern React Native architecture with the following key principles:

- **Component-Based**: Modular, reusable UI components
- **Type-Safe**: Full TypeScript coverage for reliability
- **Testable**: Comprehensive test coverage for all features
- **Scalable**: Architecture supports future feature additions
- **Performant**: Optimized rendering and state management

## Technology Stack

### Core Framework
- **React Native 0.81.5**: Cross-platform mobile development
- **Expo 54**: Development platform and native API access
- **TypeScript 5.9**: Static typing and enhanced developer experience

### Navigation
- **React Navigation v7**: Industry-standard navigation library
  - Native Stack Navigator: For screen transitions
  - Bottom Tab Navigator: For main app navigation
  - Nested navigators: For complex navigation flows

### State Management
- **Zustand 5.0**: Lightweight state management
  - Simple API with hooks
  - No boilerplate required
  - Built-in persistence with AsyncStorage
  - TypeScript-first design

### UI & Styling
- **React Native Core Components**: Base UI primitives
- **Expo Linear Gradient**: Gradient backgrounds
- **Expo Blur**: Glassmorphism effects
- **React Native Reanimated 4**: Smooth animations
- **Custom Design System**: Tailwind-specific components

### Data & Storage
- **Axios**: HTTP client for API requests
- **AsyncStorage**: Local data persistence
- **Date-fns**: Date manipulation and formatting
- **Zod**: Runtime type validation

### Development Tools
- **Jest**: Testing framework
- **React Native Testing Library**: Component testing
- **Babel**: Code transformation
- **TypeScript Compiler**: Type checking

## Application Structure

### Directory Organization

```
src/
├── components/          # Reusable UI components
│   ├── design-system/   # Core design system components
│   └── shared/          # App-specific shared components
├── screens/             # Screen components (one per route)
│   ├── auth/            # Authentication flow
│   ├── dashboard/       # Main dashboard
│   ├── pot/             # Pot management
│   ├── expenses/        # Expense tracking
│   ├── wrapped/         # Trip Wrapped feature
│   └── settings/        # User settings
├── navigation/          # Navigation configuration
├── store/               # Global state management
├── services/            # API and external services
├── utils/               # Utility functions
├── constants/           # App constants (theme, config)
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

### File Naming Conventions

- **Components**: PascalCase with `.tsx` extension (e.g., `Button.tsx`)
- **Screens**: PascalCase with `Screen` suffix (e.g., `LoginScreen.tsx`)
- **Stores**: camelCase with `Store` suffix (e.g., `authStore.ts`)
- **Types**: camelCase for files (e.g., `index.ts`)
- **Utils**: camelCase for files (e.g., `formatCurrency.ts`)

## Data Flow

### Authentication Flow

```
User Input (LoginScreen)
  ↓
Validation (local)
  ↓
API Request (authService)
  ↓
Response Processing
  ↓
Update Auth Store (Zustand)
  ↓
Persist to AsyncStorage
  ↓
Navigation Update (automatic)
  ↓
Main App Rendered
```

### Expense Creation Flow

```
User Action (Add Expense)
  ↓
Optional: OCR Scan (camera)
  ↓
Form Input (AddExpenseScreen)
  ↓
Validation (Zod schema)
  ↓
API Request (expenseService)
  ↓
Update Pot Store (Zustand)
  ↓
Recalculate Balances
  ↓
Update UI (automatic re-render)
  ↓
Show Success Message
```

## Navigation Architecture

### Navigation Hierarchy

```
AppNavigator (Root)
│
├─ AuthNavigator (Stack)
│  ├─ Login
│  ├─ Register
│  └─ ForgotPassword
│
└─ MainTabNavigator (Tabs)
   ├─ Dashboard (Screen)
   ├─ Pots (Stack)
   │  ├─ PotList
   │  ├─ PotDetail
   │  ├─ CreatePot
   │  ├─ PotSettings
   │  ├─ ExpenseDetail
   │  ├─ ScanReceipt
   │  ├─ TripWrapped
   │  └─ SettleUp
   ├─ AddExpense (Screen)
   ├─ Activity (Screen)
   └─ Profile (Screen)
```

### Navigation State Management

- **AppNavigator**: Switches between Auth and Main based on `isAuthenticated`
- **Tab Navigator**: Persists active tab across app sessions
- **Stack Navigator**: Maintains navigation history within each tab
- **Deep Linking**: Supports opening specific screens via URLs

### Screen Parameters

Screens receive parameters via route props:

```typescript
type PotDetailScreenParams = {
  potId: string;
};

// Access in component:
const { potId } = route.params;
```

## State Management

### Zustand Stores

#### Auth Store (`authStore.ts`)

**Purpose**: Manages user authentication state

**State**:
- `user`: Current user object or null
- `token`: Authentication token or null
- `isAuthenticated`: Boolean authentication status
- `isLoading`: Loading state for async operations

**Actions**:
- `setAuth(user, token)`: Log in user
- `clearAuth()`: Log out user
- `updateUser(updates)`: Update user profile
- `loadAuth()`: Load saved auth from storage

**Persistence**: Automatically syncs with AsyncStorage

#### Pot Store (`potStore.ts`)

**Purpose**: Manages pots, expenses, and balances

**State**:
- `pots`: Array of user's pots
- `selectedPot`: Currently viewed pot
- `expenses`: Expenses for selected pot
- `balances`: Member balances for selected pot
- `isLoading`: Loading state
- `error`: Error message or null

**Actions**:
- `setPots(pots)`: Set pot list
- `addPot(pot)`: Add new pot
- `updatePot(id, updates)`: Update pot
- `removePot(id)`: Remove pot
- `selectPot(pot)`: Set active pot
- `setExpenses(expenses)`: Set expense list
- `addExpense(expense)`: Add new expense
- `updateExpense(id, updates)`: Update expense
- `removeExpense(id)`: Remove expense
- `setBalances(balances)`: Set member balances

### State Updates and Re-renders

Zustand automatically triggers re-renders when state changes:

```typescript
// In component:
const { pots } = usePotStore();

// When pots change anywhere, component re-renders
```

### Avoiding Unnecessary Re-renders

Use selectors to subscribe to specific state slices:

```typescript
// Only re-renders when isLoading changes
const isLoading = usePotStore(state => state.isLoading);
```

## Design System

### Component Hierarchy

```
Design System Components
├── Button
│   ├── Primary variant
│   └── Secondary variant
├── Card
│   ├── Pressable
│   └── Static
├── Input
│   ├── Text input
│   ├── Password input
│   └── Error states
├── Typography
│   ├── Display
│   ├── H1, H2, H3
│   ├── Body, BodySmall
│   ├── Label
│   └── Caption
└── LoadingSpinner
    ├── Small
    └── Large
```

### Theme System

All design tokens are centralized in `constants/theme.ts`:

- **Colors**: Predefined color palette
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Radius**: Border radius values
- **Shadows**: Shadow configurations
- **Animation**: Timing and easing functions

### Component Patterns

All design system components follow these patterns:

1. **Props Interface**: TypeScript interface for all props
2. **Documentation**: JSDoc comments for all props and functions
3. **Default Props**: Sensible defaults for optional props
4. **Variants**: Support for different visual variants
5. **Accessibility**: ARIA labels and test IDs
6. **Performance**: Optimized re-rendering with React.memo when needed

## API Integration

### Service Layer

API calls are abstracted into service files:

```
src/services/
├── api.ts           # Axios instance configuration
├── authService.ts   # Authentication endpoints
├── potService.ts    # Pot management endpoints
├── expenseService.ts # Expense endpoints
└── ocrService.ts    # OCR scanning endpoints
```

### API Client Configuration

```typescript
// Base configuration
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);
```

### Error Handling

- **Network Errors**: Show generic error message
- **Validation Errors**: Show field-specific errors
- **401 Unauthorized**: Automatically log out user
- **500 Server Error**: Show error message with retry option

## Security Considerations

### Authentication

- **JWT Tokens**: Stored securely in AsyncStorage
- **Token Expiration**: Handled via API interceptors
- **Refresh Tokens**: Implemented for long sessions
- **Secure Storage**: Consider using expo-secure-store for production

### Data Validation

- **Input Validation**: Client-side validation with Zod
- **API Validation**: Server validates all requests
- **Type Safety**: TypeScript prevents type errors

### Sensitive Data

- **Passwords**: Never stored locally
- **Payment Info**: Handled via deep links, never stored
- **User Data**: Encrypted in AsyncStorage for production

### API Security

- **HTTPS Only**: All API requests use HTTPS
- **Auth Headers**: JWT in Authorization header
- **Request Signing**: Consider HMAC signing for production

## Performance Optimizations

### Rendering Optimizations

- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize callback functions
- **useMemo**: Memoize expensive calculations
- **Lazy Loading**: Defer loading of heavy screens

### Image Optimization

- **WebP Format**: Use WebP images when possible
- **Image Caching**: Leverage React Native Image caching
- **Lazy Loading**: Load images as needed

### List Performance

- **FlatList**: Use FlatList for large lists
- **Key Props**: Unique keys for list items
- **getItemLayout**: Provide item heights for known layouts
- **windowSize**: Limit rendered items

## Testing Strategy

### Unit Tests

- **Component Tests**: Test individual components in isolation
- **Store Tests**: Test state management logic
- **Utility Tests**: Test utility functions

### Integration Tests

- **Navigation Tests**: Test navigation flows
- **Form Tests**: Test form submission and validation
- **API Tests**: Test service layer with mocked responses

### E2E Tests

- **Critical Flows**: Test complete user journeys
- **Authentication**: Test login/logout flows
- **Expense Creation**: Test adding and splitting expenses

## Deployment

### Build Process

1. **Type Check**: `npm run lint`
2. **Tests**: `npm test`
3. **Build**: `expo build:ios` or `expo build:android`
4. **Publish**: Submit to App Store / Play Store

### Environment Configuration

- **Development**: Local API, debug mode enabled
- **Staging**: Staging API, debug mode enabled
- **Production**: Production API, debug mode disabled

## Future Considerations

### Scalability

- **Code Splitting**: Implement as app grows
- **Performance Monitoring**: Add analytics
- **Error Tracking**: Integrate Sentry or similar

### Feature Additions

- **Push Notifications**: Expo Notifications
- **Biometric Auth**: Face ID / Touch ID
- **Internationalization**: Multi-language support
- **Accessibility**: Enhanced screen reader support

