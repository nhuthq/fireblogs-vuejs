<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <RouterLink class="header" :to="'/'">Fire Blogs</RouterLink>
          <ul>
            <li>
              <RouterLink :to="'/'"><youtube class="svg-icon" /></RouterLink>
            </li>
            <li>
              <RouterLink :to="'/'"><twitter class="svg-icon" /></RouterLink>
            </li>
            <li>
              <RouterLink :to="'/'"><instagram class="svg-icon" /></RouterLink>
            </li>
            <li>
              <RouterLink :to="'/'"><linkedin class="svg-icon" /></RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <li>
              <RouterLink class="link" :to="{ name: 'Home' }">Home</RouterLink>
            </li>
            <li>
              <RouterLink class="link" :to="{ name: 'Blogs' }"
                >Blogs</RouterLink
              >
            </li>
            <li>
              <RouterLink
                v-show="isAdmin"
                class="link"
                :to="{ name: 'CreatePost' }"
                >Create Post</RouterLink
              >
            </li>
            <li>
              <RouterLink v-show="!user" class="link" :to="{ name: 'Login' }"
                >Login In / Register</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import youtube from "@/assets/Icons/youtube-brands.svg";
import twitter from "@/assets/Icons/twitter-brands.svg";
import linkedin from "@/assets/Icons/linkedin-brands.svg";
import instagram from "@/assets/Icons/instagram-brands.svg";

export default {
  name: "Footer",
  components: {
    youtube,
    twitter,
    instagram,
    linkedin,
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

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;

  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: white;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;
        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;
          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              color: white;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
        }
        .link {
          font-size: 16;
          font-weight: 500;
          color: white;
          text-decoration: none;
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
