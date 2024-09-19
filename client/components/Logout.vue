<template>
  <div class="invbackdrop" @click.self="closeLogout">
    <div class="logout-panel" ref="panel" :style="{ top: position.y + 'px', left: position.x + 'px' }">    
      <div class="logout-content">
        <div class="logout-header" @mousedown="startDrag" @mouseup="stopDrag" @mousemove="drag">
          <h2 class="welcome-text">
            <span class="greeting animate-fade-in-up">{{ greeting }},</span>
            <span class="user-name animate-fade-in-up animate-delay-300">{{ userStore.user.name || 'Guest' }}!</span>
          </h2>
          <button class="close-button" @click="closeLogout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <div class="logout-options">
          <button class="option-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
            </svg>
            <p class="option-text">Vouchers</p>
          </button>
          <button class="option-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
              <g fill="none" stroke="currentColor">
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"/>
                <path d="m19 8.839l-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"/>
              </g>
            </svg>
            <p class="option-text">Newsletter</p>
          </button>
          <button class="option-button" @click="showOrders">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor">
                <path d="M11.25 3v4.046a3 3 0 0 0-4.277 4.204H1.5v-6A2.25 2.25 0 0 1 3.75 3h7.5Zm1.5 0v4.011a3 3 0 0 1 4.239 4.239H22.5v-6A2.25 2.25 0 0 0 20.25 3h-7.5Zm9.75 9.75h-8.983a4.125 4.125 0 0 0 4.108 3.75a.75.75 0 0 1 0 1.5a5.623 5.623 0 0 1-4.875-2.817V21h7.5a2.25 2.25 0 0 0 2.25-2.25v-6ZM11.25 21v-5.817A5.623 5.623 0 0 1 6.375 18a.75.75 0 0 1 0-1.5a4.126 4.126 0 0 0 4.108-3.75H1.5v6A2.25 2.25 0 0 0 3.75 21h7.5Z"/>
                <path d="M11.086 10.354c.03.297.037.575.035.805a7.484 7.484 0 0 1-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 0 1 2.122-2.12c.517.517.759 1.36.842 2.194Zm1.791 0c-.03.297-.038.575-.036.805c.23.002.508-.006.805-.036c.833-.084 1.677-.325 2.195-.843a1.5 1.5 0 0 0-2.121-2.12c-.518.518-.76 1.362-.843 2.194Z"/>
              </g>
            </svg>
            <p class="option-text">Orders</p>
          </button>
          <button class="option-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0a1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789a6.721 6.721 0 0 1-3.168-.789a3.376 3.376 0 0 1 6.338 0Z"/>
            </svg>
            <p class="option-text">Contact Information</p>
          </button>
          <button class="option-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6.99 15c-.7 0-1.26-.56-1.26-1.26c0-.71.56-1.25 1.26-1.25c.71 0 1.25.54 1.25 1.25c-.01.69-.54 1.26-1.25 1.26m3.01-7.4c-.76 1.11-1.48 1.46-1.87 2.17c-.16.29-.22.48-.22 1.41h-1.82c0-.49-.08-1.29.31-1.98c.49-.87 1.42-1.39 1.96-2.16c.57-.81.25-2.33-1.37-2.33c-1.06 0-1.58.8-1.8 1.48l-1.65-.7C9.01 7.15 10.22 6 11.99 6c1.48 0 2.49.67 3.01 1.52c.44.72.7 2.07.02 3.08"/>
            </svg>
            <p class="option-text">Help</p>
          </button>
        </div>

        <button @click="logout" class="logout-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
            <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              <path d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75z"/>
              <path d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10"/>
            </g>
          </svg>
          Log out
        </button>
      </div>
    </div>
  </div>
  
  <OrderPage v-if="isOrderPageVisible" @close="closeOrderPage" />
</template>

<script>
import axios from "axios";
import { useModalsStore } from '../stores/myStore';
import { useUserStore } from '../stores/myStore';
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, computed } from 'vue';
import OrderPage from './OrderPage.vue';

export default {
  components: {
    OrderPage,
  },
  setup() {
    const userStore = useUserStore();
    const modalStore = useModalsStore();
    const router = useRouter();
    const panel = ref(null);
    const isDragging = ref(false);
    const position = reactive({ x: 0, y: 0 });
    const offset = reactive({ x: 0, y: 0 });
    const isOrderPageVisible = ref(false);

    const logout = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/logout", {
          withCredentials: true,
        });
        console.log(response);

        userStore.logout();
        closeLogout();
        router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const closeLogout = () => {
      modalStore.toggleLogout();
    };

    const startDrag = (event) => {
      isDragging.value = true;
      offset.x = event.clientX - position.x;
      offset.y = event.clientY - position.y;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    };

    const drag = (event) => {
      if (isDragging.value) {
        position.x = event.clientX - offset.x;
        position.y = event.clientY - offset.y;
      }
    };

    const stopDrag = () => {
      isDragging.value = false;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    };

    const showOrders = () => {
      isOrderPageVisible.value = true;
    };

    const closeOrderPage = () => {
      isOrderPageVisible.value = false;
    };

    const greeting = computed(() => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 18) return "Good afternoon";
      return "Good evening";
    });

    onMounted(() => {
      if (panel.value) {
        const rect = panel.value.getBoundingClientRect();
        position.x = (window.innerWidth - rect.width) / 2;
        position.y = (window.innerHeight - rect.height) / 2;
      }
    });

    return {
      userStore,
      logout,
      closeLogout,
      panel,
      position,
      startDrag,
      drag,
      stopDrag,
      isOrderPageVisible,
      showOrders,
      closeOrderPage,
      greeting,
    };
  }
}
</script>

<style scoped>
.logout-panel {
  @apply bg-white text-black shadow-lg rounded-lg overflow-hidden;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.animate-delay-300 {
  animation-delay: 300ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

