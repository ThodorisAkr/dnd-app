<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const routes = [
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
    to: { name: "NotesView" },
    title: "Notes",
  },
];

const isActive = (name) => {
  return name === route.name;
};

/** @TODO handle routes that need authentication */
</script>

<template>
  <header class="bg-rose-900 w-full">
    <nav class="container mx-auto h-[4rem] flex items-center">
      <RouterLink
        v-for="route in routes"
        :key="route.to.name"
        :to="route.to"
        class="mx-2 text-xl"
        :class="isActive(route.to.name) ? 'border-b-2 ' : ''"
        :data-testid="route.title"
      >
        {{ route.title }}
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
a {
  transition: all 0s ease-in-out;
}
</style>
