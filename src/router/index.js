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
        requiresAuth: false,
      },
    },
    {
      path: "/blogs",
      name: "Blogs",
      component: Blogs,
      meta: {
        title: "Blogs",
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "Login",
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        title: "Register",
        requiresAuth: false,
      },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: {
        title: "Fogot Password",
        requiresAuth: false,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: "Profile",
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        title: "Admin",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost,
      meta: {
        title: "Create Post",
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/post-preview",
      name: "PostPreview",
      component: BlogPostPreview,
      meta: {
        title: "Post Preview",
        requiresAuth: true,
        requiresAdmin: true,
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
        requiresAuth: true,
        requiresAdmin: true,
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

router.beforeEach(async (to, from, next) => {
  let user = firebaseAuth.currentUser;
  let admin = null;

  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }

  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
