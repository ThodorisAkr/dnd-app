<script setup>
import { ref } from "vue";
import { useClickOutside } from "@/composables/useClickOutside.js";

/**CONSTANTS */
const userActions = [
  { name: "Edit", handler: () => handleEdit() },
  { name: "Delete", handler: () => handleDelete() },
];

/**PROPS / COMPOSABLES / EMITS */
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit-item", "delete-item"]);

const menuRef = ref(null);
useClickOutside(
  menuRef,
  () => toggleMenuOpen(),
  () => isMenuOpen.value
);

/**REACTIVE DATA */

const isOpen = ref(false);
const isMenuOpen = ref(false);

/**METHODS */

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const toggleMenuOpen = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleEdit = () => {
  emit("edit-item", props.item);
  toggleMenuOpen();
};

const handleDelete = () => {
  emit("delete-item", props.item);
  toggleMenuOpen();
};
</script>

<template>
  <div class="flex items-center">
    <div class="rounded-md px-3 border-2 flex-grow">
      <div
        class="flex justify-between items-end cursor-pointer py-2"
        @click="toggleOpen()"
      >
        <h2 class="text-base md:text-xl font-semibold">
          {{ props.item.title }}
        </h2>
        <div>
          <font-awesome-icon
            icon="fas fa-chevron-down"
            class="fa-2x"
            :class="{ 'reverse-icon': isOpen }"
          ></font-awesome-icon>
        </div>
      </div>
      <div v-show="isOpen" class="text-sm md:text-base py-3 border-t-2 py-3">
        {{ props.item.description }}
      </div>
    </div>
    <div ref="menuRef" class="relative">
      <font-awesome-icon
        icon="fas fa-dice-d20"
        class="fa-2x ml-6 border-2 border-black rounded-lg p-1 self-center cursor-pointer transition duration-300"
        :class="{ 'reverse-icon': isOpen }"
        @click="toggleMenuOpen()"
      ></font-awesome-icon>
      <transition name="slide-in-up">
        <div
          v-if="isMenuOpen"
          class="dropdown-menu mt-1 rounded absolute right-0 top:20 lg:-right-44 lg:top-0 z-10 shadow-lg w-40 max-w-xs bg-black/95"
        >
          <ul class="list-none overflow-hidden rounded border-2 border-black">
            <li
              v-for="(item, idx) in userActions"
              :key="idx"
              class="cursor-pointer py-2 px-4 transition duration-300 text-white hover:text-black hover:bg-white"
              @click="item.handler()"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.reverse-icon {
  transform: rotate(180deg);
}

.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}
.slide-in-up-enter-from,
.slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
