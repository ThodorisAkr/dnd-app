<script setup>
import { defineProps, ref } from "vue";
import { useNoteStore } from "@/stores/notes";

const props = defineProps({
  campaignId: {
    type: [Number, String],
    required: true,
  },
});
const noteSystem = useNoteStore();

const campaign = ref(null);

(() => {
  let item = noteSystem.notes[props.campaignId];
  campaign.value = item;
})();
console.log(noteSystem.notes[props.campaignId]);
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-5xl py-20">
      {{ campaign.title }}
    </h1>

    <div class="description__container">
      {{ campaign.description }}
    </div>
  </div>
</template>
