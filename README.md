# Firebase Vue Todo App

A simple todo application built with Vue.js 3 and Firebase Firestore, following the tutorial from [Vue Basics: How to Use Vue with Firebase](https://www.telerik.com/blogs/vue-basics-how-use-vue-firebase).

## Features

- ✅ Display todos from Firebase Firestore in real-time
- ✅ Add new todos with title and completion status
- ✅ Real-time synchronization across clients
- ✅ Modern Vue 3 Composition API with `<script setup>`
- ✅ VueFire for seamless Firebase integration

## Prerequisites

- Node.js (version 16 or higher recommended)
- A Firebase account and project

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Set up Firestore Database:
   - Go to "Build" > "Firestore Database"
   - Click "Create database"
   - Start in **test mode** (for development)
   - Choose a location for your database
4. Register a web app:
   - Go to Project Settings (gear icon) > General
   - Scroll down to "Your apps" section
   - Click the web icon (`</>`) to register a web app
   - Copy the Firebase configuration object

### 3. Update Firebase Configuration

Open `src/main.js` and replace the placeholder values with your Firebase project configuration:

```javascript
export const firebaseApp = initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
});
```

### 4. Create Initial Data (Optional)

In your Firebase Console:
1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `todos`
4. Add sample documents with fields:
   - `title` (string): e.g., "Get groceries"
   - `completed` (boolean): e.g., false

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
firebase-vue-todo/
├── src/
│   ├── components/
│   │   └── TodosList.vue       # Main todos component
│   ├── App.vue                 # Root component
│   └── main.js                 # App entry point with Firebase config
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **Firebase** - Backend-as-a-Service platform
- **Firestore** - NoSQL cloud database
- **VueFire** - Firebase bindings for Vue.js

## Security Note

⚠️ **Important**: The tutorial uses Firestore in test mode for quick development. For production:
1. Update Firestore Security Rules
2. Implement proper authentication
3. Use environment variables for Firebase config

## Learn More

- [Vue.js Documentation](https://vuejs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [VueFire Documentation](https://vuefire.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

## Tutorial

This project follows the tutorial: [Vue Basics: How to Use Vue with Firebase](https://www.telerik.com/blogs/vue-basics-how-use-vue-firebase) by Hassan Djirdeh.

## License

MIT
