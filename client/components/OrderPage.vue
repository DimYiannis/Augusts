<template>
  <div class="order-page">
    <div class="order-content">
      <div class="order-header">
        <h2 class="order-title">Your Orders</h2>
        <button class="close-button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div class="order-list" v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <div class="order-info">
            <p class="order-date">Order Date: {{ formatDate(order.date) }}</p>
            <p class="order-number">Order #: {{ order.id }}</p>
          </div>
          <div class="order-products">
            <div v-for="product in order.products" :key="product.id" class="product-item">
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="product-details">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-price">{{ formatPrice(product.price) }}</p>
                <p class="product-quantity">Quantity: {{ product.quantity }}</p>
              </div>
            </div>
          </div>
          <div class="order-total">
            <p>Total: {{ formatPrice(order.total) }}</p>
          </div>
        </div>
      </div>
      <div v-else class="no-orders">
        <p>You have no orders yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  emits: ['close'],
  setup() {
    const orders = ref([]);

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/orders', { withCredentials: true });
        orders.value = response.data.orders;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
    };

    onMounted(fetchOrders);

    return {
      orders,
      formatDate,
      formatPrice,
    };
  }
}
</script>

<style scoped>
.order-page {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30;
}

.order-content {
  @apply bg-white w-full max-w-3xl h-3/4 rounded-lg shadow-lg overflow-hidden flex flex-col;
}

.order-header {
  @apply flex justify-between items-center bg-gray-100 p-4 border-b border-gray-200;
}

.order-title {
  @apply text-xl font-semibold text-gray-800;
}

.close-button {
  @apply text-gray-500 hover:text-gray-700 transition-colors duration-200;
}

.order-list {
  @apply flex-1 overflow-y-auto p-4;
}

.order-item {
  @apply bg-gray-50 rounded-lg p-4 mb-4 shadow;
}

.order-info {
  @apply flex justify-between mb-2 text-sm text-gray-600;
}

.order-products {
  @apply space-y-2;
}

.product-item {
  @apply flex items-center bg-white p-2 rounded;
}

.product-image {
  @apply w-16 h-16 object-cover rounded mr-4;
}

.product-details {
  @apply flex-1;
}

.product-name {
  @apply font-semibold;
}

.product-price, .product-quantity {
  @apply text-sm text-gray-600;
}

.order-total {
  @apply mt-2 text-right font-semibold;
}

.no-orders {
  @apply flex items-center justify-center h-full text-gray-500;
}
</style>