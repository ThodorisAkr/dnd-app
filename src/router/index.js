import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";

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
    {
      path: "/classes",
      name: "ClassesLayout",
      component: () => import("@/layout/DefaultLayout.vue"),
      children: [
        {
          path: "",
          name: "ClassesView",
          component: () => import("@/views/Classes/ClassesView.vue"),
        },
        {
          path: ":class",
          name: "SpecificClass",
          component: () => import("@/views/Classes/SpecificClass.vue"),
        },
      ],
    },

    {
      path: "/monsters",
      name: "Monsters",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "MonstersView",
          component: () => import("@/views/Monsters/MonstersView.vue"),
        },

        {
          path: ":monster",
          name: "SpecificMonster",
          component: () => import("@/views/Monsters/SpecificMonster.vue"),
        },
      ],
    },

    {
      path: "/notes",
      name: "Notes",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "NotesView",
          component: () => import("@/views/Notes/NotesView.vue"),
        },
      ],
    },
  ],
});

export default router;
