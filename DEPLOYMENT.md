# AI Trainer PWA - Deployment Guide

## Overview

Your AI Trainer PWA is ready for deployment! This guide covers deploying to Google Cloud Run with Cloud Firestore.

## What's Been Built

✅ **Complete Progressive Web App** with:
- User onboarding & profile management
- Intelligent rule-based workout generator
- Comprehensive exercise library (Gada, Mudgar, bodyweight, weights, bands)
- Yoga & pranayama library with breathwork guidance
- Workout guidance flow with step-by-step instructions
- Workout logging & progress tracking
- Analytics dashboard
- Knowledge base with training philosophy
- Optional Gemini AI integration (BYOK)
- Full offline PWA support

## Prerequisites

1. **Google Cloud Account** - [https://cloud.google.com](https://cloud.google.com)
2. **Firebase Project** - [https://console.firebase.google.com](https://console.firebase.google.com)
3. **gcloud CLI** - [Install Guide](https://cloud.google.com/sdk/docs/install)

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it (e.g., "ai-trainer-app")
4. Disable Google Analytics (optional)
5. Create project

### 1.2 Enable Firestore

1. In your Firebase project, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select a location (choose closest to your users)

### 1.3 Set Firestore Security Rules

Go to Firestore → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;  // For now, allow all access
    }
    match /workoutPlans/{planId} {
      allow read, write: if true;
    }
    match /workoutLogs/{logId} {
      allow read, write: if true;
    }
    match /settings/{userId} {
      allow read, write: if true;
    }
    match /progressMetrics/{metricsId} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These are permissive rules for testing. For production, implement proper authentication.

### 1.4 Get Firebase Configuration

1. Go to Project Settings (gear icon) → General
2. Scroll to "Your apps" → Click "</>" to create a web app
3. Register app (name: "AI Trainer Web")
4. Copy the configuration values

## Step 2: Configure Environment Variables

1. Navigate to the app directory:
```bash
cd app
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 3: Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to test the app locally.

## Step 4: Deploy to Google Cloud Run

### 4.1 Set up gcloud

```bash
# Login
gcloud auth login

# Set project ID
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 4.2 Build Docker Image

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/ai-trainer
```

### 4.3 Deploy to Cloud Run

```bash
gcloud run deploy ai-trainer \
  --image gcr.io/YOUR_PROJECT_ID/ai-trainer \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "VITE_FIREBASE_API_KEY=your-key" \
  --set-env-vars "VITE_FIREBASE_AUTH_DOMAIN=your-domain" \
  --set-env-vars "VITE_FIREBASE_PROJECT_ID=your-project" \
  --set-env-vars "VITE_FIREBASE_STORAGE_BUCKET=your-bucket" \
  --set-env-vars "VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender" \
  --set-env-vars "VITE_FIREBASE_APP_ID=your-app-id"
```

**Important:** Replace all `your-*` values with your actual Firebase configuration.

### 4.4 Get Your App URL

After deployment completes, you'll get a URL like:
```
https://ai-trainer-xxxxxxxxx-uc.a.run.app
```

## Step 5: Install as PWA

### On Mobile (Android/iOS):

1. Open the Cloud Run URL in Chrome/Safari
2. Tap the browser menu (⋮ or share icon)
3. Select "Add to Home Screen" or "Install"
4. The app will install like a native app!

### On Desktop:

1. Open the URL in Chrome
2. Look for the install icon in the address bar
3. Click to install

## Optional: Gemini AI Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. In the app, go to Settings
3. Enter your Gemini API key
4. AI coaching features will activate

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify Node version: `node --version` (should be 20+)

### Firebase Connection Issues
- Verify `.env` variables are correct
- Check Firestore rules allow access
- Ensure Firestore database is created

### Cloud Run Deployment Fails
- Verify gcloud CLI is authenticated
- Check project ID is correct
- Ensure billing is enabled on your GCP project

## Cost Estimates

- **Firestore**: Free tier covers ~50K reads/20K writes per day
- **Cloud Run**: Free tier covers 2M requests/month
- **Gemini API**: Optional, pay-per-use

For a personal app with moderate usage, expect $0-5/month.

## Next Steps

1. **Customize Exercise Videos**: Edit exercise data in `app/src/data/exercises.ts` to add your own YouTube/Instagram video links
2. **Add More Exercises**: Extend the exercise library with additional movements
3. **Implement Auth**: Add Firebase Authentication for multi-user support
4. **Custom Domain**: Connect a custom domain to your Cloud Run service

## Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: See `app/README.md` for detailed app documentation

---

**Philosophy:** Movement → Mechanics → Metabolism → Mind

Train hard, recover well, and stay consistent! 🔥
