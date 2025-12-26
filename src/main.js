import './assets/main.css'

import { createApp } from "vue";
import { VueFire } from "vuefire";
import { firebaseApp } from "@/data";
import App from "./App.vue";

const app = createApp(App);

// Install the VueFire plugin
app.use(VueFire, { firebaseApp });

app.mount("#app");

