import { defineStore } from "pinia";
import axios from "axios";

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
      this.isFetchingCart = true;
      try {
        const response = await axios.get("http://localhost:5000/api/v1/cart", {
          withCredentials: true,
        });
        console.log("Cart items fetched successfully:", response.data);
        this.cartItems = Array.isArray(response.data.items)
          ? response.data.items
          : [];
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        this.isFetchingCart = false;
      }
    },
    async order() {
      this.isOrdering = true;
      try {
        const payload = {
          items: this.cartItems.map(item => ({
            name: item.productDetails.name,
            price: item.productDetails.price,
            image: item.productDetails.image,
            amount: item.quantity,
            productId: item.productDetails._id
          }))
        };
        console.log("Payload being sent:", payload);
        const response = await axios.post(
          "http://localhost:5000/api/v1/orders",
          payload,
          { withCredentials: true }
        );
        console.log("Order placed successfully:", response.data);
        this.cartItems = [];
      } catch (error) {
        console.error("Error placing order:", error);
      } finally {
        this.isOrdering = false;
      }
    },
    async addToCart(item) {
      this.isAddingToCart = true;
      try {
        const { _id: productId, productType, size } = item;
        const payload = { productId, productType, size };
        console.log("Payload being sent:", payload);
        
        const response = await axios.post(
          "http://localhost:5000/api/v1/cart",
          payload,
          { withCredentials: true }
        );
        console.log("Server response:", response.data);
        const newItem = response.data.item;
        const index = this.cartItems.findIndex(
          (cartItem) => cartItem._id === newItem._id
        );
        if (index !== -1) {
          this.cartItems[index] = newItem;
        } else {
          this.cartItems.push(newItem);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      } finally {
        this.isAddingToCart = false;
      }
    },
    async removeCartItem(itemId) {
      this.isRemovingFromCart = true;
      try {
        if (!itemId) {
          throw new Error("Invalid item ID");
        }
        if (typeof itemId !== "string" || !itemId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid item ID format");
        }
        console.log("Item ID passed to removeCartItem:", itemId);
        await axios.delete(`http://localhost:5000/api/v1/cart/${itemId}`, {
          withCredentials: true,
        });
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      } catch (error) {
        console.error("Error removing item from cart:", error);
      } finally {
        this.isRemovingFromCart = false;
      }
    },
    async patchCart(itemId) {
      this.isAddingToCart = true;
      try {
        console.log("Item passed to addToCart:", itemId);
        console.log("cart items", this.cartItems);
        if (!itemId) {
          throw new Error("Invalid item ID");
        }
        this.cartItems.forEach((cartItem, index) => {
          console.log(`Cart item ${index}:`, cartItem._id);
        });
        const index = this.cartItems.findIndex(
          (cartItem) => cartItem._id === itemId
        );
        console.log("Found item index:", index);
        if (index === -1) {
          throw new Error("Item not found in local cart");
        }
        const currentQuantity = this.cartItems[index].quantity;
        const newQuantity = currentQuantity + 1;
        const response = await axios.patch(
          `http://localhost:5000/api/v1/cart/${itemId}`,
          { quantity: newQuantity },
          { withCredentials: true }
        );
        console.log("Item updated successfully:", response.data);
        this.cartItems[index].quantity = response.data.item.quantity;
      } catch (error) {
        console.error("Error adding item to cart:", error);
      } finally {
        this.isAddingToCart = false;
      }
    },
    async decrementCart(itemId) {
      this.isAddingToCart = true;
      try {
        console.log("Item passed to addToCart:", itemId);
        console.log("cart items", this.cartItems);
        if (!itemId) {
          throw new Error("Invalid item ID");
        }
        this.cartItems.forEach((cartItem, index) => {
          console.log(`Cart item ${index}:`, cartItem._id);
        });
        const index = this.cartItems.findIndex(
          (cartItem) => cartItem._id === itemId
        );
        console.log("Found item index:", index);
        if (index === -1) {
          throw new Error("Item not found in local cart");
        }
        const currentQuantity = this.cartItems[index].quantity;
        const newQuantity = currentQuantity - 1;
        const response = await axios.patch(
          `http://localhost:5000/api/v1/cart/${itemId}`,
          { quantity: newQuantity },
          { withCredentials: true }
        );
        console.log("Item updated successfully:", response.data);
        this.cartItems[index].quantity = response.data.item.quantity;
      } catch (error) {
        console.error("Error adding item to cart:", error);
      } finally {
        this.isAddingToCart = false;
      }
    },
  },
  getters: {
    totalItems: (state) =>
      state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) =>
      state.cartItems.reduce(
        (acc, item) => acc + item.productDetails.price * item.quantity,
        0
      ),
  },
});