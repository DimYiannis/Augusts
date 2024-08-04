<template>
    <div class="bg-white w-full h-full grid 
    justify-items-stretch ">
    <div class="w-screen my-20 ">
      <div class="text-center text-xl">
        Get Your Perfect Fit: Shop Our Stylish T-Shirts Collection      
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
  data() {
    return {
      showItem: true,
      cartItems: [],
      items: [
          {
            id: 'force majeure loose',
            name: 'force majeure loose',
            price: 10,
            image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
          {
            id: 'force majeure',
            name: 'force majeure t-shirt',
            price: 10,
            image: 'https://images.unsplash.com/photo-1508160703418-fde5a61fdf38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
          {
            id: 'Black t-shirt',
            name: 'Black T-shirt',
            price:10,
            image: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          },
          {
            id: 'white shirt with stamp',
            name: 'F white t-shirt',
            price: 10,
            image: 'https://images.unsplash.com/photo-1513188447171-ecf00455f051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80',
          },
          {
            id: 'black t-shirt with stamp',
            name: 'Black t-shirt loose fit',
            price: 10,
            image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
          {
            id: 'hotel',
            name: 'Hotel White ',
            price: 10,
            image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
          },
          {
            id: 'red ',
            name: 'Red t-shirt',
            price: 10,
            image: "https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=604&q=80",
          },
        ],
    }
  },


  methods: {
    closeShirts() {
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