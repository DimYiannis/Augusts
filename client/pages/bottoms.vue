<template>
  <div class="bg-white w-full h-full grid 
    justify-items-stretch ">
    <div class="w-screen my-20 ">
      <div class="text-center text-xl">
        Get the Perfect Fit with Our Denim Jeans Collection     
      </div>

      <div class="items">
        <item v-for="item in items" :item="item" 
          :key="item.id" 
          @add-to-cart="addToCart"           
          @add-to-fav="addToFav">
        </item>
      </div>   
    </div>
  </div>
</template>
    
    <script>
export default {
  name: 'bottoms',
    data() {
      return {
        showItem: true,
        items: [
          {
            id: 'loose jean',
            name: 'Loose Jean',
            price: 20,
            image: 'https://images.unsplash.com/photo-1636016954413-44070ee44f8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
          },
          {
            id: 'tight jean',
            name: 'Tight Jean',
            price: 20,
            image: 'https://images.unsplash.com/photo-1599030337145-5bec28bee393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
          },
          {
            id: 'grey ripped ',
            name: 'Ripped Jean',
            price:20,
            image: "https://images.unsplash.com/photo-1602479503323-4b7e5068a883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=841&q=80",
          },
          {
            id: 'ecru straight',
            name: 'Ecru Straight Jean',
            price: 20,
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
          },
          {
            id: 'black jean',
            name: 'Black Straight Jean',
            price: 20,
            image: 'https://images.unsplash.com/photo-1584864783592-f1d6d4fcd1d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
          },
          {
            id: 'ripped jean',
            name: 'Straight Ripped Jean',
            price: 20,
            image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
          },
          {
            id: 'black ripped',
            name: 'Black Ripped Jean',
            price: 20,
            image: "https://images.unsplash.com/photo-1623629225725-23a723fd5bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          },
        ],
      }
    },
    methods: {
    closeBottoms() {
      this.$emit('close')
    },
    addToCart(item) {
      console.log('addToCart called with item:', item)
      this.$emit('add-to-cart', item);
      
    },
    addToFav(item) {
      this.$emit('add-to-fav', item);
    },
  }
}
</script>