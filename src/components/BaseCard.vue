<script setup>
import { useAttrs } from "vue";
const attrs = useAttrs();
</script>

<template>
  <div class="card__container flex flex-col rounded-lg" v-bind="attrs">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card__container {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
