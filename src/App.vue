<script setup>
import TheNavbar from "./layout/TheNavbar/TheNavbar.vue";
</script>

<template>
  <div>
    <the-navbar></the-navbar>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style module></style>
