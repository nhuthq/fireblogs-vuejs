import { createStore } from "vuex";
import {
  firestoreDB,
  firebaseAuth,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
} from "@/firebase/firebaseInit";

export const store = createStore({
  state: {
    blogPosts: [],
    user: null,
    editPost: null,
    postLoaded: null,
    profileId: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileInitials: null,
    editPost: null,
    blogPhotoName: null,
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    blogTitle: "",
    blogHTML: "",
  },
  getters: {
    blogPostFeeds(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostCards(state) {
      console.log("ALL", state.blogPosts);
      return state.blogPosts.slice(2, 10);
    },
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
      state.profileAdmin = userData.data().isAdmin;
      state.profileFirstName = userData.data().firstName;
      state.profileLastName = userData.data().lastName;
      state.profileUserName = userData.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
    changeAdmin(state, payload) {
      state.profileAdmin = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    updateBlogHTML(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogCoverPhotoName(state, payload) {
      state.blogPhotoName = payload;
    },
    updateBlogCoverPhotoURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
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

    async getPosts({ state }) {
      const querySnapshot = await getDocs(collection(firestoreDB, "blogs"));
      querySnapshot.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
          const docData = doc.data();
          const data = {
            blogId: docData.blogId,
            blogTitle: docData.blogTitle,
            blogHTML: docData.blogHTML,
            blogCoverPhoto: docData.blogCoverPhoto,
            blogCoverPhotoName: docData.blogCoverPhotoName,
            profileId: docData.profileId,
            isPublished: docData.isPublished,
            createdDate: docData.createdDate,
            lastEditedDate: docData.lastEditedDate,
          };
          state.blogPosts.push(data);
        }
      });

      state.postLoaded = true;
    },
    async updateUserSettings({ commit, state }) {
      const data = {
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUserName,
      };
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, "users", userId);

      await setDoc(docRef, data, { merge: true })
        .then((respone) => {
          console.log("Document update with ID: ", respone);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      commit("setProfileInitials");
    },

    async addAmin({}) {
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, "users", userId);

      console.log("ADD ADMIN RED:", docRef);

      // await setDoc(docRef, data, { merge: true })
      //   .then((respone) => {
      //     console.log("Document update with ID: ", respone);
      //   })
      //   .catch((error) => {
      //     console.log("Error getting document:", error);
      //   });
    },
  },
  modules: {},
});
