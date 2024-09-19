<template>
  <div class="help-page">
    <div class="help-content">
      <div class="help-header">
        <h2 class="help-title">Help Center</h2>
        <button class="close-button" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div class="help-sections">
        <div class="help-section">
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li>How do I track my order?</li>
            <li>What is your return policy?</li>
            <li>How can I change my shipping address?</li>
            <li>Do you offer international shipping?</li>
          </ul>
        </div>
        <div class="help-section">
          <h3>Contact Us</h3>
          <p>Email: support@augusts.com</p>
          <p>Phone: 1-800-123-4567</p>
          <p>Hours: Monday-Friday, 9am-5pm EST</p>
        </div>
        <div class="help-section">
          <h3>Shipping Information</h3>
          <p>We offer free shipping on orders over $50.</p>
          <p>Standard shipping takes 3-5 business days.</p>
          <p>Express shipping is available for an additional fee.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpPage',
  emits: ['close']
}
</script>

<style scoped>
.help-page {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30;
}

.help-content {
  @apply bg-white w-full max-w-3xl h-3/4 rounded-lg shadow-lg overflow-hidden flex flex-col;
}

.help-header {
  @apply flex justify-between items-center bg-gray-100 p-4 border-b border-gray-200;
}

.help-title {
  @apply text-xl font-semibold text-gray-800;
}

.close-button {
  @apply text-gray-500 hover:text-gray-700 transition-colors duration-200;
}

.help-sections {
  @apply flex-1 overflow-y-auto p-6 space-y-6;
}

.help-section {
  @apply bg-gray-50 rounded-lg p-4 shadow;
}

.help-section h3 {
  @apply text-lg font-semibold mb-2;
}

.help-section ul {
  @apply list-disc list-inside;
}

.help-section li, .help-section p {
  @apply text-gray-700 mb-1;
}
</style>