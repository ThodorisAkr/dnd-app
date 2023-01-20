<script setup></script>

<template>
  <section
    class="hero relative bg-[url(../assets/home/hero.png)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-black/35 sm:bg-transparent sm:bg-gradient-to-t sm:from-black/75 sm:to-black/45"
    ></div>

    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 flex justify-center items-center lg:justify-start lg:h-full lg:px-8"
    >
      <div class="max-w-xl text-center sm:text-left">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          <strong class="block font-extrabold text-rose-600">
            Welcome to myD&D app!
          </strong>
          <p
            class="mb-8 text-xl text-center md:text-start mt-4 text-white font-semibold"
          >
            In this app you can find information about D&D classes and monsters
            or create your notes based on your campaigns!
          </p>
        </h1>
        <router-link
          class="px-4 py-2 bg-rose-600 text-white rounded-md text-xl font-semibold shadow-md"
          :to="{ name: 'CampaignsView' }"
        >
          START TAKING NOTES
        </router-link>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  height: calc(100vh - 4rem);
}

/* .hero__container {
  background-image: url("../assets/home/hero.png");
} */

.home__content > ul {
  list-style: disc !important;
}

.home__section {
  min-height: 300px;
}
</style>
