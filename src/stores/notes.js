import { defineStore } from "pinia";
import uuid from "@/helpers/uuid.js";
let campaignIndex = 1;

let notes = localStorage.getItem("notes");
if (notes) {
  const parsed = JSON.parse(notes);
  campaignIndex = parsed[parsed.length - 1].id + 1;
}
export const useNoteStore = defineStore({
  id: "notes",
  state: () => ({
    notes: JSON.parse(localStorage.getItem("notes")) || [],
  }),
  getters: {},
  actions: {
    addCampaign(payload) {
      this.notes.push({ ...payload, typeNotes: {}, id: campaignIndex++ });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },

    addNote(idx, payload, type) {
      let toEdit = this.notes[idx].typeNotes;
      if (!toEdit[type]) {
        toEdit[type] = [];
      }
      toEdit[type].push({ ...payload, id: uuid() });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },

    replaceNote(idx, type, id, payload) {
      const toEdit = this.notes[idx].typeNotes[type];
      let editedNote = toEdit.find((item) => item.id === id);
      editedNote.title = payload.title;
      editedNote.description = payload.description;
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },

    deleteNote(idx, type, id) {
      let toDelete = this.notes[idx].typeNotes[type];
      if (!toDelete) return;
      let itemIdx = toDelete.findIndex((item) => item.id === id);
      toDelete.splice(itemIdx, 1);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    getTypeNotes(idx, type) {
      const item = this.notes[idx];
      return item?.typeNotes[type] || [];
    },
  },
});
