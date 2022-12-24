export const CONFIG = {
  main_api: import.meta.env.VITE_VUE_APP_MAIN_API,
  directus_api: import.meta.env.VITE_DIRECTUS_API,

  noteTypes: ["characters", "quests", "lore", "items", "locations"],
  routes: [
    {
      to: { name: "HomeView" },
      title: "Home",
    },

    {
      to: { name: "ClassesView" },
      title: "Classes",
    },

    {
      to: { name: "MonstersView" },
      title: "Monsters",
    },

    {
      to: { name: "CampaignsView" },
      title: "Campaigns",
    },
  ],
};

export default CONFIG;
