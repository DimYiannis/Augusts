<template>
  <!-- loading state -->
  <LoadSpinner v-if="showHideSpinner" />

  <div class="bg-white w-full h-full grid justify-items-stretch">
    <div class="w-screen my-20">
      <div class="text-center text-xl">
        Get the Perfect Fit with Our Denim Jeans Collection
      </div>

      <div class="items">
        <item
          v-for="item in items"
          :item="item"
          :key="item.id"
          @add-to-cart="addToCart"
          @add-to-fav="addToFav"
        >
        </item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showItem: true,
      showHideSpinner: true,
      items: [],
    };
  },

  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/bottoms");

      this.items = response.data.product;
      console.log(this.items);
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
    closeBottoms() {
      this.$emit("close");
    },
    addToCart(item) {
      console.log("addToCart called with item:", item);
      this.$emit("add-to-cart", item);
    },
    addToFav(item) {
      this.$emit("add-to-fav", item);
    },
  },
};
</script>
