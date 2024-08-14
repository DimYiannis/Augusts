<template>
  <div class="backdrop" @click.self="closeLogin">
    <div
      class="p-1 rounded-lg object-center z-10 mt-8 relative pt-3 top-4 appearance-none bg-white tablet:w-fit tablet:h-fit place-self-center w-screen h-fit"
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

      <form class="mb-6">
        <h1 class="heading-4 mb-3 text-2xl font-bold">Log in</h1>
        <h2 class="mb-1 font-semibold">
          Log in to access your dashboard.
          <br />
          Don't have an account yet?
          <a class="underline cursor-pointer" @click="ToggleSignup">Sign up</a>
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
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <button class="bg-[#2b2b2b] w-full rounded-none m-4 text-white h-10">
          Log in
        </button>

        <div class="text-center">
          <a class="underline font-semibold"> Forgot Password? </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      email: "",
      passwordError: "",
    };
  },

  methods: {
    login() {
      this.loading = true;

      axios
        .post(
          "http://localhost:5000/api/v1/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        ) //Without this option, cookies will not be sent.

        .then((response) => {
          console.log(response);
          console.log(response.data.user);
          alert("Welcome back!");

          //redirect to dashboard page.
          this.$router.push({ name: "default" });
        })
        .catch((error) => {
          console.error("Registration error:", error);
          // Handle the error and provide feedback to the user.
          this.errormsg = error.response.data.msg;

          // show the tooltip
          this.showError = true;
          // hide the tooltip after 5 seconds
          setTimeout(() => {
            this.showError = false;
          }, 5000);
        })
        .finally(() => {
          this.loading = false; // Set loading to false when the request is completed
        });
    },

    closeLogin() {
      this.$emit("close");
    },
    ToggleSignup() {
      this.$emit("toggle-signup");
    },
  },
};
</script>
