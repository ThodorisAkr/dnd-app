<template>
  <div>
    <the-navbar></the-navbar>
    <div class="mb-20" style="min-height: 100vh">
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
