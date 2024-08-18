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
          @add-to-cart="addToCart"
          @add-to-fav="addToFav"
        >
        </Jacket>

        <Accessories
          v-for="accessory in accessories"
          :accessory="accessory"
          :key="accessory.id"
          @add-to-cart="addToCart"
          @add-to-fav="addToFav"
        >
        </Accessories>

        <Shoes
          v-for="shoe in shoes"
          :shoe="shoe"
          :key="shoe.id"
          @add-to-cart="addToCart"
          @add-to-fav="addToFav"
        >
        </Shoes>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showHideSpinner: true,
      jackets: [],
      accessories: [],
      shoes: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/apparel");

      this.items = response.data;
      console.log(this.items.jackets);

      (this.jackets = this.items.jackets),
        (this.accessories = this.items.accessories),
        (this.shoes = this.items.shoes)
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
  methods: {
    addToCart(item) {
      console.log("addToCart called with item:", item);
      this.$emit("add-to-cart", item);
      this.$emit("total-items");
    },
    addToFav(item) {
      this.$emit("add-to-fav", item);
    },
  },
};
</script>
