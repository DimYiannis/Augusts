<template>
  <div class="invbackdrop" @click.self="closeFav">    
    <div class="fav bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="text-center font-semibold mt-2">
        <h2 class="text-xl font-bold w-full text-center">Favorite Products</h2>
      </div>

      <div class="chosenitems p-4">
        <div class="h-full relative">
          <!-- Centered spinner -->
          <div v-if="isFetchingFav || isRemovingFromFav" 
               class="absolute inset-0 flex items-center justify-center">
            <Spinner class="w-10 h-10 text-gray-600" />
          </div>

          <div v-else-if="favItems.length === 0"
               class="text-center font-semibold text-lg text-gray-600 py-8">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="w-20 h-20 mx-auto mb-4 text-gray-400"
                 viewBox="0 0 24 24">
              <path fill="currentColor" 
              d="M2.39 1.73L1.11 3l2.08 2.08C2.45 6 2 7.19 2 8.5c0 
              3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32c.87-.79 
              1.69-1.53 2.45-2.24L20 22l1.27-1.27m-9.17-2.18l-.1.1l-.11-.1C7.14 14.24 
              4 11.39 4 8.5c0-.76.22-1.44.61-2l9.89 9.87c-.76.69-1.55 1.41-2.4 2.18M8.3 5.1L6.33 3.13C6.7 
              3.05 7.1 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 
              3 22 5.41 22 8.5c0 2.34-1.31 4.42-3.53 6.77l-1.41-1.41C18.91 11.88 20 
              10.2 20 8.5c0-2-1.5-3.5-3.5-3.5c-1.4 0-2.76.83-3.39 2h-2.22c-.51-.94-1.5-1.66-2.59-1.9Z"/>
            </svg>
            You have no favorite items
          </div>

          <div v-else class="space-y-4">
            <div v-for="(item, index) in favItems" :key="index"
                 class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img :src="item.productDetails.image" :alt="item.productDetails.name"
                   class="imgshop">
              <div class="flex-grow">
                <h3 class="font-semibold text-sm mb-1">{{ item.productDetails.name }}</h3>
                <p class="text-sm mb-2">size: {{ item.productDetails.size }}</p>
                <div class="text-red-500 font-semibold text-sm mb-2">price: {{ item.productDetails.price }}$</div>
        
                <div class="flex space-x-2">
                  <button class="btnmodal text-red-500 hover:bg-red-100" @click="removeFromFav(item)"
                          title="Remove from favorites">
                          <svg xmlns="http://www.w3.org/2000/svg" 
                          width="20" height="20" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M7 21q-.825 
                          0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 
                          .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 
                          17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
                          </svg>
                  </button>
                  
                  <button class="btnmodal text-blue-500 hover:bg-blue-100" @click="addToCart(item)"
                          title="Add to cart">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-5 h-5">
                    <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useModalsStore } from '../stores/modalStore';
import { useCartStore } from '../stores/cartStore';

export default {
  setup() {
    const modalStore = useModalsStore();
    const cartStore = useCartStore();

     // Fetch fav items when the component is mounted
     onMounted(async () => {
      try {
        await modalStore.fetchFavItems();
      } catch (error) {
        console.error("Failed to fetch fav items:", error);
      }
    });
    
    // Method to close the favorite modal
    const closeFav = () => {
      modalStore.showFav = false;
    };

    // Method to remove an item from favorites
    const removeFromFav = async (item) => {
      try {
        await modalStore.removeFromFav(item);
      } catch (error) {
        console.error("Failed to remove item from favorites:", error);
      }
    };


    // Method to add an item to the cart
    const addToCart = async (item) => {
      item.size = item.size || '';  // Ensure item has size
      try {
        await cartStore.addToCart(item);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    };

    return {
      favItems: modalStore.favItems,
      closeFav,
      removeFromFav,
      addToCart,
      isFetchingFav: computed(() => modalStore.isFetchingFav),
      isRemovingFromFav: computed(() => modalStore.isRemovingFromFav),
      addToFav: modalStore.addToFav,
    };
  },
};
</script>

<style scoped>
.invbackdrop {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.fav {
  @apply w-max max-w-[22rem] max-h-[80vh] flex flex-col;
}

.chosenitems {
  @apply flex-grow overflow-y-auto;
}

.btnmodal {
  @apply p-1.5 rounded-full transition-colors duration-200;
}

.imgshop {
  @apply w-16 h-16 object-cover rounded-md;
}
</style>


