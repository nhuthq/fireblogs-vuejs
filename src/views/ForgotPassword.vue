<template>
  <div class="reset-password">
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="modalMessage"
    />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <RouterLink class="router-link" :to="{ name: 'Login' }"
            >Login</RouterLink
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgo your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <Email class="icon" />
          </div>
        </div>
        <div v-show="error" class="error">{{ this.errorMessage }}</div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth, sendPasswordResetEmail } from "@/firebase/firebaseInit";
import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue";
import Email from "@/assets/Icons/envelope-regular.svg";
export default {
  name: "ForgotPassword",
  components: { Email, Modal, Loading },
  data() {
    return {
      email: "",
      modalActive: false,
      modalMessage: "",
      loading: false,
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    async resetPassword() {
      if (this.email === "") {
        this.error = true;
        this.errorMessage = "Please fill out all the fields";
        return;
      }

      this.error = false;
      this.loading = true;
      await sendPasswordResetEmail(firebaseAuth, this.email)
        .then(() => {
          this.loading = false;
          this.modalActive = true;
          this.modalMessage = `If your account exits, a reset link have been sent to this mail: ${this.email}`;
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errorMessage = "No account with that email was found";
              break;
            default:
              this.errorMessage = `${error}`;
              console.log("Erorr: ", error);
              break;
          }
          this.error = true;
          this.loading = false;
          this.modalActive = false;
        });
    },
    closeModal() {
      this.email = "";
      this.modalActive = !this.modalActive;
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style lang="scss">
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
