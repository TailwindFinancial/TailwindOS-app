# File Structure Documentation

This document provides a detailed explanation of every file and directory in the Tailwind Lite mobile app project.

## Root Directory

### Configuration Files

#### `package.json`
- **Purpose**: Defines project dependencies and npm scripts
- **Key Dependencies**: 
  - React Native, Expo for mobile development
  - React Navigation for routing
  - Zustand for state management
  - Testing libraries (Jest, React Native Testing Library)
- **Scripts**:
  - `start`: Launch Expo development server
  - `test`: Run Jest test suite
  - `lint`: Run TypeScript type checking

#### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Key Settings**:
  - Strict mode enabled for type safety
  - Path aliases configured (`@components`, `@screens`, etc.)
  - Includes source files and Expo type definitions

#### `babel.config.js`
- **Purpose**: Babel transpiler configuration
- **Key Features**:
  - Expo preset for React Native support
  - Module resolver for path aliases
  - React Native Reanimated plugin for animations

#### `jest.config.js`
- **Purpose**: Jest testing framework configuration
- **Key Settings**:
  - Uses jest-expo preset
  - Path aliases for imports in tests
  - Coverage thresholds (70% minimum)
  - Test file patterns and exclusions

#### `app.json`
- **Purpose**: Expo configuration file
- **Key Settings**:
  - App name, slug, version
  - Dark mode UI style
  - Camera and photo library permissions
  - iOS and Android specific configurations
  - Deep linking scheme (`tailwind://`)

#### `.gitignore`
- **Purpose**: Specifies files Git should ignore
- **Ignored Items**:
  - `node_modules/`: Dependencies
  - Build artifacts (iOS, Android builds)
  - Environment variables (`.env`)
  - OS-specific files (`.DS_Store`)
  - Expo cache

### Entry Point

#### `App.tsx`
- **Purpose**: Main application entry point
- **Functionality**:
  - Renders the AppNavigator component
  - Sets up dark mode status bar
  - First component loaded when app starts

#### `index.ts`
- **Purpose**: Expo entry point that registers the app
- **Functionality**: Imports and registers the App component

## Source Directory (`src/`)

### Components (`src/components/`)

#### Design System (`src/components/design-system/`)

##### `Button.tsx`
- **Purpose**: Reusable button component
- **Features**:
  - Primary and secondary variants
  - Loading state with spinner
  - Disabled state
  - Press animations using Reanimated
  - Full width option
- **Props**:
  - `title`: Button text
  - `onPress`: Click handler
  - `variant`: 'primary' | 'secondary'
  - `loading`: Shows spinner
  - `disabled`: Disables button
  - `fullWidth`: Makes button full width

##### `Card.tsx`
- **Purpose**: Container component with elevated styling
- **Features**:
  - Gradient background
  - Glassmorphism effect
  - Optional press animation
  - Configurable padding and radius
  - Pressable variant for interactive cards
- **Props**:
  - `children`: Card content
  - `onPress`: Makes card pressable
  - `animated`: Enable/disable animations
  - `padding`: 'none' | 'sm' | 'md' | 'lg'
  - `radius`: Border radius size

##### `Typography.tsx`
- **Purpose**: Text components for consistent typography
- **Components**:
  - `Display`: Large hero text (Fraunces font)
  - `H1`, `H2`, `H3`: Heading components
  - `Body`, `BodySmall`: Body text variants
  - `Label`: Small uppercase labels
  - `Caption`: Very small text for metadata
- **Props** (all components):
  - `children`: Text content
  - `color`: Text color
  - `align`: Text alignment
  - `numberOfLines`: Line truncation

##### `Input.tsx`
- **Purpose**: Text input component with validation
- **Features**:
  - Optional label
  - Error message display
  - Helper text
  - Password visibility toggle
  - Focus/blur states
  - Glassmorphism background
- **Props**:
  - `label`: Input label
  - `error`: Error message
  - `helperText`: Helper text
  - `secureTextEntry`: Password mode
  - All standard TextInput props

##### `LoadingSpinner.tsx`
- **Purpose**: Loading indicator component
- **Features**:
  - Small and large sizes
  - Optional loading text
  - Full-screen overlay mode
  - Customizable color
- **Props**:
  - `size`: 'small' | 'large'
  - `color`: Spinner color
  - `text`: Loading message
  - `fullScreen`: Full-screen mode

##### `index.ts`
- **Purpose**: Exports all design system components
- **Usage**: Allows single import for all components

### Screens (`src/screens/`)

#### Authentication (`src/screens/auth/`)

##### `LoginScreen.tsx`
- **Purpose**: User login screen
- **Features**:
  - Email and password inputs with validation
  - Error handling
  - "Forgot password" link
  - "Sign up" link
  - Form validation (email format, password length)
  - Loading state during authentication
- **Navigation**:
  - Navigates to Register screen
  - Navigates to ForgotPassword screen
  - Auto-navigates to main app on successful login

##### `RegisterScreen.tsx`
- **Purpose**: New user registration screen
- **Features**:
  - Name, email, password, confirm password inputs
  - Form validation (all fields required)
  - Password matching validation
  - Error handling
  - Loading state
- **Navigation**:
  - Navigates back to Login screen
  - Auto-navigates to main app on successful registration

##### `ForgotPasswordScreen.tsx`
- **Purpose**: Password reset request screen
- **Features**:
  - Email input
  - Email validation
  - Success state after submission
  - Back button to login
- **Navigation**:
  - Navigates back to Login screen

#### Dashboard (`src/screens/dashboard/`)

##### `DashboardScreen.tsx`
- **Purpose**: Main home screen after login
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Pot overview cards
  - Recent activity feed
  - Quick action buttons
  - Balance summary

##### `ActivityScreen.tsx`
- **Purpose**: Recent transactions and activity feed
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Chronological expense list
  - Filter by pot or date
  - Expense detail navigation

#### Pots (`src/screens/pot/`)

##### `PotListScreen.tsx`
- **Purpose**: List of all user's pots
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Grid/list of pot cards
  - Create new pot button
  - Search and filter
  - Pot balance preview

##### `PotDetailScreen.tsx`
- **Purpose**: Detailed view of a single pot
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Pot info (name, members, balance)
  - Expense list
  - Member list with balances
  - Add expense button
  - Settings button

##### `CreatePotScreen.tsx`
- **Purpose**: Form to create a new pot
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Pot name input
  - Description input
  - Currency selection
  - Member invitation
  - Pot type selection

##### `PotSettingsScreen.tsx`
- **Purpose**: Manage pot settings
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Edit pot details
  - Manage members
  - Leave/delete pot
  - Email forwarding setup

#### Expenses (`src/screens/expenses/`)

##### `AddExpenseScreen.tsx`
- **Purpose**: Form to add a new expense
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Expense description
  - Amount input
  - Category selection
  - Date picker
  - Payer selection
  - Split method selection
  - Receipt attachment

##### `ExpenseDetailScreen.tsx`
- **Purpose**: View single expense details
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Expense information
  - Split breakdown
  - Receipt images
  - Edit/delete options
  - AI comment (Receipt Roast)

##### `ScanReceiptScreen.tsx`
- **Purpose**: Camera interface for OCR scanning
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Camera view
  - Image capture
  - OCR processing
  - Extracted data review
  - Edit before saving

##### `SettleUpScreen.tsx`
- **Purpose**: Settle balances between members
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Balance summary
  - Simplified debt calculation
  - Payment method selection
  - Deep link to payment apps
  - Mark as settled

#### Wrapped (`src/screens/wrapped/`)

##### `TripWrappedScreen.tsx`
- **Purpose**: Instagram-style trip summary
- **Current State**: Placeholder implementation
- **Planned Features**:
  - Total spent statistic
  - Top spender
  - Most freeloaded
  - Category breakdown
  - Fun facts
  - Share to social media

#### Settings (`src/screens/settings/`)

##### `ProfileScreen.tsx`
- **Purpose**: User profile and settings
- **Current State**: Basic implementation with logout
- **Planned Features**:
  - Edit profile
  - Currency preference
  - Language settings
  - Notification settings
  - About/help
  - Logout button

### Navigation (`src/navigation/`)

#### `AppNavigator.tsx`
- **Purpose**: Root navigation component
- **Functionality**:
  - Checks authentication state
  - Shows loading screen while loading auth
  - Switches between AuthNavigator and MainTabNavigator
  - Configures dark theme for navigation

#### `AuthNavigator.tsx`
- **Purpose**: Authentication flow navigation
- **Screens**:
  - Login (initial route)
  - Register
  - ForgotPassword
- **Navigation Type**: Stack navigator with slide animations

#### `MainTabNavigator.tsx`
- **Purpose**: Main app bottom tab navigation
- **Tabs**:
  - Dashboard (Home icon)
  - Pots (Wallet icon)
  - AddExpense (Add icon - larger)
  - Activity (Time icon)
  - Profile (Person icon)
- **Navigation Type**: Bottom tab navigator with custom styling

#### `PotNavigator.tsx`
- **Purpose**: Nested navigation for pot-related screens
- **Screens**:
  - PotList (initial route)
  - PotDetail
  - CreatePot
  - PotSettings
  - ExpenseDetail
  - ScanReceipt
  - TripWrapped
  - SettleUp
- **Navigation Type**: Stack navigator

### State Management (`src/store/`)

#### `authStore.ts`
- **Purpose**: Global authentication state management
- **State**:
  - `user`: Current user object or null
  - `token`: JWT token or null
  - `isAuthenticated`: Boolean flag
  - `isLoading`: Loading state
- **Actions**:
  - `setAuth(user, token)`: Log in user and persist
  - `clearAuth()`: Log out user and clear storage
  - `updateUser(updates)`: Update user profile
  - `loadAuth()`: Load auth from AsyncStorage
  - `setLoading(loading)`: Set loading state
- **Persistence**: AsyncStorage for token and user data

#### `potStore.ts`
- **Purpose**: Global pot and expense state management
- **State**:
  - `pots`: Array of user's pots
  - `selectedPot`: Currently viewed pot
  - `expenses`: Expenses for selected pot
  - `balances`: Member balances
  - `isLoading`: Loading state
  - `error`: Error message
- **Actions**:
  - `setPots`, `addPot`, `updatePot`, `removePot`
  - `selectPot`
  - `setExpenses`, `addExpense`, `updateExpense`, `removeExpense`
  - `setBalances`
  - `setLoading`, `setError`
  - `clearPots`

### Constants (`src/constants/`)

#### `theme.ts`
- **Purpose**: Centralized design system constants
- **Exports**:
  - `COLORS`: Color palette (primary, secondary, background, text, borders)
  - `TYPOGRAPHY`: Font families, sizes, weights, line heights
  - `SPACING`: Spacing scale (4px base unit)
  - `RADIUS`: Border radius values
  - `SHADOWS`: Shadow configurations
  - `ANIMATION`: Animation durations and easing
  - `LAYOUT`: Component heights, padding, max widths
  - `Z_INDEX`: Z-index scale
  - `BREAKPOINTS`: Responsive breakpoints

### Types (`src/types/`)

#### `index.ts`
- **Purpose**: TypeScript type definitions for the entire app
- **Interfaces**:
  - `User`: User account data
  - `AuthCredentials`: Login credentials
  - `RegisterData`: Registration form data
  - `Pot`: Expense group data
  - `Expense`: Individual expense data
  - `ExpenseSplit`: How expense is split
  - `ExpenseCategory`: Expense category type
  - `Settlement`: Payment settlement data
  - `Balance`: User balance in pot
  - `Debt`: Simplified debt relationship
  - `TripWrapped`: Trip summary statistics
  - `OcrResult`: OCR scan results
  - `OcrLineItem`: Receipt line item
  - `CurrencyConversion`: Currency exchange data
  - `ApiError`: API error structure
  - `ApiResponse<T>`: Generic API response
- **Navigation Types**:
  - `RootStackParamList`
  - `AuthStackParamList`
  - `MainTabParamList`
  - `PotStackParamList`

## Tests (`tests/`)

### Component Tests (`tests/components/`)

#### `Button.test.tsx`
- **Purpose**: Test suite for Button component
- **Test Coverage**:
  - Rendering without crashing
  - Primary and secondary variants
  - onPress callback invocation
  - Disabled state behavior
  - Loading state behavior
  - Full width styling
  - Custom styles
  - Press animations

#### `Input.test.tsx`
- **Purpose**: Test suite for Input component
- **Test Coverage**:
  - Rendering without crashing
  - Label rendering
  - Error message display
  - Helper text display
  - onChangeText callback
  - Password toggle functionality
  - Focus/blur events
  - Custom styles
  - Prop pass-through

### Store Tests (`tests/store/`)

#### `authStore.test.ts`
- **Purpose**: Test suite for authentication store
- **Test Coverage**:
  - Initial state
  - setAuth function and persistence
  - clearAuth function
  - updateUser function
  - loadAuth function
  - setLoading function
  - Error handling
  - AsyncStorage integration

## Documentation (`docs/`)

#### `ARCHITECTURE.md`
- **Purpose**: Comprehensive architecture documentation
- **Contents**:
  - Technology stack explanation
  - Application structure
  - Data flow diagrams
  - Navigation architecture
  - State management patterns
  - Design system overview
  - API integration strategy
  - Security considerations
  - Performance optimizations
  - Testing strategy

#### `FILE_STRUCTURE.md` (this file)
- **Purpose**: Detailed explanation of every file in the project
- **Usage**: Reference for understanding project organization

## Assets (`assets/`)

### Images
- `icon.png`: App icon (1024x1024)
- `adaptive-icon.png`: Android adaptive icon
- `splash-icon.png`: Splash screen image
- `favicon.png`: Web favicon

## Mocks (`__mocks__/`)

#### `fileMock.js`
- **Purpose**: Jest mock for static file imports
- **Usage**: Returns empty string for image/font imports in tests

## Summary

This project follows a well-organized structure with clear separation of concerns:

- **Components**: Reusable UI elements
- **Screens**: Full-screen views for navigation
- **Navigation**: Routing configuration
- **Store**: Global state management
- **Constants**: Design system values
- **Types**: TypeScript definitions
- **Tests**: Comprehensive test coverage
- **Docs**: Detailed documentation

Every file is thoroughly documented with comments explaining its purpose, functionality, and usage. This makes the codebase easy to understand and maintain for future development.

