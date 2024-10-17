<script>
import { useRoute } from "vue-router";
import { firebaseAuth } from "@/firebase/firebaseInit";
import MenuIcon from "@/assets/Icons/bars-regular.svg";
import UserIcon from "@/assets/Icons/user-alt-light.svg";
import AdminIcon from "@/assets/Icons/user-crown-light.svg";
import SignOutIcon from "@/assets/Icons/sign-out-alt-regular.svg";

export default {
  name: "Navigation",
  setup() {},
  components: {
    MenuIcon,
    UserIcon,
    AdminIcon,
    SignOutIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
      toggleProfile: false,
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
    isActiveLink(routePath) {
      const route = useRoute();
      return route.path === routePath;
    },

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.toggleProfile = !this.toggleProfile;
      }
    },
    signOut() {
      firebaseAuth.signOut();
      window.location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<template>
  <header>
    <nav class="container">
      <div class="branding">
        <RouterLink class="header" :to="{ name: 'Home' }"
          >Fire Blogs</RouterLink
        >
      </div>
      <div class="nav-link">
        <ul v-show="!mobile">
          <RouterLink
            :class="[isActiveLink('/') ? 'link link-active' : 'link']"
            :to="{ name: 'Home' }"
            >Home</RouterLink
          >
          <RouterLink
            :class="[isActiveLink('/blogs') ? 'link link-active' : 'link']"
            :to="{ name: 'Blogs' }"
            >Blogs</RouterLink
          >
          <RouterLink v-show="isAdmin" class="link">Create Post</RouterLink>
          <RouterLink v-show="!user" class="link" :to="{ name: 'Login' }"
            >Login/Register</RouterLink
          >
        </ul>
        <div
          v-if="user"
          @click="toggleProfileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="toggleProfile" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>
                  {{ this.$store.state.profileUserName }}
                  {{ this.$store.state.profileEmail }}
                </p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <RouterLink class="option" :to="{ name: 'Profile' }">
                  <UserIcon class="icon" />
                  <p>Profile</p>
                </RouterLink>
              </div>
              <div class="option">
                <RouterLink
                  v-show="isAdmin"
                  class="option"
                  :to="{ name: 'Admin' }"
                >
                  <AdminIcon class="icon" />
                  <p>Admin</p>
                </RouterLink>
              </div>
              <div class="option">
                <RouterLink @click="signOut" class="option" to="#">
                  <SignOutIcon class="icon" />
                  <p>Sign Out</p>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <MenuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    <Transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <RouterLink
          :class="[isActiveLink('/') ? 'link link-active' : 'link']"
          :to="{ name: 'Home' }"
          >Home</RouterLink
        >
        <RouterLink
          :class="[isActiveLink('/blogs') ? 'link link-active' : 'link']"
          :to="{ name: 'Blogs' }"
          >Blogs</RouterLink
        >
        <RouterLink
          v-show="isAdmin"
          :class="[isActiveLink('/admin') ? 'link link-active' : 'link']"
          :to="{ name: 'Admin' }"
          >Admin</RouterLink
        >
        <RouterLink v-show="isAdmin" class="link" to="#"
          >Create Post</RouterLink
        >
        <RouterLink v-show="!user" class="link" :to="{ name: 'Login' }"
          >Login/Register</RouterLink
        >
      </ul>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
@mixin link($color: black) {
  color: $color;
}
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    @include link($color: black);
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }

    &.link-active {
      @include link($color: #1eb8b8);
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

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: white;
        border-radius: 50%;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          max-width: 280px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: white;
              display: flex;
              align-items: center;
              margin-bottom: 15px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 32px;
    right: 32px;
    height: 24px;
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
      &.link-active {
        @include link($color: #1eb8b8);
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
