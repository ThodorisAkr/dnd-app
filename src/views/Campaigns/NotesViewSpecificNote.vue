<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useNoteStore } from "@/stores/notes";
import { useKeyPress } from "@/composables/useKeyPress";
import { useDebounce } from "@/composables/useDebounce";

import NotesItemCard from "./components/NotesItemCard.vue";
import BaseCard from "../../components/BaseCard.vue";
import BaseDialog from "../../components/BaseDialog.vue";
import NotesAddNewForm from "./components/NotesAddNewForm.vue";

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
const { debouncedSearch } = useDebounce(searchNote);
useKeyPress([
  {
    keys: new Set(["ControlLeft", "Slash"]),
    handler: () => {
      if (addNoteDialogOpen.value) return;
      if (document.activeElement === searchInput.value) {
        return searchInput.value.blur();
      }
      searchInput.value.focus();
    },
  },

  {
    keys: new Set(["ControlLeft", "KeyY"]),
    handler: () => {
      if (addNoteDialogOpen.value) {
        closeDialog();
        return;
      } else {
        openNoteDialog();
      }
    },
  },
]);

const filteredNotes = ref(null);
const search = ref("");
const editingItem = ref(null);
const deletingItemId = ref(null);
const searchInput = ref(null);
const addNoteDialogOpen = ref(false);

const currTypeNotes = computed(() => {
  return noteSystem.getTypeNotes(props.campaignId - 1, props.noteType);
});

const computedNotes = computed(() => {
  if (filteredNotes.value) return filteredNotes.value;
  return currTypeNotes.value;
});

const openNoteDialog = (isEditing) => {
  if (!isEditing) {
    resetEditDelete();
  }
  addNoteDialogOpen.value = true;
};

const createUpdateNote = (payload) => {
  if (editingItem.value) {
    noteSystem.replaceNote(
      props.campaignId - 1,
      props.noteType,
      editingItem.value.id,
      payload
    );
    resetEditDelete();
    closeDialog();
    return;
  }
  noteSystem.addNote(props.campaignId - 1, payload, props.noteType);
  resetEditDelete();
  closeDialog();
};

const closeDialog = () => {
  addNoteDialogOpen.value = false;
};

function searchNote(key) {
  if (!key) {
    filteredNotes.value = null;
    return;
  }
  if (currTypeNotes.value) {
    filteredNotes.value = currTypeNotes.value.filter((item) =>
      item.title.toLowerCase().includes(key.toLowerCase())
    );
    return;
  }
}

function handleEdit(item) {
  editingItem.value = { ...item };
  openNoteDialog(true);
}

function handleDelete(id) {
  deletingItemId.value = id;
  let text = "Are you sure you want to delete the note?";
  if (confirm(text) == true) {
    noteSystem.deleteNote(props.campaignId - 1, props.noteType, id);
  }
  resetEditDelete();
}

function resetEditDelete() {
  editingItem.value = null;
  deletingItemId.value = null;
  search.value = "";
}

watch(search, (newVal) => debouncedSearch.value(newVal));
watch(
  () => route.params.type,
  () => {
    search.value = "";
    filteredNotes.value = null;
  }
);
</script>

<template>
  <div class="pb-24">
    <div class="md:flex md:justify-center lg:justify-between items-center mb-4">
      <div class="flex items-center flex-wrap my-4 lg:my-0">
        <h1 class="text-3xl">Your {{ noteType }} notes</h1>
        <button class="ml-2 mt-1" @click="openNoteDialog()">
          <font-awesome-icon
            icon="fas fa-plus"
            class="fa-xl text-rose-800"
          ></font-awesome-icon>
        </button>
      </div>
      <label class="relative block mt-2 ml-4 lg:my-0">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 z-10">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="fa-1x mr-4 text-dark cursor-pointer"
          />
        </span>
        <input
          v-model="search"
          ref="searchInput"
          class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search something..."
          type="text"
          name="search"
        />
      </label>
    </div>
    <div class="min-h-full flex flex-col">
      <div v-for="(item, idx) in computedNotes" :key="idx" class="w-full">
        <notes-item-card
          :item="item"
          @edit-item="handleEdit($event)"
          @delete-item="handleDelete(item.id)"
        ></notes-item-card>
      </div>
      <div class="flex-grow flex flex-col justify-center items-center">
        <div v-if="computedNotes.length <= 0 && !search">
          <h2 class="text-xl font-bold">
            You have no notes for {{ props.noteType }}
          </h2>
          <button
            class="mx-auto rounded-lg p-2 text-white flex items-center justify-center border-2 border-black my-6 hover:bg-black/5 active:bg-black/20"
            @click="openNoteDialog()"
          >
            <font-awesome-icon
              icon="fas fa-plus"
              class="fa-xl mr-1 text-black"
            ></font-awesome-icon>
            <span class="text-black cursor-pointer">
              Create your first note!
            </span>
          </button>
        </div>
        <div v-else-if="computedNotes.length <= 0 && search">
          <h2 class="text-xl font-bold">No items found for that search</h2>
        </div>
      </div>
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
          <notes-add-new-form
            @submit-form="createUpdateNote($event)"
            :editing-note="editingItem"
            :is-open="addNoteDialogOpen"
          ></notes-add-new-form>
        </div>
      </base-card>
    </base-dialog>
  </div>
</template>
