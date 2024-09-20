<template>
   
     <!--entry Section Start-->
   <section id="entry" class="section">
        <img src="../assets/nonchal2.jpg" class="section_img">
        
        <NuxtLink to="/Apparel" class="details">
            Exclusive Apparel
        </NuxtLink>

    </section>
    <!--entry Section End-->

    <!--sweats Section Start-->
    <section id="sweats" class="section">
        <img src="../assets/gen6.jpg" alt="sweats Image" class="section_img">
    
        <NuxtLink to="/sweats" class="object-center text-xl animate-bounce 
        hover:text-2xl underline cursor-pointer absolute 
        top-[90%] left-[40%] laptop:left-[47%] text-white"
        >
        Sweats
        </NuxtLink>
    </section>
    <!--sweats Section End-->
    
 <!--shirts Section Start-->
    <section id="shirts" class="section">
        <img src="../assets/gen1.jpg" alt="shirts Image" class=" section_img ">

        <NuxtLink to="/shirts" class="details" >
            Shirts
        </NuxtLink>
    </section>
    <!--shirts Section End-->

    <!--bottoms Section Start-->
    <section id="pants" class="section">
        <img src="../assets/klaudia-piaskowska-Zy6oNZRdcjc-unsplash.jpg" alt="bottoms Image" class="section_img">

        <NuxtLink to="/bottoms" class="details">
         Bottoms
        </NuxtLink>
        
        

    </section>
    <!--bottoms Section End-->
</template>

<script>
import { useUserStore } from '../stores/userStore';

export default {
    data() {
        return {   
        }
    },
    methods: {
    },
        
        
}
</script>