<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { useNoteStore } from "@/stores/notes";
import NoteCard from "./components/NoteCard.vue";

const props = defineProps({
  campaignId: {
    type: [Number, String],
    required: true,
  },
});
const router = useRouter();
const noteSystem = useNoteStore();
const campaign = ref(null);

(() => {
  let item = noteSystem.notes[props.campaignId];
  campaign.value = item;
})();

const openNoteCard = (type) => {
  router.push({ name: "SpecificNotes", params: { type } });
};
const noteOptions = {
  left: [
    { label: "characters", img: "characters" },
    { label: "items", img: "items" },
    { label: "locations", img: "locations" },
  ],
  right: [
    { label: "lore", img: "lore" },
    { label: "quests", img: "quests" },
  ],
};
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-2 pt-20">
      <div class="col-span-2">
        <div class="grid grid-cols-1 gap-4 place-items-start">
          <note-card
            v-for="item in noteOptions.left"
            :item="item"
            :key="item.label"
            position="r"
            @click="openNoteCard(item.label)"
          ></note-card>
        </div>
      </div>
      <div class="col-span-8">
        <router-view></router-view>
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-1 gap-4 place-items-end">
          <note-card
            v-for="item in noteOptions.right"
            :item="item"
            :key="item.label"
            position="l"
            @click="openNoteCard(item.label)"
          ></note-card>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12"></div>
  </div>
</template>
