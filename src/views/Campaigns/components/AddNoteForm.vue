<script setup>
import { ref, reactive, watch } from "vue";

import { useKeyPress } from "@/composables/useKeyPress";

import TextInput from "@/components/Inputs/TextInput.vue";

const emit = defineEmits(["submit-form"]);
const props = defineProps({
  editingNote: {
    type: Object,
    required: false,
    default: () => {},
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const titleInput = ref(null);

const useNote = (initialState, emit) => {
  const formData = reactive({ ...initialState });

  const clearForm = () => {
    Object.assign(formData, initialState);
  };

  const submitForm = () => {
    emit("submit-form", { ...formData });
    clearForm();
  };

  return { formData, submitForm };
};

useKeyPress([
  {
    keys: new Set(["Control", "/"]),
    handler: () => {
      if (!props.isOpen) return;
      const input = titleInput.value.input;

      if (document.activeElement === input) {
        return input.blur();
      }
      input.focus();
    },
  },
]);

const initialState = {
  title: "",
  description: "",
};

const { formData: campaignData, submitForm: submitNote } = useNote(
  initialState,
  emit
);

watch(
  () => props.editingNote,
  (newVal) => {
    if (!newVal) {
      campaignData.title = "";
      campaignData.description = "";
      return;
    }

    campaignData.title = newVal.title;
    campaignData.description = newVal.description;
  }
);

watch(
  () => props.isOpen,
  (newVal) => {
    const input = titleInput.value.input;
    if (newVal) {
      setTimeout(() => {
        input.focus();
      }, 200);
    } else {
      input.blur();
    }
  }
);
</script>

<template>
  <form class="note__form h-full flex-auto" @submit.prevent="submitNote()">
    <text-input
      ref="titleInput"
      v-model:value="campaignData.title"
      placeholder="Enter your title..."
      class="my-2"
    ></text-input>
    <text-input
      v-model:value="campaignData.description"
      placeholder="Enter your description..."
      class="my-2"
    ></text-input>

    <div class="text-right mt-auto">
      <button
        type="submit"
        class="bg-blue-400 py-1 px-2 rounded-lg text-white my-4"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<style scoped>
.note__form {
  min-width: 100%;
  padding: 30px;
  display: flex;
  flex-flow: column;
}
</style>
