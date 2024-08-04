<template>
  <div class="bg-white w-full h-full grid 
    justify-items-stretch ">
    <div class="w-screen my-20 ">
      <div class="text-center text-xl">
        Get Cozy and Comfortable with Our Collection of Stylish Sweats      
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
import item from '../components/item.vue';
 
  export default {
    components: {
      item,
    },
        data() {
          return {
            showItem: true,
            items: [
          {
            id: 'ecru-hoodie',
            name: 'Ecru Hoodie',
            price: 20,
            image: 'https://images.unsplash.com/photo-1565971987782-9fbc5f314329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            size: null,
          },
          {
            id: 'black-sweater',
            name: 'Black Sweater',
            price: 15,
            image: 'https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80',
            size: null,
          },
          {
            id: 'stamp-ecru-hoodie',
            name: 'Stamp Ecru Hoodie',
            price: 20,
            image: "https://images.unsplash.com/photo-1508853363419-a9263d752c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            size: null,
          },
          {
            id: 'blue-hoodie',
            name: 'Blue Hoodie',
            price: 20,
            image: 'https://images.unsplash.com/photo-1542053254535-def95e944232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            size: null,
          },
          {
            id: 'red-sweater',
            name: 'Red Sweater',
            price: 15,
            image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            size: null,
          },
          {
            id: 'white-hoodie',
            name: 'White Hoodie',
            price: 20,
            image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
            size: null,
          },
          {
            id: 'white-sweater',
            name: 'White Sweater',
            price: 15,
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
            size: null,
          },
          {
            id: 'stamp white hoodie',
            name: 'White Hoodie with stamp',
            price: 25,
            image: "https://images.unsplash.com/photo-1601155866707-30829d8384d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
            size: null,
          },
        ],
          }
        },
      
    
        methods: {
        closeSweats() {
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