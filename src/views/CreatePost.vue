<template>
  <div class="create-post">
    <Loading v-show="loading" />
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <div class="container">
      <div :class="{ invisible: !error }" class="error-message">
        <p><span>Error: </span>{{ this.errorMessage }}</p>
      </div>
      <div class="blog-info">
        <input
          type="text"
          placeholder="Enter blog title"
          v-model="this.blogTitle"
        />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            id="blog-photo"
            ref="blogPhoto"
            accept=".jpg, .png, jpeg"
            @change="fileChange"
          />
          <button
            @click="openPreviewCoverPhoto"
            class="preview"
            :disabled="!this.$store.state.blogPhotoFileURL"
            :class="{ 'inactive-button': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <QuillEditor
          theme="snow"
          toolbar="full"
          v-model:content="this.blogHTML"
          contentType="html"
          placeholder="Write your blog content here..."
          :editorOptions="editorSettings"
        />
      </div>
      <div class="blog-actions">
        <button>Publish Blog</button>
        <RouterLink class="router-button" :to="{ name: 'PostPreview' }"
          >Post Review</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {
  name: "Create Post",
  components: {
    Loading,
    QuillEditor,
    BlogCoverPreview,
  },
  data() {
    return {
      file: null,
      error: null,
      errorMessage: "",
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      const fileURL = URL.createObjectURL(this.file);
      this.$store.commit("updateBlogCoverPhotoURL", fileURL);
      this.$store.commit("updateBlogCoverPhotoName", fileName);
    },
    openPreviewCoverPhoto() {
      this.$store.commit("openPhotoPreview");
    },
  },
  computed: {
    profileId: {},
    blogTitle: {
      get() {
        console.log("BLOG TITLE: ", this.$store.state.blogTitle);
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("updateBlogHTML", payload);
      },
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: white;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: white;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .error-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      .inactive-button {
        background-color: gray;
      }

      span {
        font-size: 16px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
