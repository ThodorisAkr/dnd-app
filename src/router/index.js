import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";

import campaignRoutes from "./campaignsRoutes.js";
import monstersRoutes from "./monstersRoutes.js";
import classesRoutes from "./classesRoutes.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "HomeView",
          component: HomeView,
        },
      ],
    },
    classesRoutes,
    monstersRoutes,
    campaignRoutes,
  ],
});

export default router;
