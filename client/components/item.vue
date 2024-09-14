<template>
    <div class="grid grid-rows-2 gap-36 h-64">
        
       <img :src="item.image" class="imgitem">

    
        <div class="buybar">
            <div class="flex gap-1 p-1 ml-1">
                 
              <h1 class="btnmodal">{{item.name}}</h1>
              <h2 class="btnmodal"> {{item.price}}$ </h2>
                
                <!--heart icon-->
                <button class="btnmodal"
                @click="addToFav(item)">

                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="btnmodalsvg hover:fill-red-600">

                    <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />

                    </svg>
                </button>

                    <!--shooping bag icon-->
                <button class="btnmodal"
                @click="addToCart(item)">

                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" stroke-width="1.5" 
                    stroke="currentColor" 
                    class="btnmodalsvg hover:fill-slate-400">
                    <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>

                </button>

                <div>
                    <select v-model="chosenSize" class="show">
                      <option disabled value="">Please select size</option>
                      <option v-for="size in sizes" :key="size" 
                      :value="size.id" class="dropdown">{{ size.id }}
                    </option>
                    </select>
                 </div>

            </div>
        </div>  
    </div>
</template>

<script>
import { useCartStore } from '../stores/myStore';
import { useModalsStore } from '../stores/myStore';

export default {
  data() {
    return {
    chosenSize: '',
    sizes: [   
        {
          id:'S',
        },
        {
          id:'M',
        },
        {
          id:'L',           
        },
        {
          id:'XL',                
        }, 
        {
          id:'XXL',                        
        },    
      ],
    }
  },
props: {
  item: {
    type: Object,
    required: true
  }
},
methods: {
  async addToCart(item) {
    if (!this.chosenSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    item.size = this.chosenSize;

    const cartStore = useCartStore();

    try {
      // Await the addToCart action
      await cartStore.addToCart(item);

      // Fetch updated cart items after successfully adding to the cart
      await cartStore.fetchCartItems();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },
  addToFav(item) {
    item.size = this.chosenSize
    const modalStore = useModalsStore();
    modalStore.addToFav(item)
  }
}
};
</script>

