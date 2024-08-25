// stores/myStore.js
import { defineStore } from "pinia";
import axios from 'axios';
import { piniaPersistConfig } from './piniaPersistConfig';

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    async login() {
      try {
        this.isLoggedIn = true;
        // Fetch user data after login
        const response = await axios.get('http://localhost:5000/api/v1/users/showUser');
        console.log(response.data);
        this.user = response.data;  // Store user data in the state
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  },
  persist: piniaPersistConfig('userStore'),
});

export const useModalsStore = defineStore("modal", {
  state: () => ({
    showLogin: false,
    showSignUp: false,
    showLogout: false,
    showFav: false,
    showCart: false,
    showTooltip: false,
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
