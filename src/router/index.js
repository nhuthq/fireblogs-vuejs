import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import Profile from "@/views/Profile.vue";
import Register from "@/views/Register.vue";
import ViewBlog from "@/views/ViewBlog.vue";
import EditBlog from "@/views/EditBlog.vue";
import CreatePost from "@/views/CreatePost.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import BlogPostPreview from "@/views/BlogPostPreview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/blogs",
      name: "Blogs",
      component: Blogs,
      meta: {
        title: "Blogs",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        title: "Register",
      },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: {
        title: "Fogot Password",
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: "Profile",
      },
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        title: "Admin",
      },
    },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost,
      meta: {
        title: "Create Post",
      },
    },
    {
      path: "/post-preview",
      name: "PostPreview",
      component: BlogPostPreview,
      meta: {
        title: "Post Preview",
      },
    },
    {
      path: "/blog/:blogId",
      name: "ViewBlog",
      component: ViewBlog,
      meta: {
        title: "View Blog",
        requiresAuth: false,
      },
    },
    {
      path: "/blog/edit/:blogId",
      name: "EditBlog",
      component: EditBlog,
      meta: {
        title: "Edit Blog",
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
      meta: {
        title: "404 Page not found",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlogs`;
  next();
});

export default router;
