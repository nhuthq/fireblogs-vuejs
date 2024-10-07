import { createStore } from "vuex";

export const store = createStore({
  state: {
    sampleBlogCards: [
      {
        title: "Nha Trang",
        cover: "nhatrang",
        date: "Oct 17, 2024",
      },
      {
        title: "Da Nang",
        cover: "danang",
        date: "Oct 17, 2024",
      },
      {
        title: "Hoi An",
        cover: "hoian",
        date: "Oct 19, 2024",
      },
      {
        title: "Ho Chi Minh city",
        cover: "hcm",
        date: "Oct 21, 2024",
      },
      {
        title: "Phu Quoc",
        cover: "phuquoc",
        date: "Oct 23, 2024",
      },
      {
        title: "Phu Quoc Wonderland",
        cover: "phuquocwonder",
        date: "Oct 23, 2024",
      },
      {
        title: "Vung Tau",
        cover: "vungtau",
        date: "Oct 25, 2024",
      },
      {
        title: "Ky Co",
        cover: "kyco",
        date: "Oct 27, 2024",
      },
      {
        title: "Ha Noi",
        cover: "hanoi",
        date: "Oct 30, 2024",
      },
    ],
    editPost: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      console.log("HERE:", payload);
      state.editPost = payload;
    },
  },
  actions: {},
  modules: {},
});
