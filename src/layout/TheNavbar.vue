<script setup>
const routes = [
  {
    to: { name: "Home" },
    title: "Home",
  },
  {
    to: { name: "About" },
    title: "About",
  },
];
</script>

<template>
  <header>
    <nav class="container mx-auto py-3 bg-sky-500">
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="route.to"
        class="mx-2"
      >
        {{ route.title }}
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
