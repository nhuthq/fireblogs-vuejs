import { createStore } from "vuex";
import { firestoreDB, firebaseAuth } from "@/firebase/firebaseInit";
import { doc, collection, getDoc } from "firebase/firestore";

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
        title: "Ho Chi Minh",
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
    user: null,
    profileId: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
      console.log("updateUser:", payload);
    },
    setProfileInfo(state, userData) {
      state.profileId = userData.id;
      state.profileEmail = userData.data().email;
      state.profileFirstName = userData.data().firstName;
      state.profileLastName = userData.data().lastName;
      state.profileUserName = userData.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const docRef = doc(firestoreDB, "users", firebaseAuth.currentUser.uid);

      await getDoc(docRef)
        .then((data) => {
          if (data.exists) {
            const userData = data;
            commit("setProfileInfo", userData);
            commit("setProfileInitials");
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
  modules: {},
});
