<template>
  <div class="tablet:mt-2 h-fit">
    <form class="form" @submit.prevent="handleSubmit">
      <h1 class="text-center font-semibold text-lg">
        Why wait? Sign up now and start shopping
      </h1>

      <label class="label">Full Name:</label>
      <input type="name" required v-model="name" placeholder="Full Name" />

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

      <div class="terms">
        <h1 class="text-[10px]">
          By signing up, you are agreeing to our Terms of Service . We don’t
          allow third-party marketplace (e.g. Amazon, Bol.com, eBay, Etsy)
          resellers at August's
        </h1>
      </div>

      <div class="submit">
        <button class="buton" @click="register">Join Now</button>
        <div class="place-self-start text-[10px] flex gap-1">
          <p>Already have an account?</p>
          <a
            class="cursor-pointer underline underline-offset-1"
            @click="ToggleLogin"
            >log in</a
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useModalsStore } from '../stores/modalStore';

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordError: "",
    };
  },
  methods: {
    ToggleLogin() {
      const modalStore = useModalsStore(); 
      modalStore.toggleLogin();
    },
    register() {
      axios
        .post(
          "http://augusts-production.up.railway.app/api/v1/auth/register",
          {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        ) //Without this option, cookies will not be sent.

        .then((response) => {
          console.log(response);
          console.log(response.data.user);
          alert("Welcome at August's!");
          this.$emit("logged-in");
          //redirect to dashboard page.
          this.$router.push("/");
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
    },
  },
};
</script>
