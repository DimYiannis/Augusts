import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchOrders() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:5000/api/v1/orders/showAllMyOrders', { withCredentials: true });
        this.orders = response.data.orders;
      } catch (error) {
        console.error('Error fetching orders:', error);
        this.error = error.message || 'An error occurred while fetching orders';
      } finally {
        this.isLoading = false;
      }
    },
    async deleteOrder(orderId) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(`http://localhost:5000/api/v1/orders/${orderId}`, { withCredentials: true });
        this.orders = this.orders.filter(order => order._id !== orderId);
      } catch (error) {
        console.error('Error deleting order:', error);
        this.error = error.message || 'An error occurred while deleting the order';
      } finally {
        this.isLoading = false;
      }
    },
  },
});