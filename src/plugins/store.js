import Vue from 'vue'
import md5 from 'js-md5'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: localStorage.getItem("username") ? localStorage.getItem("username") : null,
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    IsStaff: localStorage.getItem("IsStaff") == "true" ? true : false,
    IsTeacher: localStorage.getItem("IsTeacher") == "true" ? true : false,
    uid: localStorage.getItem("uid") ? localStorage.getItem("uid") : "",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    refresh_token: localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : null,
  },
  getters: {
    username: function (state) {
      return state.username ? state.username : "PassersBy";
    },
    uid: function (state) {
      return state.uid;
    },
    email: function (state) {
      return state.email;
    },
    isLogin: function (state) {
      return state.username ? true : false;
    },
    gravatar: (state) => (size) => {
      return 'https://secure.gravatar.com/avatar/' + md5(state.email.toLowerCase()) + "?s=" + size;
    },
    IsStaff: function (state) {
      return state.IsStaff;
    },
    IsTeacher: function (state) {
      return state.IsTeacher;
    },
    Token: function (state) {
      return state.token;
    },
    Refresh_Token: function (state) {
      return state.refresh_token;
    },
  },
  mutations: {
    del_token(state) {
      state.token = null;
      localStorage.setItem("token", "");
    },
    userStatus(state, user) {
      if (user) {
        state.username = user;
        localStorage.setItem("username", user);
      } else if (user == "") {
        state.username = null;
        state.email = "";
        state.IsStaff = false;
        state.IsTeacher = false;
        state.uid = "";
        state.token = null;
        state.refresh_token = null;
        localStorage.setItem("username", "");
        localStorage.setItem("email", "");
        localStorage.setItem("IsStaff", "false");
        localStorage.setItem("IsTeacher", "false");
        localStorage.setItem("uid", "");
        localStorage.setItem("token", "");
        localStorage.setItem("refresh_token", "");
      }
    },
    userEmail(state, Url) {
      state.email = Url ? Url : "";
      localStorage.setItem("email", Url);
    },
    userIsStaff(state, IsStaff) {
      state.IsStaff = IsStaff;
    },
    userIsTeacher(state, IsTeacher) {
      state.IsTeacher = IsTeacher;
    },
    userUid(state, uid) {
      state.uid = uid ? uid : "";
      localStorage.setItem("uid", uid ? uid : "");
    },
    userToken(state, token) {
      state.token = token ? token : "";
      localStorage.setItem("token", token ? token : "");
    },
    userRefreshToken(state, refresh_token) {
      state.refresh_token = refresh_token ? refresh_token : "";
      localStorage.setItem("refresh_token", refresh_token ? refresh_token : "");
    }
  },
  actions: {
    Update_Token({
      commit
    }, data) {
      commit("userToken", data);
    },
    initState({
      commit
    }, data) {
      console.log(data);
      var is_staff = false;
      var is_teacher = false;
      for (var i of data.identity) {
        if (i === "admin") {
          is_staff = true;
        } else if (i === "teacher") {
          is_teacher = true;
        }
      }
      commit("userEmail", data.email);
      commit("userStatus", data.user_name);
      commit("userIsStaff", is_staff);
      commit("userIsTeacher", is_teacher);
      commit("userUid", data.id);
      commit("userToken", data.token);
      commit("userRefreshToken", data.refresh_token);

      localStorage.setItem("IsTeacher", is_teacher ? "true" : "false");
      localStorage.setItem("IsStaff", is_staff ? "true" : "false");
    },
    Del_Token({
      commit
    }) {
      commit("del_token");
    }
    ,
    logout({
      commit
    }) {
      commit("userStatus", "");
    }
  }
})

export default store
