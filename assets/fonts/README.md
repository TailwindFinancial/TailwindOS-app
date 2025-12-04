# Fonts Directory

This directory contains the custom fonts for the Tailwind app.

## Required Fonts

1. **Fraunces-Variable.ttf**
   - Display font for headlines
   - Download from: https://fonts.google.com/specimen/Fraunces
   - Select "Variable" version
   - Place the downloaded TTF file here

2. **Inter-Variable.ttf**
   - Body font for readable text
   - Download from: https://fonts.google.com/specimen/Inter
   - Select "Variable" version
   - Place the downloaded TTF file here

## Installation Instructions

1. Visit the Google Fonts links above
2. Download the variable font files
3. Place them in this directory with the exact names shown above
4. The app will automatically load them via Expo Font

## Alternative: Using Expo Google Fonts

If you prefer, you can install pre-packaged fonts:

```bash
npx expo install @expo-google-fonts/fraunces @expo-google-fonts/inter expo-font
```

Then update `App.tsx` to use:
```typescript
import { useFonts, Fraunces_400Regular } from '@expo-google-fonts/fraunces';
import { Inter_400Regular } from '@expo-google-fonts/inter';
```

