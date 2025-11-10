# AI Trainer - Warrior Flow 🔥

A Progressive Web App (PWA) for personalized weight training and tracking, blending traditional Indian physical culture with modern exercise science.

## Features

### ⭐⭐⭐⭐ Priority Features (Implemented)

- **User Profile & Equipment Management** - Complete onboarding with equipment inventory
- **Rule-Based Workout Generator** - Intelligent workout creation based on:
  - Available time & equipment
  - Energy levels & stress
  - Workout history & recovery windows
  - Movement pattern coverage
- **Workout Guidance** - Step-by-step exercise cards with:
  - Sets, reps, and load recommendations
  - Form cues and breathing patterns
  - Video demonstration links (YouTube/Instagram)
- **Workout Logging** - Track completed workouts with RPE and notes

### ⭐⭐⭐ Features (Implemented)

- **Progress Analytics** - View workout history and statistics
- **Yoga & Pranayama Library** - Guided breathwork and recovery sequences

### ⭐⭐ Features (Implemented)

- **Knowledge Base** - Traditional training philosophy and exercise descriptions

### Additional Features

- **Gemini AI Integration** (Optional, BYOK) - AI-powered coaching insights
- **PWA Support** - Install on mobile devices, works offline
- **Cloud Firestore** - Data persistence across devices
- **Mobile-First Design** - Optimized for smartphone usage

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Database:** Cloud Firestore
- **AI:** Google Gemini 2.5 Pro (optional)
- **PWA:** Vite PWA Plugin
- **Deployment:** Google Cloud Run + Docker

## Local Development

### Prerequisites

- Node.js 20+
- npm or yarn
- Firebase project (for Firestore)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
# Firebase Configuration (Required)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Building

```bash
npm run build
```

## Philosophy

> **Movement → Mechanics → Metabolism → Mind**

Four Pillars:
1. Movement before muscle
2. Breath before intensity
3. Consistency before complexity
4. Flow before formality
