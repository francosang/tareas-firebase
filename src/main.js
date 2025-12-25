import './assets/main.css'

import { createApp } from "vue";
import { VueFire } from "vuefire";
import { initializeApp } from "firebase/app";
import App from "./App.vue";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyC6alh3mfd6xVUF4IqBM4eHVyv5eVV5mNk",
  authDomain: "test-app-18ab0.firebaseapp.com",
  projectId: "test-app-18ab0",
  storageBucket: "test-app-18ab0.firebasestorage.app",
  messagingSenderId: "907232824807",
  appId: "1:907232824807:web:653e6f4b6f2e47924f4142",
  measurementId: "G-VM2ZW3X3Y5"

});

const app = createApp(App);

// Install the VueFire plugin
app.use(VueFire, { firebaseApp });

app.mount("#app");

