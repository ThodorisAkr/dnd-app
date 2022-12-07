<script setup>
import BaseCard from "../../../components/BaseCard.vue";
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const openCampaignNotes = () => {
  console.log(props.item);
};

const default_img =
  "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/dnd-5e-dragonlance-chapter-2-art-1.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5";
</script>

<template>
  <base-card
    class="campaign__card items-center justify-around bg-cover bg-center bg-no-repeat cursor-pointer hover:scale-[1.02] active:scale-[1.03]"
    :class="`bg-[url(${props.item.img || default_img})] `"
    @click="openCampaignNotes()"
  >
    <div
      class="card__overlay rounded-lg p-2 flex-auto w-full flex flex-col items-center justify-end text-white"
    >
      <div class="font-bold text-xl text-center">
        {{ props.item.title }}
      </div>
    </div>
  </base-card>
</template>

<style lang="scss" scoped>
.campaign__card {
  transition: transform 0.2s ease-in-out;
}
.card__overlay {
  background: linear-gradient(
    to top,
    black 0%,
    rgba(0, 0, 0, 0.447) 10%,
    rgba(0, 0, 0, 0.447) 20%,
    transparent 100%
  );
}
</style>
