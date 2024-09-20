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
      <div v-if="orderStore.isLoading" class="spinner-wrapper">
        <Spinner />
      </div>
      <div v-else-if="orderStore.orders.length > 0" class="order-list">
        <div v-for="order in orderStore.orders" :key="order._id" class="order-item">
          <div class="order-info">
            <p class="order-date">Order Date: {{ formatDate(order.createdAt) }}</p>
            <p class="order-number">Order #: {{ order._id }}</p>
          </div>
          <div class="order-products">
            <div v-for="product in order.orderItems" :key="product.product" class="product-item">
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="product-details">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-price">{{ formatPrice(product.price) }}</p>
                <p class="product-quantity">Quantity: {{ product.amount }}</p>
              </div>
            </div>
          </div>
          <div class="order-total">
            <p>Total: {{ formatPrice(order.total) }}</p>
          </div>
          <button @click="deleteOrder(order._id)" class="delete-button">
            Delete Order
          </button>
        </div>
      </div>
      <div v-else class="no-orders">
        <p>You have no orders yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useOrderStore } from '../stores/orderStore';

export default {
  emits: ['close'],
  setup() {
    const orderStore = useOrderStore();

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
    };

    const deleteOrder = async (orderId) => {
      if (confirm('Are you sure you want to delete this order?')) {
        await orderStore.deleteOrder(orderId);
      }
    };

    onMounted(() => {
      orderStore.fetchOrders();
    });

    return {
      orderStore,
      formatDate,
      formatPrice,
      deleteOrder,
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
  @apply w-24 h-24 object-cover rounded mr-4; /* Increased size for better visibility */
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

.loader-container {
  @apply flex items-center justify-center h-full;
}

.loader {
  @apply w-12 h-12 border-4 border-gray-200 rounded-full animate-spin;
  border-top-color: #3498db;
}

.spinner-wrapper {
  @apply flex-1 flex items-center justify-center;
}

.delete-button {
  @apply mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200;
}
</style>