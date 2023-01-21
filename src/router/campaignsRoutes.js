import CONFIG from "@/common/config.js";
import router from ".";

export default {
  path: "/campaigns",
  name: "Campaigns",
  component: () => import("@/layout/DefaultLayout.vue"),
  children: [
    {
      path: "",
      name: "CampaignsView",
      component: () => import("@/views/Campaigns/CampaignsView.vue"),
    },
    {
      path: ":id",
      name: "NotesView",
      component: () => import("@/views/Campaigns/NotesView.vue"),
      props: (route) => ({ campaignId: route.params.id }),
      children: [
        {
          path: ":type",
          name: "SpecificNote",
          component: () =>
            import("@/views/Campaigns/NotesViewSpecificNote.vue"),
          props: (route) => ({
            campaignId: route.params.id,
            noteType: route.params.type,
          }),
          beforeEnter(to, from, next) {
            if (!CONFIG.noteTypes.includes(to.params.type)) {
              router.replace({
                name: "SpecificNote",
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
};
