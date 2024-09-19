<template>
  <div class="vouchers-page">
    <div class="vouchers-content">
      <div class="vouchers-header">
        <h2 class="vouchers-title">Your Vouchers</h2>
        <button class="close-button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div class="vouchers-sections">
        <div class="vouchers-section">
          <h3>Available Vouchers</h3>
          <div v-if="vouchers.length > 0">
            <div v-for="voucher in vouchers" :key="voucher.id" class="voucher-item">
              <div class="voucher-details">
                <h4>{{ voucher.code }}</h4>
                <p>{{ voucher.description }}</p>
                <p>Valid until: {{ formatDate(voucher.expiryDate) }}</p>
              </div>
              <button @click="useVoucher(voucher.id)" class="use-voucher-button">Use Voucher</button>
            </div>
          </div>
          <p v-else>You currently have no available vouchers.</p>
        </div>
        <div class="vouchers-section">
          <h3>Redeem a Voucher</h3>
          <form @submit.prevent="redeemVoucher" class="redeem-form">
            <div class="form-group">
              <label for="voucherCode">Voucher Code:</label>
              <input type="text" id="voucherCode" v-model="voucherCode" required>
            </div>
            <button type="submit" class="redeem-button">Redeem</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VouchersPage',
  emits: ['close'],
  data() {
    return {
      vouchers: [
        { id: 1, code: 'SUMMER10', description: '10% off summer collection', expiryDate: '2024-08-31' },
        { id: 2, code: 'FREESHIP', description: 'Free shipping on orders over $50', expiryDate: '2024-12-31' },
      ],
      voucherCode: '',
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    useVoucher(voucherId) {
      // Here you would typically apply the voucher to the user's cart or account
      console.log('Using voucher with ID:', voucherId);
      // You might want to show a success message or update the vouchers list
    },
    redeemVoucher() {
      // Here you would typically send the voucher code to your backend for validation
      console.log('Redeeming voucher with code:', this.voucherCode);
      // You might want to show a success message or update the vouchers list
      this.voucherCode = ''; // Clear the input after submission
    }
  }
}
</script>

<style scoped>
.vouchers-page {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30;
}

.vouchers-content {
  @apply bg-white w-full max-w-3xl h-3/4 rounded-lg shadow-lg overflow-hidden flex flex-col;
}

.vouchers-header {
  @apply flex justify-between items-center bg-gray-100 p-4 border-b border-gray-200;
}

.vouchers-title {
  @apply text-xl font-semibold text-gray-800;
}

.close-button {
  @apply text-gray-500 hover:text-gray-700 transition-colors duration-200;
}

.vouchers-sections {
  @apply flex-1 overflow-y-auto p-6 space-y-6;
}

.vouchers-section {
  @apply bg-gray-50 rounded-lg p-4 shadow;
}

.vouchers-section h3 {
  @apply text-lg font-semibold mb-2;
}

.voucher-item {
  @apply flex justify-between items-center bg-white p-4 rounded-lg mb-2;
}

.voucher-details h4 {
  @apply font-bold;
}

.voucher-details p {
  @apply text-sm text-gray-600;
}

.use-voucher-button, .redeem-button {
  @apply px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-200;
}

.redeem-form {
  @apply mt-4 space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-sm font-medium text-gray-700;
}

.form-group input[type="text"] {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50;
}
</style>