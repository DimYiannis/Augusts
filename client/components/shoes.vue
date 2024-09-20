<template>
    <div class="grid grid-rows-2 gap-36 h-64">
        
        <img :src="shoe.image" class="imgitem">
        <div class="buybar">
            <div class="flex gap-1 p-1 ml-1">
                
                <h1 class="btnmodal">{{shoe.name}}</h1>
                <h2 class="btnmodal"> {{shoe.price}}$ </h2>
                
                <!--heart icon-->
                <button class="btnmodal"
                @click="addToFav(shoe)">

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
                @click=addToCart(shoe) 
                >

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
                        <option v-for="size in sizes" :key="size" :value="size.id" class="dropdown">{{ size.id }}</option>
                    </select>
                 </div>


            </div>
        </div>  
    </div>
</template>

<script>
import { useCartStore } from '../stores/cartStore';
import { useModalsStore } from '../stores/modalStore';
    export default {
        data() {
            return {
                showSize: false,
                chosenSize: '',
                sizes: [   
                    {
                        id:'42',
                    },
                    {
                        id:'43',
                    },
                    {
                        id:'44',
                    },
                    {
                        id:'45',
                        
                    },   
                ],
            }
        },
        props: {
            shoe: {
            type: Object,
            required: true
            }
        },
        
        methods: {
            toggleSize() {
                this.showSize = !this.showSize
            },
            addToCart(shoe) {
                shoe.size = this.chosenSize
                console.log('addToCart called with item:', shoe, 'and size:', shoe.size)
                const cartStore = useCartStore();
                cartStore.addToCart(shoe);
            },
            
            addToFav(shoe) {
                shoe.size = this.chosenSize
                const modalStore = useModalsStore();
                modalStore.addToFav(shoe)            
            }
        },

    }
</script>

