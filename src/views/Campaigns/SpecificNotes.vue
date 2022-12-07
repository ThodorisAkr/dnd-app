<script setup>
import { ref } from "vue";
import MyAccordion from "@/views/Classes/components/MyAccordion.vue";

const search = ref("");
</script>

<template>
  <div class="h-full">
    <div class="flex justify-end mb-4">
      <label class="relative block">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 z-10">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="fa-1x mr-4 text-dark cursor-pointer"
          />
        </span>
        <input
          v-model="search"
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search something..."
          type="text"
          name="search"
        />
      </label>
    </div>
    <p class="text-lg">
      <my-accordion
        v-for="item in 10"
        :key="item"
        class="md:w-[800px] lg:w-full"
      >
        <template #header>Title</template>
        <template #content>{{ item }}</template>
      </my-accordion>
    </p>
  </div>
</template>
