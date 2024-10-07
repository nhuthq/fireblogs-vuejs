import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Blogs from "@/components/Blogs.vue";
import NotFoundView from "@/components/NotFoundView.vue";

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
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlogs`;
  next();
});

export default router;
