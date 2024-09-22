import { defineStore } from "pinia";
import axios from "axios";
import { piniaPersistConfig } from "./piniaPersistConfig";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          { email, password },
          { withCredentials: true }
        );
        console.log(response.data);
        this.user = response.data.user;
        this.isLoggedIn = true;

        // Note: We're not using router.push here anymore
        return { success: true, message: "Welcome back!", user: this.user };
      } catch (error) {
        console.error("Error logging in:", error);
        return { success: false, message: error.response?.data?.msg || "An error occurred during login" };
      }
    },
    async logout() {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/logout", {
          withCredentials: true,
        });
        console.log(response);
        this.isLoggedIn = false;
        this.user = null;
        return { success: true, message: "Logged out successfully" };
      } catch (error) {
        console.error("Error logging out:", error);
        return { success: false, message: error.response?.data?.msg || "An error occurred during logout" };
      }
    },
    async getUser() {
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
  },
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
  },
  persist: piniaPersistConfig("userStore"),
});