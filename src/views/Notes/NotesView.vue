<script setup>
import { useNoteStore } from "@/stores/notes";
const noteSystem = useNoteStore();

const addNewCampaign = (payload) => {
  console.log(payload);
  // noteSystem.addCampaign(payload);
  return;
};
</script>

<template>
  <div class="page__container">
    <div class="container mx-auto">
      <div class="notes__container">
        <h1 class="text-5xl py-20">My Notes</h1>
        <div>
          <div v-if="noteSystem.notes.length === 0" class="text-center">
            <h2 class="text-xl font-bold">
              You haven't started taking notes yet...
            </h2>
            <button
              class="mx-auto rounded-lg p-2 text-white flex items-center justify-center border-2 border-black my-6 hover:bg-black/5 active:bg-black/20"
              @click="addNewCampaign('new campaign')"
            >
              <font-awesome-icon
                icon="fas fa-plus"
                class="fa-xl mr-1 text-black"
              ></font-awesome-icon>
              <span class="text-black"> Create a Campaign Notebook! </span>
            </button>
          </div>
        </div>

        <div v-for="(item, idx) in noteSystem.notes" :key="idx">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page__container {
  min-height: calc(100vh - 4rem);
}
</style>
