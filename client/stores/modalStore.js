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
        this.favItems = response.data.likes;
          
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      } finally {
        this.isFetchingFav = false;
      }
    },
    async addToFav(item) {
      this.isAddingToFav = true;
      try {
        const { _id: productId, productType, size } = item;
        const payload = { productId, productType, size };
        console.log("Payload being sent:", payload);

        const response = await axios.post(
          "http://localhost:5000/api/v1/likes",
          payload,
          { withCredentials: true }
        );
        console.log("Response from server:", response);

        if (response.data) {
         // Check if the item is in the response, either directly or nested
          const newItem = response.data.like || response.data.item || item;
          
          // Add the new item to favItems, avoiding duplicates
          const index = this.favItems.findIndex(
            (favItem) => favItem._id === newItem._id
          );
          if (index !== -1) {
            this.favItems[index] = newItem;
          } else {
            this.favItems.push(newItem);
          }
          console.log("Item added to favorites successfully:", newItem);
        } else {
          throw new Error('Empty response data from server');
        }
      } catch (error) {
        console.error("Error adding item to favorites:", error);
        // You might want to set an error state here or show a notification to the user
      } finally {
        this.isAddingToFav = false;
      }
    },
    async removeFromFav(itemId) {
      this.isRemovingFromFav = true;
      try {
        await axios.delete(`http://localhost:5000/api/v1/likes/${itemId}`, {
          withCredentials: true,
        });
        console.log("Item removed from favorites successfully");

        // Remove the item from the local state
        this.favItems = this.favItems.filter(item => item._id !== itemId);

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