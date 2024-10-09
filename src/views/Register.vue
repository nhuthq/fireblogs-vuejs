<template>
  <div class="form-wrap">
    <form class="login">
      <p class="register-login">Already have an account?</p>
      <RouterLink class="router-link" :to="{ name: 'Login' }">Login</RouterLink>
      <h2>Create you FireBlogs account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="User Name" v-model="userName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
      </div>
      <button>Sign Up</button>
    </form>
    <div class="angle"></div>
  </div>
  <div class="background"></div>
</template>
<script>
import User from "@/assets/Icons/user-alt-light.svg";
import Email from "@/assets/Icons/envelope-regular.svg";
import Password from "@/assets/Icons/lock-alt-solid.svg";
export default {
  name: "Register",
  components: {
    User,
    Email,
    Password,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      password: null,
    };
  },
};
</script>
<style lang="scss">
.form-wrap {
}
</style>
