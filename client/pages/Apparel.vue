<template>
  <div class="bg-white w-full h-full grid 
    justify-items-stretch ">
    <div class="w-screen my-20 ">
      <div class="text-center text-xl">Style Yourself: Elevate Your Look with Our Trendy Apparel Collection</div>
      <div class="items">
        <Jacket v-for="jacket in items.jackets" :jacket="jacket" 
          :key="jacket.id" 
          @add-to-cart="addToCart"
          @add-to-fav="addToFav">
        </Jacket>

        <Accessories v-for="accessory in items.accessories" 
        :accessory="accessory" 
        :key="accessory.id"
        @add-to-cart="addToCart"
        @add-to-fav="addToFav">
        </Accessories>

        <Shoes v-for="shoe in items.shoes"
        :shoe="shoe" 
        :key="shoe.id"  
        @add-to-cart="addToCart"           
        @add-to-fav="addToFav" >          
        </Shoes>
    
      </div> 
      
    </div>
  </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        items: {
          jackets: [
          {
            id: 'Bronze Jacket',
            name: 'Bronze Jacket',
            price: 60,
            description: 'This is item 1',
            image: "https://images.unsplash.com/photo-1626307416562-ee839676f5fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
            quantity: 0
          },
          {
            id: 'Red Jacket',
            name: 'Red Jacket',
            price: 60,
            description: 'This is item 2',
            image: 'https://images.unsplash.com/photo-1608113562252-b320e7628e17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
            quantity: 0
          },
          ],
          accessories: [
          {
            id: 'White Cap',
            name: 'White Cap',
            price: 10,
            description: 'This is item 3',
            image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
            quantity: 0
          },
          {
            id: 'Grey Beanie',
            name: 'Grey Beanie',
            price: 10,
            description: 'This is item 3',
            image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
            quantity: 0
          },
          {
            id: 'Wooden Bracelet',
            name: 'Wooden Bracelet',
            price: 7,
            description: 'This is item 3',
            image: 'https://images.unsplash.com/photo-1632670549453-7a3dfac254a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            quantity: 0
          }
          ],
          shoes: [
          {
            id: 'Brown Boots',
            name: 'Brown Boots',
            price: 60,
            image: 'https://images.unsplash.com/photo-1542838776-096d877b5aa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            quantity: 0,
            size: null
          },
          {
            id: 'Black Boots',
            name: 'Black Boots',
            price: 70,
            image: "https://images.unsplash.com/photo-1581803274516-209c2e3c1472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            quantity: 0,
            size: null
          },
          ]
        }
      }
    },
    methods: {

      addToCart(item) {
        console.log('addToCart called with item:', item)
        this.$emit('add-to-cart', item);
        this.$emit('total-items');
        
      },
      addToFav(item) {
        this.$emit('add-to-fav', item);
      },
      
  }
}
  </script>