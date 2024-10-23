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
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            class="preview"
            @click="openPreviewCoverPhoto"
            :disabled="!this.$store.state.blogPhotoFileURL"
            :class="{ 'inactive-button': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <QuillEditor
          toolbar="full"
          :modules="modules"
          contentType="html"
          v-model:content="this.blogHTML"
          placeholder="Write your blog content here..."
        />
      </div>
      <div class="blog-actions">
        <button
          @click="submitBlog"
          :class="{
            'inactive-button': !profileAdmin,
          }"
        >
          Publish Blog
        </button>
        <button
          @click="previewBlog"
          :class="{
            'inactive-button': !profileAdmin,
          }"
        >
          Post Review
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  doc,
  setDoc,
  uploadBytes,
  firestoreDB,
  getDownloadURL,
  firebaseStorage,
} from "@/firebase/firebaseInit";
import { QuillEditor } from "@vueup/vue-quill";
import Loading from "@/components/Loading.vue";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageResize from "quill-image-resize";
import ImageCompress from "quill-image-compress";

export default {
  name: "Create Blog",
  components: {
    Loading,
    QuillEditor,
    BlogCoverPreview,
  },
  setup: () => {
    const modules = [
      {
        name: "imageResize",
        module: ImageResize,
        options: {
          handleStyles: {
            backgroundColor: "#303030",
            border: "none",
            color: "#303030",
          },
        },
      },
      {
        name: "imageCompress",
        module: ImageCompress,
        options: {
          quality: 0.7, // default
          imageType: ["image/jpeg", "image/jpg", "image/png"], // default
          debug: true, // default
          suppressErrorLogging: false, // default
          handleOnPaste: true, //default
          insertIntoEditor: (imageBase64URL, imageBlob, editor) => {
            const range = editor.getSelection();
            editor.insertEmbed(
              range.index,
              "image",
              `${imageBase64URL}`,
              "user"
            );
          },
        },
      },
    ];
    return { modules };
  },
  data() {
    return {
      loading: false,
      error: null,
      errorMessage: "",
      coverPhotoFile: null,
      contentAvailable: false,
    };
  },
  methods: {
    fileChange() {
      this.coverPhotoFile = this.$refs.blogPhoto.files[0];
      const fileName = this.coverPhotoFile.name;
      const fileURL = URL.createObjectURL(this.coverPhotoFile);
      this.$store.commit("updateBlogCoverPhotoURL", fileURL);
      this.$store.commit("updateBlogCoverPhotoName", fileName);
    },
    openPreviewCoverPhoto() {
      this.$store.commit("openPhotoPreview");
    },
    async submitBlog() {
      if (this.blogTitle.length === 0 || this.blogHTML.length === 0) {
        this.error = true;

        this.errorMessage =
          "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);

        return;
      } else if (!this.blogCoverPhotoName) {
        this.error = true;
        this.errorMessage = "Please ensure you uploaded a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }

      this.loading = true;
      this.errorMsg = "";
      this.error = false;

      // Gen unique ID
      const blogID =
        new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      const coverPhotoName = `${blogID}${this.blogCoverPhotoName}`;
      const coverPhotoRef = ref(
        firebaseStorage,
        `BlogPostCoverPhotos/${coverPhotoName}`
      );
      // Upload the file and metadata
      uploadBytes(coverPhotoRef, this.coverPhotoFile).then(async () => {
        try {
          const timestamp = Date.now();
          const downloadURL = await getDownloadURL(ref(coverPhotoRef)).catch(
            (error) => {
              this.error = true;
              this.loading = false;
              this.errorMessage = error;
              console.error("Error download URL: ", error);

              return;
            }
          );

          const blogData = {
            blogId: blogID,
            blogTitle: this.blogTitle,
            blogHTML: this.blogHTML,
            blogCoverPhoto: downloadURL,
            blogCoverPhotoName: coverPhotoName,
            profileId: this.profileId,
            isPublished: false,
            createdDate: timestamp,
            lastEditedDate: timestamp,
          };

          const blogsDocRef = doc(firestoreDB, "blogs", blogID);
          await setDoc(blogsDocRef, blogData, { merge: true }).then(
            async () => {
              await this.$store.dispatch("getPosts");
              setTimeout(() => {
                this.loading = false;
                this.$router.push({
                  name: "ViewBlog",
                  params: { blogId: blogsDocRef.id },
                });
              }, 2000);
            }
          );
        } catch (error) {
          this.error = true;
          this.loading = false;
          this.errorMessage = error;
          console.error("Error adding document: ", error);
          return;
        }
      });
    },
    previewBlog() {
      if (this.blogTitle.length === 0 || this.blogHTML.length === 0) {
        this.error = true;
        this.errorMessage =
          "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      } else if (!this.blogCoverPhotoName) {
        this.error = true;
        this.errorMessage = "Please ensure you uploaded a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);

        return;
      }
      this.$router.push({ name: "PostPreview" });
    },
  },
  computed: {
    profileAdmin() {
      return this.$store.state.profileAdmin;
    },
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogCoverPhotoName;
    },
    blogTitle: {
      get() {
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

      span {
        font-size: 16px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .inactive-button {
    pointer-events: none;
    background-color: gray;
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
