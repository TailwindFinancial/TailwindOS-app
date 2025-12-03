# Tailwind Lite Mobile App

A modern, beautifully designed mobile application for group expense tracking and splitting built with React Native and Expo.

## Overview

Tailwind Lite is a mobile expense splitting application that makes it easy for groups to track shared expenses, split bills, and settle up. The app features OCR receipt scanning, multi-currency support, social features like "Trip Wrapped," and seamless payment integrations.

## Features

### Core Functionality
- **Expense Tracking**: Add and track expenses within group "pots"
- **Smart Splitting**: Automatically split expenses among group members
- **Receipt Scanning**: OCR-powered receipt scanning for quick expense entry
- **Multi-Currency**: Real-time currency conversion for international groups
- **Balance Tracking**: See who owes what at a glance

### Social & Viral Features
- **Trip Wrapped**: Instagram-style recap of group expenses
- **Freeloader Leaderboard**: Gamified balance tracking
- **Receipt Roast**: AI-generated commentary on expenses

### Integrations
- **Payment Deep Links**: Direct integration with Venmo, Cash App, and Interac
- **Offline Mode**: Add expenses without internet connection
- **Email Forwarding**: Forward receipts directly to pots via email

## Tech Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Development tooling and native APIs
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation and routing
- **Zustand**: Lightweight state management
- **React Native Reanimated**: Smooth animations

### Design System
- **Colors**: Ultra-premium dark theme with cyan accents
- **Typography**: Fraunces for headlines, Inter for body text
- **Components**: Fully documented, reusable design system

### Development Tools
- **Jest**: Testing framework
- **React Native Testing Library**: Component testing
- **TypeScript**: Static typing
- **ESLint**: Code linting
- **Git**: Version control

## Project Structure

```
tailwindOS-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── design-system/   # Core design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Typography.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── index.ts
│   │   └── shared/          # Shared components
│   ├── screens/             # Screen components
│   │   ├── auth/            # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   ├── dashboard/       # Dashboard screens
│   │   │   ├── DashboardScreen.tsx
│   │   │   └── ActivityScreen.tsx
│   │   ├── pot/             # Pot management screens
│   │   │   ├── PotListScreen.tsx
│   │   │   ├── PotDetailScreen.tsx
│   │   │   ├── CreatePotScreen.tsx
│   │   │   └── PotSettingsScreen.tsx
│   │   ├── expenses/        # Expense screens
│   │   │   ├── AddExpenseScreen.tsx
│   │   │   ├── ExpenseDetailScreen.tsx
│   │   │   ├── ScanReceiptScreen.tsx
│   │   │   └── SettleUpScreen.tsx
│   │   ├── wrapped/         # Trip Wrapped feature
│   │   │   └── TripWrappedScreen.tsx
│   │   └── settings/        # Settings screens
│   │       └── ProfileScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── PotNavigator.tsx
│   ├── store/               # State management (Zustand)
│   │   ├── authStore.ts
│   │   └── potStore.ts
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── constants/           # Constants (colors, fonts, etc.)
│   │   └── theme.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── hooks/               # Custom React hooks
├── tests/                   # Test files
├── docs/                    # Documentation
├── assets/                  # Images, fonts, icons
├── __mocks__/              # Jest mocks
├── App.tsx                 # App entry point
├── babel.config.js         # Babel configuration
├── jest.config.js          # Jest configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Getting Started

### Prerequisites

- **Node.js**: v18+ recommended
- **npm** or **yarn**: Latest version
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tailwindOS-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on iOS or Android**
   ```bash
   npm run ios     # Run on iOS simulator
   npm run android # Run on Android emulator
   ```

### Available Scripts

- `npm start`: Start the Expo development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android emulator
- `npm run web`: Run in web browser
- `npm test`: Run all tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Generate test coverage report
- `npm run lint`: Run TypeScript type checking

## Development Guidelines

### Code Style

- Use **TypeScript** for all new files
- Follow **functional component** patterns with hooks
- Write **comprehensive comments** for all functions and components
- Use **path aliases** for imports (`@components`, `@screens`, etc.)

### Component Documentation

Every component should include:
- **File header** with description, module, author, and date
- **Interface documentation** for props
- **Function comments** explaining purpose and parameters
- **Usage examples** in JSDoc comments

Example:
```typescript
/**
 * Button Component
 * 
 * A reusable button component that implements the Tailwind design system.
 * Supports primary and secondary variants with hover and press states.
 * 
 * @module components/design-system/Button
 * @author Tailwind Team
 * @created 2025-12-02
 * 
 * @example
 * ```tsx
 * <Button 
 *   title="Continue" 
 *   onPress={() => console.log('Pressed')}
 *   variant="primary"
 * />
 * ```
 */
```

### Testing

- Write tests for all new components and functions
- Aim for 70%+ code coverage
- Use React Native Testing Library for component tests
- Test user interactions, not implementation details

### Git Workflow

- Commit after each major feature completion
- Write clear, descriptive commit messages
- Never commit directly to `main` without testing
- Use feature branches for larger changes

## Design System

### Colors

```typescript
Primary: #5DD9D2 (Cyan/Turquoise)
Secondary: #2E3A59 (Navy Blue)
Background: #000000 (Pure Black)
Text Primary: #FFFFFF (White)
Text Secondary: #A3A3A3 (Gray)
```

### Typography

- **Headlines**: Fraunces (serif, medium weight)
- **Body Text**: Inter (sans-serif, regular weight)
- **Labels**: Inter (sans-serif, bold, uppercase)

### Spacing

Based on 4px grid:
- xs: 4px
- sm: 8px
- md: 12px
- base: 16px
- lg: 20px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

### Components

All design system components are located in `src/components/design-system/`:

- **Button**: Primary and secondary variants
- **Card**: Elevated containers with glassmorphism
- **Input**: Text inputs with labels and error states
- **Typography**: H1, H2, H3, Body, Label, Caption
- **LoadingSpinner**: Loading indicators

## State Management

### Authentication Store (`authStore.ts`)

Manages user authentication state:
- `user`: Currently logged-in user
- `token`: Authentication token
- `setAuth()`: Log in user
- `clearAuth()`: Log out user
- `updateUser()`: Update user data

### Pot Store (`potStore.ts`)

Manages pot and expense data:
- `pots`: List of user's pots
- `expenses`: Expenses for selected pot
- `balances`: Member balances
- `setPots()`, `addPot()`, `updatePot()`, `removePot()`
- `setExpenses()`, `addExpense()`, `updateExpense()`

## API Integration

API services will be implemented in `src/services/`. The app is designed to work with a REST API backend.

### Expected Endpoints

- `POST /auth/login`: User login
- `POST /auth/register`: User registration
- `GET /pots`: Get user's pots
- `POST /pots`: Create new pot
- `GET /pots/:id/expenses`: Get pot expenses
- `POST /expenses`: Add new expense
- `POST /receipts/scan`: OCR receipt scanning

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage Goals

- Components: 80%+
- Utilities: 90%+
- Stores: 85%+
- Overall: 70%+

## Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

## Environment Variables

Create a `.env` file in the root directory:

```
API_URL=https://api.tailwind.finance
OCR_API_KEY=your_ocr_api_key
```

## Contributing

1. Create a feature branch
2. Make your changes with proper documentation
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

Proprietary - All rights reserved

## Contact

For questions or support, contact the Tailwind team.

## Roadmap

### Phase 1: MVP (Current)
- [x] Design system components
- [x] Authentication flow
- [x] Navigation structure
- [ ] Pot management
- [ ] Expense tracking

### Phase 2: Core Features
- [ ] OCR receipt scanning
- [ ] Multi-currency support
- [ ] Balance calculation
- [ ] Settlement flow

### Phase 3: Social Features
- [ ] Trip Wrapped
- [ ] Freeloader Leaderboard
- [ ] Receipt Roast AI

### Phase 4: Integrations
- [ ] Payment app deep linking
- [ ] Email-to-pot forwarding
- [ ] Offline mode sync

## Acknowledgments

- Design inspired by Slash and Apple's minimalist aesthetic
- Built with Expo and React Native
- Icons from Expo Vector Icons

