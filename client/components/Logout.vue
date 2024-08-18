<template>
    <div class="invbackdrop" @click.self="closeLogout">

        <div class="place-self-center flex flex-col tablet:mx-5
        tablet:flex-row  tablet:mt-5 tablet:w-fit laptop:w-fit h-screen w-screen
        tablet:h-fit bg-white rounded-md overflow-y-scroll 
        tablet:overflow-y-hidden overscroll-none border-2 
        border-[#363636]" >

            

            <div class="grid w-fit h-fit bg-[#363636] gap-0 rounded-md">
                
                <div class="flex justify-end p-3 h-10">
                    <button class="flex w-fit rounded-3xl p-2" 
                    @click="closeLogout">
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

                <div class="flex text-white font-italic text-center
                font-semibold text-xl place-self-center mobile:mx-10">
                    <div class="m-3">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="32" height="32" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" 
                        stroke-linecap="round" stroke-linejoin="round" 
                        stroke-width="1.5" 
                        d="m20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
                        </svg>
                        <p>Vouchers</p>
                    </div>
                    <div class="m-3">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="32" height="32" viewBox="0 0 20 20">
                            <g fill="currentColor">
                                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"/>
                                <path d="m19 8.839l-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"/>
                            </g>
                        </svg>
                        <p>Newsletter</p>
                    </div>
                    <div class="m-3">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="32" height="32" viewBox="0 0 24 24">
                            <g fill="currentColor">
                                <path d="M11.25 3v4.046a3 3 0 0 0-4.277 4.204H1.5v-6A2.25 2.25 0 0 1 3.75 3h7.5Zm1.5 0v4.011a3 3 0 0 1 4.239 4.239H22.5v-6A2.25 2.25 0 0 0 20.25 3h-7.5Zm9.75 9.75h-8.983a4.125 4.125 0 0 0 4.108 3.75a.75.75 0 0 1 0 1.5a5.623 5.623 0 0 1-4.875-2.817V21h7.5a2.25 2.25 0 0 0 2.25-2.25v-6ZM11.25 21v-5.817A5.623 5.623 0 0 1 6.375 18a.75.75 0 0 1 0-1.5a4.126 4.126 0 0 0 4.108-3.75H1.5v6A2.25 2.25 0 0 0 3.75 21h7.5Z"/>
                                <path d="M11.086 10.354c.03.297.037.575.035.805a7.484 7.484 0 0 1-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 0 1 2.122-2.12c.517.517.759 1.36.842 2.194Zm1.791 0c-.03.297-.038.575-.036.805c.23.002.508-.006.805-.036c.833-.084 1.677-.325 2.195-.843a1.5 1.5 0 0 0-2.121-2.12c-.518.518-.76 1.362-.843 2.194Z"/>
                            </g>
                        </svg>
                        <p>Orders</p>
                    </div>
                    <div class="m-3">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="32" height="32" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0a1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789a6.721 6.721 0 0 1-3.168-.789a3.376 3.376 0 0 1 6.338 0Z"/></svg>
                        <p>Contact Information</p>
                    </div>
                    <div class="m-3">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6.99 15c-.7 0-1.26-.56-1.26-1.26c0-.71.56-1.25 1.26-1.25c.71 0 1.25.54 1.25 1.25c-.01.69-.54 1.26-1.25 1.26m3.01-7.4c-.76 1.11-1.48 1.46-1.87 2.17c-.16.29-.22.48-.22 1.41h-1.82c0-.49-.08-1.29.31-1.98c.49-.87 1.42-1.39 1.96-2.16c.57-.81.25-2.33-1.37-2.33c-1.06 0-1.58.8-1.8 1.48l-1.65-.7C9.01 7.15 10.22 6 11.99 6c1.48 0 2.49.67 3.01 1.52c.44.72.7 2.07.02 3.08"/></svg>
                        <p>Help</p>
                    </div>
                
                </div>
                <button @click=logout
                        class="flex m-3 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="32" height="32" viewBox="0 0 20 20">
                        <g fill="white" fill-rule="evenodd" 
                            clip-rule="evenodd"><path 
                            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75z"/><path d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10"/>
                        </g>
                        </svg>
                        log out
                    </button>

            </div>
            
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useModalsStore } from '../stores/myStore';
import { useUserStore } from '../stores/myStore';

export default {
    data() {
        return {
          
        }
    },
    methods: {
        async logout() {
            const userStore = useUserStore();
      try {
        const response = 
        await axios.get("http://localhost:5000/api/v1/auth/logout", {
          withCredentials: true,
        })
          
        console.log(response);

        userStore.logout();
        this.closeLogout();

        this.$router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    },
        closeLogout() {
            const modalStore = useModalsStore();
            modalStore.toggleLogout();
        },
        ToggleLogin() {
            const modalStore = useModalsStore();
            modalStore.toggleLogin();
        },
    }, 
    
}


</script>

