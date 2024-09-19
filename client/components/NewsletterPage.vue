<template>
  <div class="newsletter-page">
    <div class="newsletter-content">
      <div class="newsletter-header">
        <h2 class="newsletter-title">Newsletter Subscription</h2>
        <button class="close-button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div class="newsletter-sections">
        <div class="newsletter-section">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter to receive the latest updates on:</p>
          <ul>
            <li>New product releases</li>
            <li>Exclusive offers and discounts</li>
            <li>Fashion tips and trends</li>
            <li>Special events and promotions</li>
          </ul>
        </div>
        <div class="newsletter-section">
          <h3>Subscription Preferences</h3>
          <form @submit.prevent="submitForm" class="newsletter-form">
            <div class="form-group">
              <label for="email">Email Address:</label>
              <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" v-model="preferences.newProducts"> New Products
              </label>
              <label>
                <input type="checkbox" v-model="preferences.offers"> Offers and Discounts
              </label>
              <label>
                <input type="checkbox" v-model="preferences.fashionTips"> Fashion Tips
              </label>
              <label>
                <input type="checkbox" v-model="preferences.events"> Events and Promotions
              </label>
            </div>
            <button type="submit" class="subscribe-button">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsletterPage',
  emits: ['close'],
  data() {
    return {
      email: '',
      preferences: {
        newProducts: false,
        offers: false,
        fashionTips: false,
        events: false
      }
    }
  },
  methods: {
    submitForm() {
      // Here you would typically send this data to your backend
      console.log('Form submitted', { email: this.email, preferences: this.preferences });
      // You might want to show a success message or close the modal here
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.newsletter-page {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30;
}

.newsletter-content {
  @apply bg-white w-full max-w-3xl h-3/4 rounded-lg shadow-lg overflow-hidden flex flex-col;
}

.newsletter-header {
  @apply flex justify-between items-center bg-gray-100 p-4 border-b border-gray-200;
}

.newsletter-title {
  @apply text-xl font-semibold text-gray-800;
}

.close-button {
  @apply text-gray-500 hover:text-gray-700 transition-colors duration-200;
}

.newsletter-sections {
  @apply flex-1 overflow-y-auto p-6 space-y-6;
}

.newsletter-section {
  @apply bg-gray-50 rounded-lg p-4 shadow;
}

.newsletter-section h3 {
  @apply text-lg font-semibold mb-2;
}

.newsletter-section ul {
  @apply list-disc list-inside mb-4;
}

.newsletter-section li, .newsletter-section p {
  @apply text-gray-700 mb-1;
}

.newsletter-form {
  @apply space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-sm font-medium text-gray-700;
}

.form-group input[type="email"] {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50;
}

.form-group input[type="checkbox"] {
  @apply mr-2;
}

.subscribe-button {
  @apply w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}
</style>