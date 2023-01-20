<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <font-awesome-icon
    icon="fa-solid fa-chevron-left"
    class="fa-2x mr-4 text-redish cursor-pointer"
    @click="router.go(-1)"
  />
</template>
