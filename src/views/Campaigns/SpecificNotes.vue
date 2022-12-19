<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useNoteStore } from "@/stores/notes";
import { useDebounce } from "@/composables/useDebounce";
import NoteItemCard from "./components/NoteItemCard.vue";
import BaseCard from "../../components/BaseCard.vue";
import BaseDialog from "../../components/BaseDialog.vue";
import AddNoteForm from "./components/AddNoteForm.vue";

const props = defineProps({
  campaignId: {
    type: [String, Number],
    required: true,
  },
  noteType: {
    type: String,
    required: true,
  },
});
const route = useRoute();
const noteSystem = useNoteStore();
const filteredNotes = ref(null);
const currTypeNotes = computed(() => {
  const item = noteSystem.notes[props.campaignId - 1];
  return item?.typeNotes[props.noteType] || [];
});

const computedNotes = computed(() => {
  if (filteredNotes.value) return filteredNotes.value;
  return currTypeNotes.value;
});

const addNoteDialogOpen = ref(false);
const openNoteDialog = () => {
  addNoteDialogOpen.value = true;
};

const addNewNote = (payload) => {
  noteSystem.addNote(props.campaignId - 1, payload, props.noteType);
  closeDialog();
};

const closeDialog = () => {
  addNoteDialogOpen.value = false;
};

const search = ref("");
const { debouncedSearch } = useDebounce(searchNote);

function searchNote(key) {
  if (!key) {
    filteredNotes.value = null;
  }
  if (currTypeNotes.value) {
    filteredNotes.value = currTypeNotes.value.filter((item) =>
      item.title.toLowerCase().includes(key.toLowerCase())
    );
    return;
  }
}

watch(search, (newVal) => debouncedSearch.value(newVal));

watch(
  () => route.params.type,
  () => (filteredNotes.value = null)
);
</script>

<template>
  <div class="h-full">
    <div class="md:flex justify-between align-center mb-4">
      <div class="flex items-center flex-wrap my-4 lg:my-0">
        <h1 class="text-3xl">Your {{ noteType }} notes</h1>
        <button class="ml-2 mt-1" @click="openNoteDialog()">
          <font-awesome-icon
            icon="fas fa-plus"
            class="fa-xl text-rose-800"
          ></font-awesome-icon>
        </button>
      </div>
      <label class="relative block my-4 lg:my-0">
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
    <div v-for="item in computedNotes" :key="item" class="w-full">
      <note-item-card :item="item"></note-item-card>
    </div>

    <base-dialog :open="addNoteDialogOpen" @click-outside="closeDialog()">
      <base-card
        ref="formDialog"
        class="h-[500px] bg-white w-full md:w-[600px] rounded-lg"
      >
        <div
          class="card__title rounded-t-lg grid grid-cols-12 gap-1 bg-blue-800"
        >
          <div class="col-span-11">
            <h1 class="text-2xl p-5 text-white">
              Adding new {{ noteType }} notes!
            </h1>
          </div>
          <div class="flex justify-center items-start p-4">
            <button @click="closeDialog()">
              <font-awesome-icon
                icon="fas fa-times"
                class="text-red-700 fa-xl"
              ></font-awesome-icon>
            </button>
          </div>
        </div>

        <div
          class="card__content flex flex-auto flex-column justify-center items-start w-full"
        >
          <add-note-form @submit-form="addNewNote($event)"></add-note-form>
        </div>
      </base-card>
    </base-dialog>
  </div>
</template>
