
# Finance Portfolio Demo

A small React Native finance portfolio application built as a technical showcase.

The app demonstrates how portfolio and asset data can be modelled, processed and visualized in a mobile finance application, with a focus on clean UI, interactive data visualization and a simple, maintainable architecture.

## ✨ Features

- 📊 Interactive portfolio performance chart
- 👆 Touch-based chart interaction
- 📈 Dynamic performance visualization based on a reference value
- 💰 Portfolio and individual asset performance
- 🪙 Asset overview with dynamically calculated values
- 📱 Individual asset detail views
- 🌍 German and English localization
- 🔢 Locale-aware number and currency formatting
- 📦 Mock data layer for portfolio and asset history

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router**
- **i18next**
- **react-native-wagmi-charts**
- **Jest**

## 🏗 Architecture

The application intentionally keeps the architecture simple while separating data, business logic and presentation.

```text
Mock Data
    ↓
Services / Business Logic
    ↓
React Components
    ↓
UI
