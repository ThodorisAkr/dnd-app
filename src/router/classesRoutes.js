export default {
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
};
