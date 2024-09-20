import { defineStore } from "pinia";
import axios from "axios";
import { piniaPersistConfig } from "./piniaPersistConfig";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    async login() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/showUser",
          { withCredentials: true }
        );
        console.log(response.data);
        this.user = response.data.user;
        this.isLoggedIn = true;
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  },
  persist: piniaPersistConfig("userStore"),
});