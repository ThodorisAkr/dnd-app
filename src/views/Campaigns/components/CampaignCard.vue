<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useClickOutside } from "@/composables/useClickOutside.js";

import CONFIG from "@/common/config.js";
import BaseCard from "@/components/BaseCard.vue";

const defaultImg =
  "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/dnd-5e-dragonlance-chapter-2-art-1.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5";
const userActions = CONFIG.noteTypes;
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isMenuOpen = ref(false);
const typeMenu = ref(null);

const router = useRouter();

useClickOutside(
  typeMenu,
  () => toggleMenuOpen(),
  () => isMenuOpen.value
);

const toggleMenuOpen = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const openCampaignNotes = (type = "characters") => {
  router.push({
    name: "SpecificNotes",
    params: {
      id: props.item.id,
      type,
    },
  });
};

const bgImg = computed(() => {
  return props.item.img || defaultImg;
});

const getTypeImg = (type) => {
  let url = new URL(
    `/src/assets/notes/${type.toLowerCase()}.svg`,
    import.meta.url
  );
  return url;
};
</script>

<template>
  <base-card
    class="min-w-[300px] min-h-[300px] campaign__card items-center justify-around bg-cover bg-center bg-no-repeat cursor-pointer"
    :style="`background-image: url(${bgImg})`"
    @click="openCampaignNotes()"
  >
    <div
      class="card__overlay rounded-lg p-2 flex-auto w-full flex flex-col items-center justify-end text-white"
    >
      <div class="font-bold text-xl text-center">
        {{ props.item.title }}
      </div>
      <div class="absolute top-0 right-0">
        <div ref="typeMenu" class="relative z-10">
          <font-awesome-icon
            icon="fa-solid fa-ellipsis-vertical"
            class="fa-2x ml-6 bg-black text-white rounded-bl-lg rounded-tr-lg p-2 self-center cursor-pointer"
            @click.stop="toggleMenuOpen()"
          />
          <transition name="slide-in-up">
            <div
              v-if="isMenuOpen"
              class="dropdown-menu mt-1 rounded absolute right-0 top:20 lg:-right-44 lg:top-0 z-40 shadow-lg w-40 max-w-xs bg-red-900"
            >
              <ul
                class="list-none overflow-hidden rounded border-2 border-black"
              >
                <li
                  v-for="(item, idx) in userActions"
                  :key="idx"
                  class="cursor-pointer py-2 px-4 transition duration-300 text-white font-semibold hover:text-black hover:bg-white flex items-center"
                  @click.stop="openCampaignNotes(item)"
                >
                  <div
                    class="rounded-full w-[40px] h-[40px] bg-white border-2 overflow-hidden flex justify-center items-center mr-2"
                  >
                    <img
                      :src="getTypeImg(item)"
                      style="object-fit: contain; max-height: 32px"
                    />
                  </div>
                  {{ item }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
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

.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transform-origin: top left;
  transition: all 0.5s;
  transform: rotateY(0deg);
  opacity: 1;
}
.slide-in-up-enter-from,
.slide-in-up-leave-to {
  opacity: 0;
  transform: rotateY(100deg);
}
</style>
