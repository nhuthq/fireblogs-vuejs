<template>
  <div class="blog-card">
    <ConfirmDialog
      v-if="confirmActiveDialog"
      v-on:confirm="deletePost"
      v-on:closeModal="closeModal"
    />
    <div v-show="editPost" class="icons">
      <div class="icon" @click="editBlog">
        <Edit class="edit" />
      </div>
      <div class="icon" @click="confirmDelete">
        <Delete class="delete" />
      </div>
    </div>
    <img
      @click="viewPost"
      :src="post.blogCoverPhoto"
      :alt="post.blogCoverPhotoName"
    />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>
        Posted on:
        {{
          new Date(post.createdDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h6>
      <RouterLink
        class="link"
        :to="{ name: 'ViewBlog', params: { blogId: this.post.blogId } }"
        >View The Post <Arrow class="arrow"
      /></RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

import Edit from "@/assets/Icons/edit-regular.svg";
import Delete from "@/assets/Icons/trash-regular.svg";
import Arrow from "@/assets/Icons/arrow-right-light.svg";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "BlogCard",
  props: ["post"],
  components: { Arrow, Edit, Delete, RouterLink, ConfirmDialog },
  data() {
    return {
      confirmActiveDialog: false,
    };
  },
  methods: {
    confirmDelete() {
      this.confirmActiveDialog = true;
    },
    closeModal() {
      this.confirmActiveDialog = !this.confirmActiveDialog;
    },
    deletePost() {
      this.$store.dispatch("deletePost", this.post.blogId);
      this.confirmActiveDialog = !this.confirmActiveDialog;
    },
    editBlog() {
      this.$router.push({
        name: "EditBlog",
        params: { blogId: this.post.blogId },
      });
    },
    viewPost() {
      this.$router.push({
        name: "ViewBlog",
        params: { blogId: this.post.blogId },
      });
    },
  },
  computed: {
    editPost() {
      return this.$store.state.editPost;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: white;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: white;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;
        .edit,
        .delete {
          path {
            fill: white;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      padding-bottom: 16px;
      font-size: 12px;
      font-weight: 400;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;
    }

    &:hover {
      color: rgba(48, 48, 48, 0.8);
    }

    .arrow {
      width: 10px;
    }
  }
}
</style>
