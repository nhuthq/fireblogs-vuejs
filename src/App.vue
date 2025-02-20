<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
import { firebaseAuth } from "@/firebase/firebaseInit";

export default {
  name: "App",
  data() {
    return {
      navigation: null,
    };
  },
  components: {
    NavBar,
    Footer,
    RouterView,
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = false;
        return;
      }
      this.navigation = true;
    },
  },
  created() {
    this.checkRoute();
    firebaseAuth.onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });

    this.$store.dispatch("getPosts");
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<template>
  <div>
    <div class="app" v-if="this.$store.state.postLoaded">
      <NavBar v-if="navigation" />
      <RouterView />
      <Footer v-if="navigation" />
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transform: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: white;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: navajowhite;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
}

.blog-cards {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
