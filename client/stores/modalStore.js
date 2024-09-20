import { defineStore } from "pinia";
import axios from "axios";
import { piniaPersistConfig } from "./piniaPersistConfig";

export const useModalsStore = defineStore("modal", {
  state: () => ({
    showLogin: false,
    showSignUp: false,
    showLogout: false,
    showFav: false,
    showCart: false,
    showTooltip: false,
    favItems: [],
    isAddingToFav: false,
    isRemovingFromFav: false,
    isFetchingFav: false,
  }),
  actions: {
    toggleLogin() {
      this.showLogin = true;
      this.showSignUp = false;
    },
    toggleSignUp() {
      this.showLogin = false;
      this.showSignUp = true;
    },
    toggleLogout() {
      this.showLogout = !this.showLogout;
    },
    toggleFav() {
      this.showFav = !this.showFav;
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    async fetchFavItems() {
      this.isFetchingFav = true;
      try {
        const response = await axios.get("http://localhost:5000/api/v1/likes", {
          withCredentials: true,
        });
        console.log("Favorite items fetched successfully:", response.data);
        this.favItems = Array.isArray(response.data.items)
          ? response.data.items
          : [];
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      } finally {
        this.isFetchingFav = false;
      }
    },
    async addToFav(item) {
      this.isAddingToFav = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/likes",
          item,
          { withCredentials: true }
        );
        console.log("Item added to favorites successfully:", response.data);
        const index = this.favItems.findIndex(
          (favItem) => favItem.id === item.id && favItem.size === item.size
        );
        if (index === -1) {
          this.favItems.push({ ...item });
        }
      } catch (error) {
        console.error("Error adding item to favorites:", error);
      } finally {
        this.isAddingToFav = false;
      }
    },
    async removeFromFav(item) {
      this.isRemovingFromFav = true;
      try {
        await axios.delete(`http://localhost:5000/api/v1/likes/${item.id}`, {
          withCredentials: true,
        });
        console.log("Item removed from favorites successfully");
        const index = this.favItems.findIndex(
          (favItem) => favItem.id === item.id && favItem.size === item.size
        );
        if (index !== -1) {
          this.favItems.splice(index, 1);
        }
      } catch (error) {
        console.error("Error removing item from favorites:", error);
      } finally {
        this.isRemovingFromFav = false;
      }
    },
  },
  getters: {
    favItemsCount: (state) => state.favItems.length,
  },
  persist: piniaPersistConfig("modalStore"),
});