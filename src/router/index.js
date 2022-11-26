import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: "/classes",
      name: "ClassesLayout",
      component: () => import("@/layout/DefaultLayout.vue"),
      children: [
        {
          path: "",
          name: "CharacterClasses",
          component: () => import("@/views/Classes/CharacterClasses.vue"),
        },
        {
          path: ":class",
          name: "SpecificClass",
          component: () => import("@/views/Classes/SpecificClass.vue"),
        },
      ],
    },
  ],
});

export default router;
