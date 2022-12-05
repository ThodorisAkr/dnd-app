<script setup>
import useHttp from "@/composables/useHttp.js";
import { getHomeData } from "@/api/homeApi.js";
import { ref } from "vue";

const { pending, error, fetch: handleHome } = useHttp();
console.log(pending, error);
const homeData = ref(null);

const getDirectusCollection = async () => {
  const { data } = await handleHome(getHomeData);
  console.log(data.data);
  homeData.value = data.data;
};

homeData.value = getDirectusCollection();
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
      <div v-for="(item, idx) in homeData" :key="idx">
        <div></div>
        <h2 class="text-2xl font-bold pb-6">
          {{ item.title }}
        </h2>
        <div class="home__content" v-html="item.description"></div>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  max-height: calc(100vh - 4rem);
}

.hero__container {
  background-image: url("../assets/home/hero.png");
}

.home__content > ul {
  list-style: disc !important;
}
</style>
