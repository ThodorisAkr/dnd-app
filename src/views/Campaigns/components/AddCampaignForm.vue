<script setup>
import TextInput from "@/components/Inputs/TextInput.vue";
import { reactive } from "vue";

const initialState = {
  title: "",
  description: "",
  img: "",
};
const emit = defineEmits(["submit-campaign"]);

const campaignData = reactive({ ...initialState });

const clearForm = () => {
  Object.assign(campaignData, initialState);
};

const submitForm = () => {
  emit("submit-campaign", { ...campaignData });
  clearForm();
};
</script>

<template>
  <form class="campaign__form h-full" @submit.prevent="submitForm()">
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
    <text-input
      v-model:value="campaignData.img"
      placeholder="Enter your image url..."
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
.campaign__form {
  min-width: 100%;
  padding: 30px;
  display: flex;
  flex-flow: column;
}
</style>
