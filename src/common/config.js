export const CONFIG = {
  main_api: import.meta.env.VITE_VUE_APP_MAIN_API,
  directus_api: import.meta.env.VITE_DIRECTUS_API,

  noteTypes: ["characters", "quests", "lore", "items", "locations"],
};

export default CONFIG;
