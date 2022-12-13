<script setup>
import { watch, ref } from "vue";
import { useClickOutside } from "@/composables/useClickOutside.js";
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["click-outside"]);

const myDialog = ref(null);
useClickOutside(
  myDialog,
  () => emit("click-outside"),
  () => dialogOpen.value
);

const dialogOpening = ref(false);
const dialogOpen = ref(false);

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      setTimeout(() => (dialogOpen.value = true), 100);
      dialogOpening.value = true;
      document.body.style.overflowY = "hidden";
    } else {
      dialogOpen.value = false;
      setTimeout(() => (dialogOpening.value = false), 100);
      document.body.style.overflowY = "visible";
    }
  }
);
</script>

<template>
  <div class="dialog__background p-10" v-if="dialogOpening">
    <Transition>
      <div ref="myDialog" v-if="dialogOpen">
        <slot> </slot>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.dialog__background {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease-out;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>
