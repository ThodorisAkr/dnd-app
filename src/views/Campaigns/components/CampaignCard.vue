<script setup>
import BaseCard from "../../../components/BaseCard.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const openCampaignNotes = () => {
  router.push({
    name: "SpecificNotes",
    params: {
      id: props.item.id || 1,
      type: "characters",
    },
  });
};

const bgImg = computed(() => {
  if (props.item.img) return props.item.img;
  return "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/dnd-5e-dragonlance-chapter-2-art-1.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5";
});
</script>

<template>
  <base-card
    class="min-w-[300px] min-h-[300px] campaign__card items-center justify-around bg-cover bg-center bg-no-repeat cursor-pointer hover:scale-[1.02] active:scale-[1.03]"
    :style="`background-image: url(${bgImg})`"
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
    black 10%,
    rgba(0, 0, 0, 0.4) 20%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
}
</style>
