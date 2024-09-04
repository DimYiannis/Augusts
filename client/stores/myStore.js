// stores/myStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { piniaPersistConfig } from "./piniaPersistConfig";
import { determineProductType } from "./productTypeMapping"; // Import the mapping

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
        this.user = response.data.user; // Store user data in the state

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
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
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
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
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
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
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

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    isOrdering: false,
    isAddingToCart: false,
    isFetchingCart: false,
    isRemovingFromCart: false,
  }),
  actions: {
    async fetchCartItems() {
      this.isFetchingCart = true; // Set the flag to indicate loading state
      try {
        // Send GET request to fetch cart items from the server
        const response = await axios.get("http://localhost:5000/api/v1/cart", {
          withCredentials: true,
        });

        console.log("Cart items fetched successfully:", response.data);

        // Ensure that fetched data is an array before assigning
        this.cartItems = Array.isArray(response.data.items)
          ? response.data.items
          : [];
      } catch (error) {
        console.error("Error fetching cart items:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.log("Response headers:", error.response.headers);
        }
      } finally {
        this.isFetchingCart = false; // Reset the loading state
      }
    },

    async order() {
      this.isOrdering = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/orders",
          {
            items: this.cartItems,
          },
          { withCredentials: true }
        );

        // Process response if needed
        console.log("Order placed successfully:", response.data);

        // Clear cart or handle as per your logic
        this.cartItems = [];
      } catch (error) {
        console.error("Error placing order:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.log("Response headers:", error.response.headers);
        }
      } finally {
        this.isOrdering = false;
      }
    },

    async addToCart(item) {
      this.isAddingToCart = true; //  indicate loading state
      try {
        console.log("Item passed to addToCart:", item);
        const productType = item.productType;
        const productId = item._id;
        // console.log('Product Type:', productType); // Log the product type
        // console.log('Product ID:', productId); // Log the product ID

        if (!productType || !productId) {
          throw new Error("Invalid product data");
        }

        // Include productType in the item object
        const payload = { productId, productType };

        // Log the payload to verify its content
        console.log("Payload being sent:", payload);

        // POST request to add the item to the server cart
        const response = await axios.post(
          "http://localhost:5000/api/v1/cart",
          payload,
          { withCredentials: true }
        );

        console.log("Item added to server cart successfully:", response.data);

        // Check if item is already in local cartItems
        const index = this.cartItems.findIndex(
          (cartItem) => cartItem.id === item.id && cartItem.size === item.size
        );

        if (index !== -1) {
          // Item exists in local cartItems, update quantity
          this.cartItems[index].quantity += 1;
        } else {
          // Item does not exist, add new item with quantity 1
          this.cartItems.push({ ...item, quantity: 1 });
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.log("Response headers:", error.response.headers);
        }
      } finally {
        this.isAddingToCart = false; // Reset the loading state
      }
    },

    async removeCartItem(itemId) {
      this.isRemovingFromCart = true;
      try {
        // Send DELETE request to the backend to remove the item
        await axios.delete(`http://localhost:5000/api/v1/cart/${itemId}`, {
          withCredentials: true,
        });

        // Update local state to reflect item removal
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      } catch (error) {
        console.error("Error removing item from cart:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      } finally {
        this.isRemovingFromCart = false;
      }
    },

    async patchCart(itemId) {
      this.isAddingToCart = true; //  indicate loading state
      try {
        console.log("Item passed to addToCart:", itemId);

        // Check if itemId is valid
        if (!itemId) {
          throw new Error("Invalid item ID");
        }

        const response = await axios.patch(
          `http://localhost:5000/api/v1/cart/${itemId}`,
          { withCredentials: true }
        );

        console.log("Item updated successfully:", response.data);

        // local cartItems state
        const index = this.cartItems.findIndex(
          (cartItem) => cartItem.id === itemId
        );

        if (index !== -1) {
          // Item exists in local cartItems, update quantity
          this.cartItems[index].quantity = response.data.item.quantity;
        } else {
          // Item does not exist, add new item with quantity from server response
          this.cartItems.push(response.data.item);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.log("Response headers:", error.response.headers);
        }
      } finally {
        this.isAddingToCart = false; // Reset the loading state
      }
    },
  },
  getters: {
    totalItems: (state) =>
      state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) =>
      state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
  },
});
