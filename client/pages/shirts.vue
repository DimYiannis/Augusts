<template>
  <!-- loading state -->
  <LoadSpinner v-if="showHideSpinner" />

  <div class="bg-white w-full h-full grid justify-items-stretch">
    <div class="w-screen my-20">
      <div class="text-center text-xl">
        Get Your Perfect Fit: Shop Our Stylish T-Shirts Collection
      </div>

      <div class="items">
        <item
          v-for="item in items"
          :item="item"
          :key="item.id"
        >
        </item>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { useCartStore } from '../stores/cartStore';
  import { useModalsStore } from '../stores/modalStore';
  import { determineProductType } from '../stores/productTypeMapping'; // Import the mapping


  export default {
  data() {
    return {
      showItem: true,
      showHideSpinner: true,
      items: [],
    }
  },

  async created() {
  try {
    const response = await axios.get("https://augusts-production.up.railway.app/api/v1/shirts");

    if (response.data && response.data.product) {
      this.items = response.data.product.map(product => ({
        ...product,
        productType: determineProductType(product.name),
      }));
      console.log(this.items);
    } else {
      console.error("The 'posts' array is missing in the response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching shirts information:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
    }
  } finally {
    this.showHideSpinner = false;
  }
}

}
</script>
