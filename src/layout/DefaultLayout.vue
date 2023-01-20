<template>
  <div>
    <the-navbar></the-navbar>
    <div class="main__content">
      <router-view />
    </div>
    <div>
      <the-footer class="bg-black/75"></the-footer>
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "./components/TheNavbar/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<style scoped>
.main__content {
  min-height: calc(100vh - 4rem);
}
</style>
