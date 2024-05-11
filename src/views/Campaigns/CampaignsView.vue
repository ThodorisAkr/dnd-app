<script setup>
import { ref } from "vue";

import { useNoteStore } from "@/stores/notes";

import NormalViewWrapper from "../../components/Wrappers/NormalViewWrapper.vue";
import CampaignCard from "./components/CampaignsViewCard.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseCard from "@/components/BaseCard.vue";
import CampaignsAddNewForm from "./components/CampaignsAddNewForm.vue";

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

function downloadNotes(data) {
  const content = JSON.stringify(data);
  var a = document.createElement("a");
  var file = new Blob([content], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = "DnD_notes.txt";
  a.click();
}

function importNotes(evt) {
  var f = evt.target.files[0];
  if (f.type !== "text/plain") return;
  if (f) {
    var r = new FileReader();
    r.onload = function (e) {
      var contents = e.target.result;
      noteSystem.importCampaignNotes(JSON.parse(contents));
    };
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}
</script>

<template>
  <normal-view-wrapper>
    <template #title>
      <div class="flex-grow flex">
        <h1 class="text-4xl md:text-5xl">My Campaigns</h1>
        <button class="mt-2 ml-8" @click="toggleDialog()">
          <font-awesome-icon
            icon="fas fa-plus"
            class="fa-2x text-rose-800"
          ></font-awesome-icon>
        </button>
      </div>
      <button
        class="mx-auto rounded-lg p-2 flex items-center justify-center border-2 border-black my-6 hover:bg-black/5 active:bg-black/20"
        @click="downloadNotes(noteSystem.notes)"
      >
        <font-awesome-icon
          icon="fas fa-download"
          class="fa-xl mr-1 text-black"
        ></font-awesome-icon>
        <span> Export your notes! </span>
      </button>
    </template>
    <div v-if="noteSystem.notes.length === 0" class="text-center">
      <h2 class="text-xl font-bold">You haven't started taking notes yet...</h2>
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
      <div>Or</div>
      <label for="dndImport">
        <div
          class="inline-block mx-auto rounded-lg p-2 text-white items-center justify-center border-2 border-black my-6 hover:bg-black/5 active:bg-black/20"
        >
          <font-awesome-icon
            icon="fas fa-file-import"
            class="fa-xl mr-1 text-black"
          ></font-awesome-icon>
          <span class="text-black cursor-pointer">
            Import an existing notebook!
          </span>
        </div>
        <input
          type="file"
          id="dndImport"
          @change="importNotes($event)"
          class="hidden"
        />
      </label>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
      <div v-for="(item, idx) in noteSystem.notes" :key="idx">
        <campaign-card :item="item"></campaign-card>
      </div>
    </div>

    <base-dialog :open="dialogOpen" @click-outside="toggleDialog()">
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
          <campaigns-add-new-form
            @submit-campaign="addNewCampaign($event)"
          ></campaigns-add-new-form>
        </div>
      </base-card>
    </base-dialog>
  </normal-view-wrapper>
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
