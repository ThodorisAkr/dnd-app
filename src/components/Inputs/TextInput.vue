<script setup>
import { watch, ref } from "vue";
const emit = defineEmits(["update:value"]);
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Enter text...",
  },
});

const input = ref(null);
const updateVal = () => {
  emit("update:value", inputVal.value);
};
const inputVal = ref(props.value);

watch(
  () => props.value,
  (newVal) => {
    inputVal.value = newVal;
  }
);

defineExpose({
  input,
});
</script>

<template>
  <label class="relative block">
    <span class="sr-only">Title</span>
    <input
      ref="input"
      v-model="inputVal"
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      :placeholder="props.placeholder"
      type="text"
      name="search"
      @change="updateVal()"
    />
  </label>
</template>
