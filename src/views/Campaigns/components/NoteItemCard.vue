<script>
import { ref } from "vue";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const isOpen = ref(false);

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      toggleOpen,
      isOpen,
    };
  },
};
</script>

<template>
  <div class="rounded-md px-3 border-2">
    <div
      class="flex justify-between items-end cursor-pointer py-2"
      @click="toggleOpen()"
    >
      <h2 class="text-base md:text-xl font-semibold">{{ item.title }}</h2>
      <font-awesome-icon
        icon="fas fa-chevron-down"
        class="fa-2x"
        :class="{ 'reverse-icon': isOpen }"
      ></font-awesome-icon>
    </div>
    <div v-show="isOpen" class="text-sm md:text-base py-3 border-t-2 py-3">
      {{ item.description }}
    </div>
  </div>
</template>

<style scoped>
.reverse-icon {
  transform: rotate(180deg);
}
</style>
