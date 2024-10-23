<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentBlog[0].createdDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>

      <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div
        class="post-content ql-editor"
        v-html="this.currentBlog[0].blogHTML"
      ></div>
      <h4>
        Last edited on:
        {{
          new Date(this.currentBlog[0].lastEditedDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = this.$store.state.blogPosts.filter((post) => {
      return post.blogId === this.$route.params.blogId;
    });
  },
};
</script>

<style lang="css">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
