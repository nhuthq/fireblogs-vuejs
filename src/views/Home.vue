<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPosts"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blog</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, index) in sampleBlogCards"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <RouterLink class="router-button" :to="{ name: 'Login' }">
          Register for FireBlogs <Arrow class="arrow arrow-light" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { RouterLink } from "vue-router";
import BlogPost from "@/components/BlogPost.vue";
import BlogCard from "@/components/BlogCard.vue";
import Arrow from "@/assets/Icons/arrow-right-light.svg";

const store = useStore();

export default {
  name: "Home",
  components: {
    Arrow,
    BlogCard,
    BlogPost,
    RouterLink,
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        content:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        html: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        cover: "coding",
        photo: "coding",
      },
      sampleBlogPosts: [
        {
          title: "This is the blog title!",
          content: "This is the blog content",
          welcomeScreen: false,
          html: "This is the blog HTML",
          cover: "codingnight",
          photo: "codingnight",
        },
        {
          title: "This is the blog title!",
          content: "This is the blog content",
          welcomeScreen: false,
          html: "This is the blog HTML",
          cover: "photographer",
          photo: "photographer",
        },
        {
          title: "This is the blog title!",
          content: "This is the blog content",
          welcomeScreen: false,
          html: "This is the blog HTML",
          cover: "harley",
          photo: "harley",
        },
      ],
    };
  },
  computed: {
    blogPostFeed() {},
    blogPostCard() {},
    user() {},
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
