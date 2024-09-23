<template>
    <div class="invbackdrop" @click.self="closeSignup">

        <div class="place-self-center flex flex-col tablet:mx-5
        tablet:flex-row  tablet:mt-5 tablet:w-fit laptop:w-[900px] h-screen w-screen
        tablet:h-fit bg-white rounded-md overflow-y-scroll 
        tablet:overflow-y-hidden overscroll-none border-2 
        border-[#363636]" >

            

            <div class="grid w-fit h-fit bg-[#363636] gap-0 rounded-md">
                
                <div class="flex justify-end p-3 h-10 tablet:invisible">
                    <button class="flex w-fit rounded-3xl p-2" 
                    @click="closeSignup">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="#363636" 
                        viewBox="0 0 24 24" 
                        stroke-width="2.5" stroke="white" 
                        class="w-6 h-6 hover:stroke-red-600 
                        place-self-center">
                        <path stroke-linecap="round" 
                        troke-linejoin="round" 
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <div class="text-white font-italic text-center
                font-semibold text-xl place-self-center mobile:mx-10">
                    <h1>Join August's community and discover a new way to express yourself through fashion!</h1>
                </div>

                <div class="place-self-center">
                    <img src="https://user-images.githubusercontent.com/107484245/230095354-01ec829e-9739-4378-b59c-93aa74405911.gif"
                    class="w-[400px] my-10" />
                </div>

                <div class="text-white place-self-center 
                w-fit font-semibold mb-10 ml-2 grid gap-2">

                    <div class="flex gap-5 items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="15" height="15" 
                        viewBox="0 0 512 512">
                        <path fill="currentColor" 
                        d="M243.8 339.8c-10.9 10.9-28.7 
                        10.9-39.6 0l-64-64c-10.9-10.9-10.9-28.7
                        0-39.6c10.9-10.9 28.7-10.9 39.6 0l44.2
                        44.2l108.2-108.2c10.9-10.9 28.7-10.9 
                        39.6 0c10.9 10.9 10.9 28.7 0 39.6l-128 
                        128zM512 256c0 141.4-114.6 256-256 256S0 
                        397.4 0 256S114.6 0 256 0s256 114.6 256 
                        256zM256 48C141.1 48 48 141.1 48 256s93.1 
                        208 208 208s208-93.1 208-208S370.9 48 256 
                        48z"/>
                        </svg>
                        Sustainable style with recycled materials
                    </div>
                    <div class="flex gap-5 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="15" height="15" 
                        viewBox="0 0 512 512">
                        <path fill="currentColor" 
                        d="M243.8 339.8c-10.9 10.9-28.7 
                        10.9-39.6 0l-64-64c-10.9-10.9-10.9-28.7
                        0-39.6c10.9-10.9 28.7-10.9 39.6 0l44.2
                        44.2l108.2-108.2c10.9-10.9 28.7-10.9 
                        39.6 0c10.9 10.9 10.9 28.7 0 39.6l-128 
                        128zM512 256c0 141.4-114.6 256-256 256S0 
                        397.4 0 256S114.6 0 256 0s256 114.6 256 
                        256zM256 48C141.1 48 48 141.1 48 256s93.1 
                        208 208 208s208-93.1 208-208S370.9 48 256 
                        48z"/>
                        </svg>
                        Exclusive designs for a unique shopping experience.
                    </div>
                    <div class="flex gap-5 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="15" height="15" 
                        viewBox="0 0 512 512">
                        <path fill="currentColor" 
                        d="M243.8 339.8c-10.9 10.9-28.7 
                        10.9-39.6 0l-64-64c-10.9-10.9-10.9-28.7
                        0-39.6c10.9-10.9 28.7-10.9 39.6 0l44.2
                        44.2l108.2-108.2c10.9-10.9 28.7-10.9 
                        39.6 0c10.9 10.9 10.9 28.7 0 39.6l-128 
                        128zM512 256c0 141.4-114.6 256-256 256S0 
                        397.4 0 256S114.6 0 256 0s256 114.6 256 
                        256zM256 48C141.1 48 48 141.1 48 256s93.1 
                        208 208 208s208-93.1 208-208S370.9 48 256 
                        48z"/>
                        </svg>
                        Regular discounts on all apparel                      
                    </div>
                </div>

            </div>
            <div class="">

                <div class="flex justify-end p-3 h-10 invisible tablet:visible">
                    <button class="flex w-fit rounded-3xl p-2" 
                        @click="closeSignup">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="white" 
                        viewBox="0 0 24 24" 
                        stroke-width="2" stroke="black" 
                        class="w-6 h-6 hover:stroke-red-600 
                        place-self-center">
                        <path stroke-linecap="round" 
                        troke-linejoin="round" 
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <TheForm @toggle-login="ToggleLogin"
                @logged-in="loggedin"/>

            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { useModalsStore } from '../stores/modalStore';

const userStore = useUserStore();
const modalStore = useModalsStore();

const closeSignup = () => {
  modalStore.showSignUp = false;
};

const toggleLogin = () => {
  modalStore.toggleLogin();
};

const loggedin = () => {
  // Implement your login logic here
  console.log('User logged in');
};
</script>

