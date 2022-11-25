import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/my-characters",
      name: "MyCharacters",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/MyCharacters.vue"),
    },
    {
      path: "/classes",
      name: "ClassesLayout",
      component: () => import("@/views/CharacterClasses.vue"),
      children: [
        {
          path: "/",
          name: "CharacterClasses",
          component: () => import("@/views/CharacterClasses.vue"),
        },
        {
          path: ":class",
          name: "SpecificClass",
          component: () => import("@/views/SpecificClass.vue"),
        },
      ],
    },
  ],
});

export default router;
