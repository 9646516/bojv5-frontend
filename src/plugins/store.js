import Vue from 'vue'
import md5 from 'js-md5'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "Anonymous",
    isLogin: sessionStorage.getItem("isLogin") == "true" ? true : false,
    email: sessionStorage.getItem("email") ? sessionStorage.getItem("email") : "",
    IsStaff: sessionStorage.getItem("IsStaff") == "true" ? true : false,
    IsTeacher: sessionStorage.getItem("IsTeacher") == "true" ? true : false,
    uid: sessionStorage.getItem("uid") ? sessionStorage.getItem("uid") : "",
    nickname: sessionStorage.getItem("nickname") ? sessionStorage.getItem("nickname") : "",
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "",
  },
  getters: {
    username: function (state) {
      return state.username;
    },
    uid: function (state) {
      return state.uid;
    },
    nickname: function (state) {
      return state.nickname;
    },
    email: function (state) {
      return state.email;
    },
    isLogin: function (state) {
      return state.isLogin;
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
  },
  mutations: {
    userStatus(state, user) {
      if (user) {
        state.username = user;
        state.isLogin = true
      } else if (user == "") {
        state.username = "Anonymous";
        state.isLogin = false;
        state.email = "";
        state.IsStaff = false;
        state.IsTeacher = false;
        state.nickname = "";
        state.uid = "";
        state.token = "";
        sessionStorage.setItem("isLogin", "false");
        sessionStorage.setItem("username", "");
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("IsStaff", "false");
        sessionStorage.setItem("IsTeacher", "false");
        sessionStorage.setItem("nickname", "");
        sessionStorage.setItem("uid", "");
        sessionStorage.setItem("token", "");
      }
    },
    userEmail(state, Url) {
      state.email = Url ? Url : "";
    },
    userIsStaff(state, IsStaff) {
      state.IsStaff = IsStaff;
    },
    userIsTeacher(state, IsTeacher) {
      state.IsTeacher = IsTeacher;
    },
    userUid(state, uid) {
      state.uid = uid == uid ? uid : "";
    },
    userNickname(state, nickname) {
      state.nickname = nickname == nickname ? nickname : "";
    },
    userToken(state, token) {
      state.token = token == token ? token : "";
    }
  },
  actions: {
    setToken({
      commit
    }, token) {
      commit("userToken", token);
    },
    initState({
      commit
    }, data) {
      commit("userEmail", data.email);
      commit("userStatus", data.username);
      commit("userIsStaff", data.is_staff);
      commit("userIsTeacher", data.is_teacher);
      commit("userUid", data.uid);
      commit("userNickname", data.nickname);
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("IsTeacher", data.is_teacher ? "true" : "false");
      sessionStorage.setItem("IsStaff", data.is_staff ? "true" : "false");
      sessionStorage.setItem("uid", data.uid ? data.uid : "");
      sessionStorage.setItem("nickname", data.nickname ? data.nickname : "");
    },
    logout({
      commit
    }) {
      commit("userStatus", "");
    }
  }
})

export default store
