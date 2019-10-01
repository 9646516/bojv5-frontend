import Vue from 'vue'
import md5 from 'js-md5'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: sessionStorage.getItem("username") ? sessionStorage.getItem("username") : null,
    email: sessionStorage.getItem("email") ? sessionStorage.getItem("email") : "",
    IsStaff: sessionStorage.getItem("IsStaff") == "true" ? true : false,
    IsTeacher: sessionStorage.getItem("IsTeacher") == "true" ? true : false,
    uid: sessionStorage.getItem("uid") ? sessionStorage.getItem("uid") : "",
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null,
    refresh_token: sessionStorage.getItem("refresh_token") ? sessionStorage.getItem("refresh_token") : null,
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
      sessionStorage.setItem("token", "");
    },
    userStatus(state, user) {
      if (user) {
        state.username = user;
        sessionStorage.setItem("username", user);
      } else if (user == "") {
        state.username = null;
        state.email = "";
        state.IsStaff = false;
        state.IsTeacher = false;
        state.uid = "";
        state.token = "";
        state.refresh_token = "";
        sessionStorage.setItem("username", "");
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("IsStaff", "false");
        sessionStorage.setItem("IsTeacher", "false");
        sessionStorage.setItem("uid", "");
        sessionStorage.setItem("token", "");
        sessionStorage.setItem("refresh_token", "");
      }
    },
    userEmail(state, Url) {
      state.email = Url ? Url : "";
      sessionStorage.setItem("email", Url);
    },
    userIsStaff(state, IsStaff) {
      state.IsStaff = IsStaff;
    },
    userIsTeacher(state, IsTeacher) {
      state.IsTeacher = IsTeacher;
    },
    userUid(state, uid) {
      state.uid = uid ? uid : "";
      sessionStorage.setItem("uid", uid ? uid : "");
    },
    userToken(state, token) {
      state.token = token ? token : "";
      sessionStorage.setItem("token", token ? token : "");
    },
    userRefreshToken(state, refresh_token) {
      state.refresh_token = refresh_token ? refresh_token : "";
      sessionStorage.setItem("refresh_token", refresh_token ? refresh_token : "");
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

      sessionStorage.setItem("IsTeacher", is_teacher ? "true" : "false");
      sessionStorage.setItem("IsStaff", is_staff ? "true" : "false");
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
