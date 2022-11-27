<script setup>
import useHttp from "@/composables/useHttp.js";
import { getData } from "@/api/homeApi.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseSpinner from "../../components/BaseSpinner.vue";
const router = useRouter();

const dndClasses = ref([]);
const { pending, fetch: handleGetData } = useHttp();

const getImage = (charClass) => {
  return `../src/assets/classes/${charClass}.svg`;
};

const handleHomeData = async () => {
  const response = await handleGetData(getData);
  dndClasses.value = response.data.results;
};

const handleClassesRedirect = (charClass) => {
  router.push({ name: "SpecificClass", params: { class: charClass } });
};

handleHomeData();
</script>

<template>
  <div v-if="!pending" class="container mx-auto">
    <h1 class="text-5xl my-20">DnD Classes(Phb)</h1>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10 place-content-center"
    >
      <div
        v-for="item in dndClasses"
        :key="item.index"
        class="cursor-pointer h-[250px] flex flex-col justify-end border-2"
        @click="handleClassesRedirect(item.index)"
      >
        <div
          class="absolute left-0 right-0 w-100 text-center backdrop-opacity-80 bg-black/80 z-10 top-0"
        >
          <h1 class="text-2xl py-2 font-extrabold block text-white">
            {{ item.name }}
          </h1>
        </div>
        <div>
          <img
            :src="getImage(item.index)"
            class="h-[190px] hover:h-[220px] w-full object-contain overflow-visible ease-in-out duration-200"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="pending">
    <base-spinner></base-spinner>
  </div>
</template>

<style lang="scss">
.class__container {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
