export default {
  path: "/monsters",
  name: "Monsters",
  component: () => import("@/layout/DefaultLayout.vue"),
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
};
