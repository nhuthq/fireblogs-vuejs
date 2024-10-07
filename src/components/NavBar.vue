<script>
import menuIcon from "@/assets/Icons/bars-regular.svg";

export default {
  name: "Navigation",
  components: {
    menuIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windownWidth = window.innerWidth;
      if (this.windownWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<template>
  <header>
    <nav class="container">
      <div class="branding">
        <RouterLink class="header" :to="'/'">Fire Blogs</RouterLink>
      </div>
      <div class="nav-link">
        <ul v-show="!mobile">
          <RouterLink class="link" :to="'/'">Home</RouterLink>
          <RouterLink class="link" :to="'/blogs'">Blogs</RouterLink>
          <RouterLink class="link" to="#">Create Post</RouterLink>
          <RouterLink class="link" to="#">Login/Register</RouterLink>
        </ul>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    <Transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <RouterLink class="link" to="#">Home</RouterLink>
        <RouterLink class="link" to="#">Blogs</RouterLink>
        <RouterLink class="link" to="#">Create Post</RouterLink>
        <RouterLink class="link" to="#">Login/Register</RouterLink>
      </ul>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: black;
        text-decoration: none;
      }
    }

    .nav-link {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 32px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
      &:hover {
        color: #1eb8b8;
      }
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
