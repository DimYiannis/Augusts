<template>
  <div class="invbackdrop" @click.self="closeLogin">
    <div
      class="p-1 rounded-lg object-center z-10 mt-8 relative pt-3 top-4 bg-white tablet:w-fit tablet:h-fit place-self-center w-screen h-fit"
    >
      <div class="flex justify-end p-3 h-10">
        <button class="flex w-fit rounded-3xl p-2" @click="closeLogin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            class="w-6 h-6 hover:stroke-red-800 place-self-center"
          >
            <path
              stroke-linecap="round"
              troke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="login" class="mb-6">
        <h1 class="heading-4 mb-3 text-2xl font-bold">Log in</h1>
        <h2 class="mb-1 font-semibold">
          Log in to access your dashboard.
          <br />
          Don't have an account yet?
          <a class="underline cursor-pointer" @click="toggleSignup">Sign up</a>
        </h2>

        <label class="label">Email:</label>
        <input type="email" required v-model="email" placeholder="Email" />

        <label>Password:</label>
        <input
          type="password"
          required
          v-model="password"
          placeholder="Password"
        />
        <div v-if="error" class="error text-red-500 mt-2">{{ error }}</div>

        <button class="bg-[#2b2b2b] w-full rounded-none m-4 text-white h-10">
          Log in
        </button>

        <div class="text-center">
          <a class="underline font-semibold cursor-pointer" @click="useDemo">Use Demo Account</a>
        </div>

        <div class="text-center">
          <a class="underline font-semibold"> Forgot Password? </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useModalsStore } from '../stores/modalStore';

const router = useRouter();
const userStore = useUserStore();
const modalStore = useModalsStore();

const email = ref('');
const password = ref('');
const error = ref('');

const login = async () => {
  try {
    const result = await userStore.login(email.value, password.value);
    if (result) {
      const userResult = await userStore.getUser();
      if (userResult) {
        closeLogin();
      } else {
        error.value = "Failed to fetch user data";
      }
    } else {
      error.value = "Invalid email or password";
    }
  } catch (err) {
    console.error("Login error:", err);
    error.value = "An unexpected error occurred";
  } finally {
    setTimeout(() => {
      error.value = '';
    }, 5000);
  }
};

const closeLogin = () => {
  modalStore.showLogin = false;
};

const toggleSignup = () => {
  modalStore.toggleSignUp();
};

const useDemo = () => {
  email.value = 'user@email.com';
  password.value = 'secret';
  login();
};
</script>
