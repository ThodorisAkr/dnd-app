import { defineStore } from "pinia";

export const useNoteStore = defineStore({
  id: "notes",
  state: () => ({
    notes: JSON.parse(localStorage.getItem("notes")) || [],
  }),
  getters: {},
  actions: {
    addCampaign(payload) {
      this.notes.push(payload);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
  },
});
