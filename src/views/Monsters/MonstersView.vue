<script setup>
import useHttp from "@/composables/useHttp.js";
import { getAllMonsters } from "@/api/monstersApi.js";
import { computed, ref, watch } from "vue";
// import { useRouter } from "vue-router";
import BaseSpinner from "@/components/BaseSpinner.vue";

const allMonsters = ref([]);
const filteredMonsters = ref([]);
const { pending, error, fetch } = useHttp();
const pendingMonsterFilter = ref(false);
const hasSearched = ref(false);

const handleMonsters = async () => {
  const response = await fetch(getAllMonsters);
  allMonsters.value = response.data.results;
};

const filter = ref("");

const handleTimeout = (fn) => {
  let timeout;
  function inner(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, 500);
  }

  return inner;
};

const searchMonster = (key) => {
  hasSearched.value = true;
  pendingMonsterFilter.value = true;
  const newMonsters = allMonsters.value.filter((monster) =>
    monster.index.toLowerCase().includes(key.toLowerCase())
  );

  filteredMonsters.value = newMonsters;
  setTimeout(() => (pendingMonsterFilter.value = false), 200);
};

const computedMonsterArray = computed(() => {
  if (hasSearched.value && (filter.value || filter.value === ""))
    return filteredMonsters.value;
  return allMonsters.value;
});

watch(filter, (newVal) => {
  debounceMonster(newVal);
});

const debounceMonster = handleTimeout(searchMonster);

handleMonsters();
</script>

<template>
  <div class="container mx-auto py-10">
    <div v-if="!pending && !error">
      <div class="lg:flex items-end justify-between mb-10">
        <div class="flex items-center text-purpleish">
          <font-awesome-icon icon="fa-brands fa-d-and-d" class="fa-3x" />
          <h1 class="text-3xl md:text-5xl">DnD Monsters</h1>
        </div>
        <label class="relative block mt-5 lg:mt-0 min-w-[250px] max-w-[400px]">
          <span class="sr-only">Search</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2 z-10">
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              class="fa-1x mr-4 text-dark cursor-pointer"
            />
          </span>
          <input
            v-model="filter"
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
        </label>
      </div>
      <div class="monsters__container">
        <div
          v-if="!pendingMonsterFilter"
          class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
        >
          <div
            v-for="(monster, idx) in computedMonsterArray"
            :key="idx"
            class="my-[0.5rem]"
          >
            <router-link
              :to="{
                name: 'SpecificMonster',
                params: { monster: monster.index },
              }"
              class="text-dark underline"
            >
              {{ monster.name }}
            </router-link>
          </div>
        </div>
        <div v-else>
          <base-spinner></base-spinner>
        </div>
      </div>
    </div>
    <div v-else-if="pending">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="error">An Error occured</div>
  </div>
</template>

<style lang="scss" scoped></style>
