// stores/myStore.js
import { defineStore } from "pinia";
import { piniaPersistConfig } from './piniaPersistConfig';

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: "false",
  }),
  actions: {
    login() {
      // Simulate a login action
      this.isLoggedIn = true;
      // You can also perform API calls here
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
  persist: piniaPersistConfig('userStore'),
});

export const useModalsStore = defineStore("modal", {
  state: () => ({
    showLogin: "false",
    showSignUp: "false",
    showLogout: "false",
    showFav: "false",
    showCart: "false",
    showTooltip: "false",
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
    
    addToCart(item) {
      // Logic to add to cart
      this.cartItems.push(item);
    },
    removeFromCart(item) {
      // Logic to remove from cart
      const index = this.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    addToFav(item) {
      // Logic to add to favorites
      this.favItems.push(item);
    },
    removeFromFav(item) {
      // Logic to remove from favorites
      const index = this.favItems.findIndex(
        (favItem) => favItem.id === item.id
      );
      if (index !== -1) {
        this.favItems.splice(index, 1);
      }
    },
  },
  getters: {
    totalItems: (state) =>
      state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
  },
  persist: piniaPersistConfig('modalStore'),
});
