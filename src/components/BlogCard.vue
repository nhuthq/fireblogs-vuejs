<template>
  <div class="blog-card">
    <div class="icons">
      <div class="icon">
        <Edit class="edit" />
      </div>
      <div class="icon">
        <Delete class="delete" />
      </div>
    </div>
    <img :src="getImage(post.cover)" alt="thumbnail" />
    <div class="info">
      <h4>{{ post.title }}</h4>
      <h6>Posted on: {{ post.date }}</h6>
      <RouterLink class="link" to="#"
        >View The Post <Arrow class="arrow"
      /></RouterLink>
    </div>
  </div>
</template>

<script>
// MockData
import danang from "@/assets/thumbnail/danang.jpg";
import nhatrang from "@/assets/thumbnail/nhatrang.jpg";
import hoian from "@/assets/thumbnail/hoian.jpg";
import kyco from "@/assets/thumbnail/kyco.jpg";
import vungtau from "@/assets/thumbnail/vungtau.jpg";
import hanoi from "@/assets/thumbnail/hanoi.jpg";
import hcm from "@/assets/thumbnail/hcm.jpg";
import phuquoc from "@/assets/thumbnail/phuquoc.jpg";
import phuquocwonder from "@/assets/thumbnail/phuquocwonder.jpg";

import Arrow from "@/assets/Icons/arrow-right-light.svg";
import Edit from "@/assets/Icons/edit-regular.svg";
import Delete from "@/assets/Icons/trash-regular.svg";
import { RouterLink } from "vue-router";

const mockImages = [
  danang,
  nhatrang,
  hoian,
  kyco,
  vungtau,
  hanoi,
  hcm,
  phuquoc,
  phuquocwonder,
];

export default {
  name: "BlogCard",
  props: ["post"],
  components: { Arrow, Edit, Delete, RouterLink },
  methods: {
    deletePost() {},
    editBlog() {},
    getImage(imageName) {
      return mockImages.filter((item) => item === imageName.toLocaleString());
    },
  },
  computed: {
    editPost() {},
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
