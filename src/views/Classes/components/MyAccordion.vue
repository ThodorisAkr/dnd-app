<script setup>
import { ref, computed } from "vue";
const isOpen = ref(false);
const accordionClasses = computed(() => {
  if (isOpen.value) {
    return {
      classes: "open",
      icon: "fa-chevron-up",
    };
  } else {
    return {
      classes: "",
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
    <div class="accordion-content" :class="accordionClasses.classes">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.accordion-content {
  margin-top: 10px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.2s cubic-bezier(0, 1, 0, 1);
}

.accordion-content.open {
  max-height: 1000px;
  transition: max-height 0.2s ease-in-out;
}
</style>
