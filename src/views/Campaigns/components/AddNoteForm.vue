<script setup>
import TextInput from "@/components/Inputs/TextInput.vue";
import { reactive, watch } from "vue";
const emit = defineEmits(["submit-form"]);

const props = defineProps({
  editingNote: {
    type: Object,
    required: false,
    default: () => {},
  },
});
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
    if (!newVal) return;
    campaignData.title = newVal.title;
    campaignData.description = newVal.description;
  }
);
</script>

<template>
  <form class="note__form h-full flex-auto" @submit.prevent="submitNote()">
    <text-input
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
