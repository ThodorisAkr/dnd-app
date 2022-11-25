<script setup>
const routes = [
  {
    to: { name: "Home" },
    title: "Home",
  },
  {
    to: { name: "MyCharacters" },
    title: "My Characters",
  },
];
</script>

<template>
  <header class="bg-rose-900 w-full">
    <nav class="container mx-auto h-[4rem] flex items-center">
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="route.to"
        class="mx-2"
        :data-testid="route.title"
      >
        {{ route.title }}
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
