<script setup>
import useHttp from "@/composables/useHttp.js";
import { getData } from "@/api/homeApi.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dndClasses = ref([]);
const { fetch: handleGetData } = useHttp();

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
  <div class="container mx-auto">
    <h1 class="text-5xl my-20">DnD Classes(Phb)</h1>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10 place-content-center"
    >
      <div
        v-for="item in dndClasses"
        :key="item.index"
        class="class__container cursor-pointer"
        @click="handleClassesRedirect(item.index)"
      >
        <h1 class="text-2xl my-3 font-extrabold">
          {{ item.name }}
        </h1>
        <img
          :src="getImage(item.index)"
          style="object-fit: contain; height: 200px"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.class__container {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
