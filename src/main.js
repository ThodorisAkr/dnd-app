import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import TheBackButton from "@/layout/components/TheBackButton.vue";
import "./assets/main.css";
import "@/plugins/font-awesome.js";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.component("TheBackButton", TheBackButton);

app.mount("#app");
