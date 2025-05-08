# 📍 Expo Maps Demo

This is a quick experiment using **Expo Maps** to render a native Apple Maps view in a React Native app via **Expo**. I played around with markers, annotations, polylines, and camera controls to switch between predefined locations using a simple UI.

## 🔧 Tech Stack

- **Expo + React Native**
- **expo-maps** for Apple Maps integration
- **expo-image** to load a remote image annotation
- **react-native-safe-area-context** for UI layout
- **@react-navigation/bottom-tabs** for dynamic padding

## 💡 Features Explored

- Apple Maps with custom annotations & polylines
- Camera movement via refs
- Buttons to cycle through a list of hardcoded locations
- Image-based annotation with fallback handling
- Event logging: map clicks, marker taps, polyline taps

## 📦 File of Interest

All logic and UI are located in: `/app/(tabs)/index.tsx`
