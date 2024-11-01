<template>
  <!-- loading state -->
  <LoadSpinner v-if="showHideSpinner" />

  <div class="bg-white w-full h-full grid justify-items-stretch">
    <div class="w-screen my-20">
      <div class="text-center text-xl">
        Style Yourself: Elevate Your Look with Our Trendy Apparel Collection
      </div>
      <div class="items">
        <Jacket
          v-for="jacket in jackets"
          :jacket="jacket"
          :key="jacket.id"
        >
        </Jacket>

        <Accessories
          v-for="accessory in accessories"
          :accessory="accessory"
          :key="accessory.id"
        >
        </Accessories>

        <Shoes
          v-for="shoe in shoes"
          :shoe="shoe"
          :key="shoe.id"
        >
        </Shoes>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cartStore';
import { useModalsStore } from '../stores/modalStore';
import { determineProductType } from '../stores/productTypeMapping'; // Import the mapping


export default {
  data() {
    return {
      showHideSpinner: true,
      items: [],
      jackets: [],
      accessories: [],
      shoes: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("https://augusts-production.up.railway.app/api/v1/apparel");

      if (response.data && response.data.jackets && response.data.accessories && response.data.shoes) {
        this.jackets = response.data.jackets.map(product => ({
          ...product,
          productType: 'Jackets'
        }));
        this.accessories = response.data.accessories.map(product => ({
          ...product,
          productType: 'Accessories'
        }));
        this.shoes = response.data.shoes.map(product => ({
          ...product,
          productType: 'Shoes'
        }));

        console.log("Jackets:", this.jackets);
        console.log("Accessories:", this.accessories);
        console.log("Shoes:", this.shoes);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.log("Response headers:", error.response.headers);
      }
    } finally {
      this.showHideSpinner = false;
    }
  },
};
</script>
