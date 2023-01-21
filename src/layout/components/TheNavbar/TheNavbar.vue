<script setup>
import { useRoute } from "vue-router";
import MobileMenu from "./MobileMenu.vue";
import CONFIG from "@/common/config.js";

const route = useRoute();

const routes = CONFIG.routes;

const isActive = (name) => {
  return name === route.name;
};

/** @TODO handle routes that need authentication */
</script>

<template>
  <header class="bg-rose-900 w-full">
    <div class="container mx-auto h-[4rem] hidden md:flex items-center">
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
    </div>

    <div class="md:hidden h-[4rem]">
      <mobile-menu></mobile-menu>
    </div>
  </header>
</template>

<style lang="scss" scoped>
a {
  transition: all 0s ease-in-out;
}
</style>
