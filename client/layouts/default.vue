<!--bar with restricted access - no fav or shopping cart-->
<template>
  <!-- loading state
  <LoadSpinner v-if="showHideSpinner" /> -->

  <header class="navbar">
    <div class="flex-1 basis-2/3 text-4xl text-black">
      <NuxtLink to="/">August's</NuxtLink>
    </div>

    <!--Sign Up-->
    <button v-if="!userStore.isLoggedIn" @click="toggleSignUp" class="headerbtn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
        class="headersvg"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          stroke-miterlimit="10"
          stroke-width="32"
          d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304Z"
        />
      </svg>
    </button>

    <!--User tab-->
    <button v-if="userStore.isLoggedIn" @click="toggleLogout" class="headerbtn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
        class="headersvg"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          stroke-miterlimit="10"
          stroke-width="32"
          d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304Z"
        />
      </svg>
    </button>

    <!--favorites-->
    <button
      v-if="userStore.isLoggedIn"
      @mouseenter="showFavtip = true"
      @mouseleave="showFavtip = false"
      class="headerbtn"
      @click="toggleFav"
     :disabled="modalStore.isAddingToFav"
    >
      <h1 v-if="showFavtip" class="tooltip">Favorites</h1>

      <h1 v-else class="tooltip">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="headersvg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      </h1>
    </button>

    <!--bag-->
    <!--i placed the mouseenter = false 
        so that the bars wont get confused-->
    <div
      v-if="userStore.isLoggedIn"
      @mouseenter="showBar = false"
      @mouseover="showBagtip = true"
      @mouseleave="showBagtip = false"
      class="shoppingbag"
    >
      <button class="headerbtn" 
      @click="toggleCart" 
      :disabled="cartStore.isAddingToCart || cartStore.isFetchingCart">
        <!--conditional rendering in order to describe what 
                the icon is 'like a tooltip short of speak'-->
        <h1 v-if="showBagtip" class="tooltip">Shopping Bag</h1>
        <h1 v-else class="tooltip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="headersvg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <!--badge-->
          <div
            v-show="cartStore.totalItems > 0"
            class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-black/70 rounded-full"
          >
            {{ cartStore.totalItems }}
          </div>
        </h1>
      </button>
    </div>

    <!--drop down menu-->
    <div class="relative" @mouseover="showBar = true">
      <button @click="toggleBar" class="headerbtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="headersvg text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div class="relative" @mouseleave="toggleBar">
      <div v-if="showBar" @click="toggleBar" class="bar">
        <NuxtLink to="/" class="dropdown">Home</NuxtLink>
        <NuxtLink to="/sweats" class="dropdown">Sweats</NuxtLink>
        <NuxtLink to="/shirts" class="dropdown">Shirts</NuxtLink>
        <NuxtLink to="/bottoms" class="dropdown">Bottoms</NuxtLink>
      </div>
    </div>

    <!-- Teleported Components -->
    <Teleport to="body">
      <SignUp
        v-if="modalStore.showSignUp"
      />
      <Logout
        v-if="modalStore.showLogout"
      />
      <Login
        v-if="modalStore.showLogin"
      />
      <ShoppingBag
        v-if="modalStore.showCart"
      />
      <Favorites
        v-if="modalStore.showFav"
      />
      <Tooltip v-if="modalStore.showTooltip"/>
    </Teleport>
  </header>

  <slot />
</template>
<script setup>
import { useUserStore } from '../stores/userStore';
import { useModalsStore } from '../stores/modalStore';
import { useCartStore } from '../stores/cartStore';
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore(); // Access the Pinia store
const modalStore = useModalsStore(); 
const cartStore = useCartStore(); 

const showBar = ref(false);
const showBagtip = ref(false);
const showFavtip = ref(false);
// const showHideSpinner = ref(true);
 
// Fetch cart items when the component is mounted
onMounted(async () => {
  try {
    await cartStore.fetchCartItems();

    await modalStore.fetchFavItems();
    // console.log(modalStore.favItems);
    // showHideSpinner.value = false;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
  }
});

const cartItems = ref([]);
const favItems = ref([]);

const toggleLogin = () => {
  modalStore.toggleLogin();
};

const toggleSignUp = () => {
  modalStore.toggleSignUp();
};

const toggleLogout = () => {
  modalStore.toggleLogout();
};

const toggleFav = () => {
  modalStore.toggleFav();
};

const toggleCart = () => {
  modalStore.toggleCart();
};

const loggedin = () => {
  userStore.login(); // Update the store state
};

const logout = () => {
  userStore.logout();
};

const toggleBar = () => {
  showBar.value = !showBar.value;
};
</script>
