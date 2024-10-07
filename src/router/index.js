import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";

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
      name: "FogotPassword",
      component: ForgotPassword,
      meta: {
        title: "Fogot Password",
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
