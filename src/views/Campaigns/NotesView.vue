<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNoteStore } from "@/stores/notes";
import NotesTypeCard from "./components/NotesTypeCard.vue";

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
  router.replace({
    name: "SpecificNote",
    params: { type: type.toLowerCase() },
  });
};
const noteOptions = {
  left: [
    { label: "Characters", img: "characters" },
    { label: "Items", img: "items" },
    { label: "Locations", img: "locations" },
  ],
  right: [
    { label: "Lore", img: "lore" },
    { label: "Quests", img: "quests" },
    { label: "Other", img: "other" },
  ],
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center pt-10">
      <the-back-button></the-back-button>
      <h1 class="text-3xl md:text-5xl">
        Notes for Campaign:
        {{ noteSystem.getCampaignName(campaignId - 1).title }}
      </h1>
    </div>
    <div
      class="flex flex-wrap justify-center lg:grid grid-cols-2 lg:grid-cols-12 gap-2 pt-20"
    >
      <div class="col-span-2 order-1">
        <div
          class="flex lg:grid grid-cols-3 lg:grid-cols-1 gap-1 lg:gap-4 place-items-center lg:place-items-start"
        >
          <notes-type-card
            v-for="item in noteOptions.left"
            :item="item"
            :key="item.label"
            position="r"
            class="mx-4"
            @click="openNoteCard(item.label)"
          ></notes-type-card>
        </div>
      </div>
      <div class="w-full lg:col-span-8 order-3 mx-2">
        <div class="h-full mr-2">
          <router-view></router-view>
        </div>
      </div>
      <div class="col-span-2 lg:col-span-2 order-2 lg:order-4">
        <div
          class="flex lg:grid grid-cols-2 lg:grid-cols-1 gap-1 lg:gap-4 xl:place-items-end lg:place-items-end"
        >
          <notes-type-card
            v-for="item in noteOptions.right"
            :item="item"
            :key="item.label"
            position="l"
            class="mx-4"
            @click="openNoteCard(item.label)"
          ></notes-type-card>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12"></div>
  </div>
</template>
