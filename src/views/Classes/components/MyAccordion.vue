<script setup>
import { ref, computed } from "vue";
const isOpen = ref(false);
const accordionClasses = computed(() => {
  if (isOpen.value) {
    return {
      classes: "max-h-96 pt-2",
      icon: "fa-chevron-up",
    };
  } else {
    return {
      classes: "max-h-0 p-0",
      icon: "fa-chevron-down",
    };
  }
});

const handleToggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="md:w-[300px] lg:w-[400px]">
    <div
      class="header flex justify-between border-b-2 items-center mt-4 cursor-pointer hover:font-bold text-lg"
      @click="handleToggle()"
    >
      <slot name="header"></slot>
      <font-awesome-icon
        :icon="accordionClasses.icon"
        class="cursor-pointer ml-6"
      ></font-awesome-icon>
    </div>
    <div
      class="accordion-content overflow-hidden"
      :class="accordionClasses.classes"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.accordion-content {
  transition: max-height 0.3s ease-out, padding 0.3s ease;
}
</style>
