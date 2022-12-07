<script setup>
import { defineProps, computed, useAttrs } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const attrs = useAttrs();
const route = useRoute();

const isActive = computed(() => route.params.type === props.item.label);
const computedClasses = computed(() => {
  if (isActive.value) {
    return `border-${attrs.position}-4 border-rose-700`;
  }
  return "";
});

const getImgUrl = (img) => {
  let url = new URL(`/src/assets/notes/${img}.svg`, import.meta.url);
  return url;
};
</script>

<template>
  <base-card
    class="h-[150px] w-[130px] items-center justify-around cursor-pointer hover:scale-[1.02] active:scale-[1.03]"
    :class="computedClasses"
    @click="$emit('click')"
  >
    <div>
      <img
        :src="getImgUrl(props.item.img)"
        style="object-fit: contain; max-height: 80px"
      />
    </div>
    {{ props.item.label }}
    <div></div>
  </base-card>
</template>

<style lang="scss" scoped></style>
