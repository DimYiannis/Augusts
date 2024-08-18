<template>
     <div class="invbackdrop" @click.self="closeTip"> 
        <div class="w-fit h-fit 
            rounded-md relative bg-[#363636] 
            z-10 justify-self-end top-14 right-10">
            
            <p class="text-white rounded-lg p-3 px-5">
            Your shopping cart is empty !
            </p>
        </div> 
        
    </div>
</template>

<script>
import { useModalsStore } from '../stores/myStore';
export default {

    methods: {
        closeTip() {
            const modalStore = useModalsStore(); 
            modalStore.showTooltip=false;
        },
    }
}
</script>