<script setup>
import useHttp from "@/composables/useHttp.js";
import { getClass } from "@/api/classesApi.js";
import { ref } from "vue";
import { useRoute } from "vue-router";
import MyAccordion from "./components/MyAccordion.vue";
import BaseSpinner from "../../components/BaseSpinner.vue";

const route = useRoute();
const chosenClass = route.params.class;

const classDetails = ref(null);
const { pending, error, fetch } = useHttp();

const handleFetchClass = async () => {
  const response = await fetch(getClass, { class: chosenClass });
  if (!response) return;
  classDetails.value = response.data;
};

const getClassImage = () => {
  return `../src/assets/classes/${route.params.class}.svg`;
};

handleFetchClass();

const titleClasses = "font-bold text-3xl mt-4";
</script>

<template>
  <div class="container mx-auto">
    <div v-if="classDetails" class="container mx-auto">
      <div class="flex items-center py-10">
        <the-back-button></the-back-button>
        <h1 class="text-5xl font-bold text-center">
          {{ classDetails.name }}
        </h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="order-2 md:order-0">
          <div>
            <font-awesome-icon
              icon="fa-solid fa-dice-d20"
              class="fa-2x mr-4 text-redish"
            />
            <h2 class="inline-block" :class="titleClasses">HIT DIE</h2>
            <div>d{{ classDetails.hit_die }}</div>
          </div>

          <div>
            <h2 :class="titleClasses">Proficiencies</h2>
            <div class="my-2 flex flex-wrap">
              <h3 class="font-medium">Armor:</h3>
              <span
                v-for="(prof, idx) in classDetails.proficiencies.filter(
                  (item) => item.index.includes('armor')
                )"
                :key="idx"
                class="mx-2"
              >
                {{ prof.name }}
              </span>
            </div>

            <div class="flex flex-wrap my-2">
              <h3 class="font-medium">Equipment:</h3>
              <span
                v-for="(prof, idx) in classDetails.proficiencies.filter(
                  (item) =>
                    !item.index.includes('saving-throw') &&
                    !item.index.includes('armor')
                )"
                :key="idx"
                class="mx-2"
              >
                {{ prof.name }}
              </span>
            </div>
          </div>

          <div>
            <h2 :class="titleClasses">Saving Throws</h2>
            <span
              v-for="(sav, idx) in classDetails.saving_throws"
              :key="idx"
              class="text-xl mr-4"
            >
              {{ sav.name }}
            </span>
          </div>

          <div v-if="classDetails.spellcasting">
            <h2 :class="titleClasses">Spellcasting</h2>
            <ul>
              <li
                v-for="(spellCasting, idx) in classDetails.spellcasting.info"
                :key="idx"
                class="text-xl"
              >
                <my-accordion>
                  <template #header>
                    {{ spellCasting.name }}
                  </template>
                  <template #content>
                    <div class="text-base">
                      {{ spellCasting.desc[0] }}
                    </div>
                  </template>
                </my-accordion>
              </li>
            </ul>
          </div>
          <div v-if="classDetails.starting_equipment_options">
            <h2 :class="titleClasses">Starting equipment options</h2>
            <ol class="list-decimal ml-5 mt-3">
              <li
                v-for="(eqOpts, idx) in classDetails.starting_equipment_options"
                :key="idx"
                class="text-xl"
              >
                {{ eqOpts.desc }}
              </li>
            </ol>
          </div>
        </div>

        <div
          class="order-1 md:order-2 flex flex-col items-start h-[300px] md:h-[416px]"
        >
          <img
            :src="getClassImage()"
            alt=""
            style="object-fit: contain"
            class="h-full"
          />
        </div>
      </div>
    </div>
    <div v-else-if="pending">
      <base-spinner></base-spinner>
    </div>

    <div v-else-if="error">An error occured {{ error.error }}</div>
  </div>
</template>

<style lang="scss">
.accordion-content {
  transition: max-height 1s ease-out;
}
</style>
