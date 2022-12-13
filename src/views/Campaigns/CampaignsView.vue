<script setup>
import { useNoteStore } from "@/stores/notes";
import { ref } from "vue";
import CampaignCard from "./components/CampaignCard.vue";

import BaseDialog from "@/components/BaseDialog.vue";
import BaseCard from "@/components/BaseCard.vue";

import AddCampaignForm from "./components/AddCampaignForm.vue";

const noteSystem = useNoteStore();

const dialogOpen = ref(false);

const addNewCampaign = (payload) => {
  noteSystem.addCampaign(JSON.parse(JSON.stringify(payload)));
  toggleDialog();
  return;
};

const toggleDialog = () => {
  dialogOpen.value = !dialogOpen.value;
};
</script>

<template>
  <div class="page__container py-10">
    <div class="container mx-auto">
      <div class="notes__container">
        <div class="flex justify-start items-center mb-10">
          <h1 class="text-5xl">My Campaigns</h1>
          <button class="mt-2 ml-8" @click="toggleDialog()">
            <font-awesome-icon
              icon="fas fa-plus"
              class="fa-2x text-rose-800"
            ></font-awesome-icon>
          </button>
        </div>
        <div>
          <div v-if="noteSystem.notes.length === 0" class="text-center">
            <h2 class="text-xl font-bold">
              You haven't started taking notes yet...
            </h2>
            <button
              class="mx-auto rounded-lg p-2 text-white flex items-center justify-center border-2 border-black my-6 hover:bg-black/5 active:bg-black/20"
              @click="toggleDialog()"
            >
              <font-awesome-icon
                icon="fas fa-plus"
                class="fa-xl mr-1 text-black"
              ></font-awesome-icon>
              <span class="text-black cursor-pointer">
                Create a Campaign Notebook!
              </span>
            </button>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8"
        >
          <div v-for="(item, idx) in noteSystem.notes" :key="idx">
            <campaign-card :item="item"></campaign-card>
          </div>
        </div>

        <base-dialog :open="dialogOpen">
          <base-card class="h-[500px] bg-white w-full md:w-[600px] rounded-lg">
            <div
              class="card__title rounded-t-lg grid grid-cols-12 gap-1 bg-blue-800"
            >
              <div class="col-span-11">
                <h1 class="text-2xl p-5 text-white">Your new campaign</h1>
              </div>
              <div class="flex justify-center items-start p-4">
                <button @click="toggleDialog()">
                  <font-awesome-icon
                    icon="fas fa-times"
                    class="text-red-700 fa-xl"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>

            <div
              class="card__content flex-auto flex flex-column justify-center items-start w-full"
            >
              <add-campaign-form
                @submit-campaign="addNewCampaign($event)"
              ></add-campaign-form>
            </div>
          </base-card>
        </base-dialog>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page__container {
  min-height: calc(100vh - 4rem);
}

.campaign__card {
  transition: transform 0.2s ease-in-out;
}
.card__overlay {
  background: linear-gradient(
    to top,
    black 0%,
    rgba(0, 0, 0, 0.447) 10%,
    rgba(0, 0, 0, 0.447) 20%,
    transparent 100%
  );
}
</style>
