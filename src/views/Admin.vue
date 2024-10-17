<template>
  <div class="admin">
    <Loading v-if="loading" />
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="resgisterSuccessMessage"
    />
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input
            placeholder="Enter user email to make them an admin"
            type="text"
            id="addAdmin"
            v-model="adminEmail"
            :disabled="!isAdmin"
          />
        </div>
        <span>{{ this.functionMsg }}</span>
        <div v-show="error" class="error">{{ this.errorMessage }}</div>
        <button @click.prevent="addAdmin" class="button" v-show="isAdmin">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  firebaseAuth,
  signInWithEmailAndPassword,
} from "@/firebase/firebaseInit";
import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue";
export default {
  name: "Admin",
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      adminEmail: "",
      modalMessage: "Email Add Successfully!",
      errorMessage: "",
      error: false,
      functionMsg: null,
      modalActive: false,
    };
  },
  methods: {
    async addAdmin() {
      if (this.adminEmail === "") {
        this.error = true;
        this.errorMessage = "Please fill out all the fields";
        return;
      }
      this.loading = true;
      await signInWithEmailAndPassword(firebaseAuth, this.email)
        .then(() => {
          this.error = false;
          this.loading = false;
          this.modalActive = true;
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
              this.errorMessage = "Email was incorrect";
              break;
          }
          this.error = true;
          this.loading = false;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      background-color: #f1f1f1;
      padding: 32px;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
