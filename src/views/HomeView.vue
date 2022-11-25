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

handleHomeData();

const handleClassesRedirect = (charClass) => {
  router.push({ name: "SpecificClass", params: { class: charClass } });
};
</script>

<template>
  <section
    class="hero relative bg-[url(../assets/home/hero.png)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-black/35 sm:bg-transparent sm:bg-gradient-to-t sm:from-black/75 sm:to-black/45"
    ></div>

    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
    >
      <div class="max-w-xl text-center sm:text-left">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          <strong class="block font-extrabold text-rose-600">
            Welcome to my DnD app!
          </strong>
        </h1>

        <div class="mt-8 flex flex-wrap gap-4 text-center">
          <a
            href="#"
            class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-800 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  </section>
  <section class="classes__section h-full pt-12 bg-[#FFF6F6]">
    <div class="container mx-auto">
      <div
        class="section__title border-b-4 border-rose-700/100 pb-2 mb-[5rem] flex items-end justify-between"
      >
        <h2 class="text-6xl">Classes</h2>
        <router-link :to="{ name: 'CharacterClasses' }" class="text-black">
          Go to page
        </router-link>
      </div>
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
  </section>
</template>

<style scss scoped>
.hero {
  max-height: calc(100vh - 4rem);
}

.hero__container {
  background-image: url("../assets/home/hero.png");
}
.class__container {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
