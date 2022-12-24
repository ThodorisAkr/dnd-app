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
      name: "CampaignNotes",
      component: () => import("@/views/Campaigns/CampaignNotes.vue"),
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
            if (!CONFIG.noteTypes.includes(to.params.type)) {
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
};
