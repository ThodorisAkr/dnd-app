<script setup>
import { defineEmits, watch, useAttrs, ref } from "vue";
const emit = defineEmits(["update:open"]);
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const dialogOpen = ref(false);
const attrs = useAttrs();
const dialogStyles = {
  ["bg-white"]: true,
  [`h-[${attrs.height || "300"}px]`]: true,
  [`w-full`]: true,
  [`min-w-[300px]`]: true,
  [`max-w-[${attrs.width}px]`]: true,
};

const closeDialog = () => {
  dialogOpen.value = false;
  setTimeout(() => emit("update:open", false), 200);
};

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      setTimeout(() => (dialogOpen.value = true), 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }
);
</script>

<template>
  <div class="dialog__background p-10" v-if="props.open">
    <Transition>
      <div
        v-if="dialogOpen"
        :class="dialogStyles"
        class="p-2 relative"
        :style="`max-width:${attrs.width}px `"
      >
        <slot name="title">
          <h1 class="text-xl">Title</h1>
          <slot name="close">
            <button class="absolute right-0 top-0 p-3" @click="closeDialog()">
              <font-awesome-icon
                icon="fas fa-times"
                class="text-red-900"
              ></font-awesome-icon>
            </button>
          </slot>
        </slot>
        <hr class="my-4" />
        <slot name="content"></slot>
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
  background-color: rgba(0, 0, 0, 0.3);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(400px);
  opacity: 0;
}
</style>
