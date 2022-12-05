<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import useHttp from "@/composables/useHttp.js";
import { getMonster } from "@/api/monstersApi.js";
import BaseSpinner from "@/components/BaseSpinner.vue";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const { pending, error, fetch } = useHttp();

const monster = route.params.monster;
const monsterData = ref(null);

const handleMonster = async () => {
  const response = await fetch(getMonster, monster);
  monsterData.value = response.data;
};

const getAttrModifier = (attr) => {
  const number = Math.floor((attr - 10) / 2);
  if (number > 0) {
    return `+${number}`;
  }
  return number;
};

handleMonster();

const titleClasses = "font-bold text-3xl mt-4";
const valueClasses = "text-xl";

const attrTypes = [
  ["STR", "strength"],
  ["DEX", "dexterity"],
  ["CONST", "constitution"],
  ["INT", "intelligence"],
  ["WIS", "wisdom"],
  ["CHA", "charisma"],
];
</script>

<template>
  <div class="container mx-auto">
    <div v-if="monsterData">
      <div class="flex items-center py-10">
        <font-awesome-icon
          icon="fa-solid fa-chevron-left"
          class="fa-2x mr-4 text-redish cursor-pointer"
          @click="router.go(-1)"
        />

        <h1 class="text-5xl py-10">{{ monsterData.name }}</h1>
      </div>

      <div class="content-container grid md:grid-cols-2">
        <div>
          <div class="grid grid-cols-2 xl:grid-cols-3">
            <div>
              <h2 :class="titleClasses">Size</h2>
              <span :class="valueClasses">{{ monsterData.size }}</span>
            </div>

            <div>
              <h2 :class="titleClasses">Type</h2>
              <span :class="valueClasses">{{ monsterData.type }}</span>
            </div>

            <div>
              <h2 :class="titleClasses">Alignment</h2>
              <span :class="valueClasses">{{ monsterData.alignment }}</span>
            </div>

            <div>
              <h2 :class="titleClasses">Armor Class</h2>
              <span :class="valueClasses">{{ monsterData.armor_class }}</span>
            </div>

            <div>
              <h2 :class="titleClasses">HP</h2>
              <span :class="valueClasses">{{ monsterData.hit_points }}</span>
            </div>

            <div>
              <h2 :class="titleClasses">Speed</h2>
              <span :class="valueClasses">
                {{
                  monsterData.speed.fly
                    ? `Fly: ${monsterData.speed.fly}`
                    : `Walk: ${monsterData.speed.walk}`
                }}
              </span>
            </div>

            <div class="col-span-2 xl:col-span-3">
              <h2 :class="titleClasses">Attributes</h2>
              <ul class="flex">
                <li v-for="attr in attrTypes" :key="attr" class="pr-8 py-2">
                  <div class="block font-medium text-lg">{{ attr[0] }}</div>
                  <span :class="valueClasses">
                    {{
                      `${monsterData[attr[1]]} (${getAttrModifier(
                        monsterData[attr[1]]
                      )})`
                    }}
                  </span>
                </li>
              </ul>
            </div>
            <div v-if="monsterData.languages" class="col-span-2 xl:col-span-3">
              <h2 :class="titleClasses">Languages</h2>
              <span :class="valueClasses">{{ monsterData.languages }}</span>
            </div>
          </div>
        </div>
        <div>
          <img
            v-if="monsterData.image"
            :src="`https://www.dnd5eapi.co${monsterData.image}`"
            class="border-8 border-dark w-full object-cover"
          />
          <div v-else class="border-8 border-dark h-[430px] w-[430px]">
            <img
              src="../../assets/monsters/dragon.svg"
              class="object-contain h-[380px]"
            />
            <div class="text-center text-dark">
              No image is provided for this monster
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="pending">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="error">Error</div>
  </div>
</template>

<style lang="scss" scoped></style>
