<template>
  <div class="form-wrap">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="resgisterSuccessMessage"
    />

    <form class="register">
      <p class="login-register">
        Already have an account?
        <RouterLink class="router-link" :to="{ name: 'Login' }"
          >Login</RouterLink
        >
      </p>
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
        <div v-show="error" class="error">{{ this.errorMessage }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>
<script>
import {
  firestoreDB,
  firebaseAuth,
  createUserWithEmailAndPassword,
} from "@/firebase/firebaseInit";
import { doc, setDoc } from "firebase/firestore";

import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue";
import User from "@/assets/Icons/user-alt-light.svg";
import Email from "@/assets/Icons/envelope-regular.svg";
import Password from "@/assets/Icons/lock-alt-solid.svg";

export default {
  name: "Register",
  components: {
    User,
    Email,
    Password,
    Loading,
    Modal,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
      modalActive: false,
      resgisterSuccessMessage:
        "Congratulations! Your account have been successfully created.",
    };
  },
  methods: {
    async register() {
      if (
        this.firstName === "" ||
        this.lastName === "" ||
        this.userName === "" ||
        this.email === "" ||
        this.password === ""
      ) {
        this.error = true;
        this.loading = false;
        this.errorMessage = "Please fill out all the fields";
        return;
      }
      this.loading = true;
      this.error = false;
      this.errorMessage = "";

      await createUserWithEmailAndPassword(
        firebaseAuth,
        this.email,
        this.password
      )
        .then(async () => {
          try {
            const userID = firebaseAuth.currentUser.uid;
            const data = {
              firstName: this.firstName,
              lastName: this.lastName,
              userName: this.userName,
              email: this.email,
            };
            const docRef = doc(firestoreDB, "users", userID);
            await setDoc(docRef, data, { merge: true }).then((respone) => {
              this.loading = false;
              this.modalActive = true;
              console.log("Document written with ID: ", respone);
            });
          } catch (e) {
            this.error = true;
            this.loading = false;
            this.errorMessage = e;
            console.error("Error adding document: ", e);
            return;
          }
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errorMessage = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errorMessage = "Incorrect password";
              break;
            default:
              this.errorMessage = "Email or password was incorrect";
              break;
          }
          this.error = true;
          this.loading = false;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style lang="scss">
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
