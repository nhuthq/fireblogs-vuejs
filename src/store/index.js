import { createStore } from "vuex";

export const store = createStore({
  state: {
    sampleBlogCards: [
      {
        title: "Blog Card #1",
        cover: "coding_thumbnail",
        date: "Oct 17, 2024",
      },
      {
        title: "Blog Card #3",
        cover: "harley_thumbnail",
        date: "Oct 17, 2024",
      },
      {
        title: "Blog Card #4",
        cover: "hcm_city_thumbnail",
        date: "Oct 17, 2024",
      },
      {
        title: "Blog Card #5",
        cover: "photographer_thumbnail",
        date: "Oct 17, 2024",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
