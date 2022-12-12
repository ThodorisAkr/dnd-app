import { defineStore } from "pinia";

export const useNoteStore = defineStore({
  id: "notes",
  state: () => ({
    notes: JSON.parse(localStorage.getItem("notes")) || [],
  }),
  getters: {},
  actions: {
    addCampaign(payload) {
      this.notes.push({ ...payload, typeNotes: {} });
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },

    addNote(idx, payload, type) {
      let toEdit = this.notes[idx].typeNotes;
      if (!toEdit[type]) {
        toEdit[type] = [];
      }
      toEdit[type].push(payload);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
  },
});
