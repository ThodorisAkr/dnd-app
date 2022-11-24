import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    access_token: localStorage.getItem("token") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.access_token,
  },
  actions: {
    setToken(payload) {
      localStorage.setItem("token", payload);
      this.access_token = payload;
    },

    removeToken() {
      localStorage.removeItem("token");
      this.access_token = "";
    },
  },
});
