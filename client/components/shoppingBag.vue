<template>
    <div class="invbackdrop" @click.self="closeCart">    
        <div class="shoppings" @mouseenter="showlog" >
           
            <!--the item-->
            <div class="chosenitems">
              <div class="text-center font-semibold">
                <h2>Shopping Cart</h2>
              </div>

               <!-- Loader while fetching items -->
              <div v-if="isFetchingCart || isRemovingFromCart" class="flex justify-center mt-10">
                <Spinner />
              </div>

              <div v-else>
                <div class="h-full mt-4">
                  <div v-if="cartItems.length === 0"
                    class="text-center font-semibold text-xl 
                    place-self-top mt-7 grid">
                    Your cart is empty
                  <div class="place-self-center mt-14">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="100px" height="100px" 
                    viewBox="0 0 24 24">
                    <path fill="currentColor" 
                    d="m15.825 13l-2-2h1.725l2.75-5H8.825l-2-2H19.95q.575 
                    0 .888.488t.012 1.062l-3.55 6.4q-.275.5-.713.775t-.762.275ZM7 
                    22q-.825 0-1.413-.588T5 20q0-.825.588-1.413T7 18q.825 
                    0 1.413.588T9 20q0 .825-.588 1.413T7 22Zm13.5 1.3L14.15 
                    17H7.6q-1.1 0-1.675-.938T5.85 14.1l1.05-2.15L5.1 7.9L.7 
                    3.5l1.4-1.4l19.8 19.8l-1.4 1.4ZM12.15 15l-2-2H8.6l-1 
                    2h4.55Zm3.4-4h-1.725h1.725ZM17 22q-.825 0-1.413-.588T15 
                    20q0-.825.588-1.413T17 18q.825 0 1.413.588T19 20q0 .825-.588 
                    1.413T17 22Z"/>
                    </svg>
                  </div>
                  
                </div>
                <div v-else>
                  <div class="flex gap-8" v-for="(item, index) in cartItems" :key="index">
                    <img :src="item.productDetails.image" :alt="item.productDetails.name"
                    class="imgshop">
                    <div class="w-max space-y-1">
                      <h3 class="font-bold">{{ item.productDetails.name }}</h3>
                      <div class="flex gap-1"> 
                        <p class="font-semibold">size:</p> 
                        <p>{{ item.size }}</p>
                      </div>
                      <div class="text-red-500 font-bold text-lg">price: {{ item.productDetails.price }}$</div>
            
                    <div class="flex gap-1">
                      <button class="btnmodal" >
                        <div v-if="item.quantity==1" 
                        @click="removeCartItem(item._id)"
                        :disabled="isRemovingFromCart">
                          <svg xmlns="http://www.w3.org/2000/svg" 
                          width="20" height="20" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M7 21q-.825 
                          0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 
                          .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 
                          17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
                          </svg>
                        </div>
                        <div v-else @click="decrementCart(item._id)">
                          <svg xmlns="http://www.w3.org/2000/svg" 
                          width="20" height="20" viewBox="0 0 24 24">
                          <path fill="currentColor" 
                          d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"/>
                          </svg>
                        </div>
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button  class="btnmodal" @click="patchCart(item._id)">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 19q-.425 0-.713-.288T11 
                        18v-5H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 
                        11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 
                        6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 
                        13h-5v5q0 .425-.288.713T12 19Z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

            <!--the cost-->
            <div class=" costs">
              <div class="total-items">Total Items: {{ totalItems }}</div>
              <div class="total-price">Total Price: {{ totalPrice }}$</div>

              <button @click="order"
               class="costbtn" :disabled="isOrdering">
                Order
              </button>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '../stores/myStore';
import { useModalsStore } from '../stores/myStore';


export default {
  setup() {
    const cartStore = useCartStore();
    const modalStore = useModalsStore();

    // Using computed to get reactive values from store
    const totalItems = computed(() => cartStore.totalItems);
    const totalPrice = computed(() => cartStore.totalPrice);
    const cartItems = computed(() => cartStore.cartItems);

    const closeCart = () => {
      modalStore.showCart = false;
    };

    const removeCartItem = async (itemId) => {
      try {
        console.log('Removing item:', itemId);
        // Call the removeCartItem method from the store
        await cartStore.removeCartItem(itemId);
        console.log('Item removed, fetching updated cart items');
        // Fetch the updated cart items
        await cartStore.fetchCartItems();
        console.log('Cart items fetched');
      } catch (error) {
        console.error('Failed to delete item', error);
      } finally {
        // Close the cart after removing the item
        closeCart();
    console.log('Cart closed');
  }
};

    return {
      totalItems,
      totalPrice,
      cartItems: cartStore.cartItems,
      isOrdering: computed(() => cartStore.isOrdering),
      isFetchingCart: computed(() => cartStore.isFetchingCart),
      isRemovingFromCart: computed(() => cartStore.isRemovingFromCart),
      order: cartStore.order,
      addToCart: cartStore.addToCart,
      patchCart: cartStore.patchCart,
      decrementCart: cartStore.decrementCart, 
      removeCartItem, // Return removeCartItem so it can be used in the template
      closeCart, // Return closeCart so it can be used in the template if needed
    };
  },
};
</script>