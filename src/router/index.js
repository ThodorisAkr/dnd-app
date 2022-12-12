import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";

const noteTypes = [
  "characters",
  "monsters",
  "quests",
  "lore",
  "items",
  "locations",
];

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
      path: "/campaigns",
      name: "Campaigns",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "CampaignsView",
          component: () => import("@/views/Campaigns/CampaignsView.vue"),
        },
        {
          path: ":id",
          name: "SpecificCampaign",
          component: () => import("@/views/Campaigns/SpecificCampaign.vue"),
          props: (route) => ({ campaignId: route.params.id }),
          children: [
            {
              path: ":type",
              name: "SpecificNotes",
              component: () => import("@/views/Campaigns/SpecificNotes.vue"),
              props: (route) => ({
                campaignId: route.params.id,
                noteType: route.params.type,
              }),
              beforeEnter(to, from, next) {
                if (!noteTypes.includes(to.params.type)) {
                  router.replace({
                    name: "SpecificNotes",
                    params: {
                      id: to.params.id,
                      type: "characters",
                    },
                  });
                } else {
                  next();
                }
              },
            },
          ],
        },
      ],
    },
  ],
});

export default router;
