<template>
  <v-container>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm10 md8 lg6 xl4>
        <v-card>
          <v-toolbar light>
            <v-tabs v-model="tabs" centered>
              <v-tab v-for="n in 3" :key="n">{{TabList[n]}}</v-tab>
            </v-tabs>
          </v-toolbar>
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card-text>
                <div align="center" justify="center">
                  <v-flex xs12>
                    <img v-bind:src="avatar" class="wpd_gravatar" />
                  </v-flex>
                  <v-divider />
                </div>

                <v-form @submit.prevent="submit">
                  <div>
                    <v-select
                      v-model="gender"
                      :items="genderList"
                      prepend-icon="mdi-account-multiple-outline"
                      class="mt-1"
                      persistent-hint
                      return-object
                      single-line
                    />
                  </div>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    disabled
                    prepend-icon="mdi-iframe"
                  />
                  <v-text-field
                    v-model="nickname"
                    label="Nickname"
                    prepend-icon="mdi-iframe-outline"
                  />

                  <v-text-field v-model="email" label="Email" prepend-icon="mdi-book" />
                  <v-text-field
                    v-model="isstaff"
                    label="IsStaff"
                    disabled
                    prepend-icon="mdi-emoticon-cool"
                  />
                  <v-text-field
                    v-model="isteacher"
                    label="IsTeacher"
                    disabled
                    prepend-icon="mdi-emoticon-cool"
                  />
                  <v-alert :value="true" class="mb-3" type="info" outlined>
                    <span>You can change your Avatar In</span>
                    <a href="https://cn.gravatar.com/">
                      <strong>
                        <span>Gravatar</span>
                      </strong>
                    </a>
                    <span>With Your Email</span>
                  </v-alert>
                  <v-btn block @click="click1">Submit</v-btn>
                </v-form>
              </v-card-text>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form @submit.prevent="submit">
                    <v-text-field
                      v-model="password0"
                      label="Old Password"
                      hint="This Field must be Filled"
                      autocomplete="password"
                      type="password"
                      outline
                    />
                    <v-text-field
                      v-model="password1"
                      label="New Password"
                      autocomplete="password"
                      hint="Leave Blank if donnot Want to Change"
                      type="password"
                      outline
                    />
                    <v-text-field
                      v-model="password2"
                      label="Repeat Password"
                      autocomplete="password"
                      hint="Repeat Your new Password"
                      type="password"
                      outline
                    />
                    <v-btn block @click="click2">Submit</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat v-if="this.isstaff">
                <v-sheet class="pa-5">
                  <v-switch v-model="SetTeacher" inset :label="`Is Teacher`"></v-switch>
                  <v-switch v-model="SetStaff" inset :label="`Is Staff`"></v-switch>
                  <v-switch v-model="SetActive" inset :label="`Is Active`"></v-switch>
                  <v-btn block @click="click3">Submit</v-btn>
                </v-sheet>
              </v-card>
              <v-card flat v-if="!this.isstaff">
                <v-card-text>
                  <v-card-title class="headline">You Cannot See This Page</v-card-title>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import Router from "@/plugins/router";
import md5 from "js-md5";

export default {
  mounted() {
    var self = this;
    this.axios
      .get(
        "http://10.105.242.94:23336/v1/user/" +
          String(self.$route.params.id) +
          "/details",
        {
          headers: {
            Authorization: "Bearer " + self.$store.getters.Token
          }
        }
      )
      .then(res => {
        console.log(res);
        var is_staff = false;
        var is_teacher = false;
        if (res.data.identity != null) {
          for (var i of res.data.identity) {
            if (i === "admin") {
              is_staff = true;
            } else if (i === "teacher") {
              is_teacher = true;
            }
          }
        }
        self.isStaff = is_staff;
        self.isTeacher = is_teacher;
        self.email = res.data.email;
        self.gender = res.data.gender;
        self.motto = res.data.motto;
        self.nickname = res.data.nick_name;
        self.username = res.data.user_name;
        self.avatar =
          "https://secure.gravatar.com/avatar/" +
          md5(res.data.email.toLowerCase()) +
          "?s=256";
      })
      .catch(function(error) {
        console.log(error);
      });

    if (
      !this.$store.getters.isStaff &&
      this.$store.getters.uid != this.$route.params.id
    ) {
      Router.push({
        name: "Error",
        params: { text: "You Cannot See this page" }
      });
    }
  },
  data: () => ({
    tabs: null,
    TabList: ["", "Setting", "Password", "Manage"],
    username: "",
    nickname: "",
    gender: "",
    email: "",
    isteacher: false,
    isstaff: false,
    avatar: "123",

    SetTeacher: false,
    SetStaff: false,
    SetActive: false,
    genderList: ["Male", "Female", "Secret"],
    password0: "",
    password1: "",
    password2: ""
  }),
  methods: {
    check1() {
      if (this.email == "") {
        this.error = "email cannot be empty";
        return false;
      } else if (!this.CheckEmail()) {
        this.error = "email is not valid";
        return false;
      } else if (this.nickname == "") {
        this.error = "nickname is empty";
        return false;
      } else if (this.gender == "") {
        this.error = "gender is not valid";
        return false;
      } else {
        return true;
      }
    },
    click1() {
      if (this.check1()) {
        this.axios.defaults.withCredentials = true;
        this.axios
          .get(
            "http://10.105.242.94:23333/rinne/ChangeUserInfo/" +
              "?username=" +
              escape(this.username) +
              "&gender=" +
              escape(this.gender) +
              "&nickname=" +
              escape(this.nickname) +
              "&email=" +
              escape(this.email)
          )
          .then(res => {
            if (res.data.status != "OK") {
              this.error = res.data.status;
            }
          });
        this.update();
      }
    },
    check2() {
      if (this.password0 == "") {
        this.error = "Old password cannot be empty";
        return false;
      } else if (this.password1 != this.password2) {
        this.error = "Confirmation mismatched";
        return false;
      } else if (this.username.password1 < 6) {
        this.error = "new password should at least 6 characters";
        return false;
      } else {
        return true;
      }
    },
    click2() {
      if (this.check2()) {
        this.axios.defaults.withCredentials = true;
        this.axios
          .get(
            "http://10.105.242.94:23333/rinne/ChangeUserPass/" +
              "?username=" +
              escape(this.username) +
              "&old_pass=" +
              escape(this.password0) +
              "&new_pass=" +
              escape(this.password1)
          )
          .then(res => {
            console.log(res);
            if (res.data.status != "OK") {
              this.error = res.data.status;
            }
          });
        Router.push({ name: "Logout" });
      }
    },
    click3() {
      this.axios.defaults.withCredentials = true;
      this.axios
        .get(
          "http://10.105.242.94:23333/rinne/ChangeUserPower/" +
            "?username=" +
            escape(this.username) +
            "&is_staff=" +
            escape(this.SetStaff) +
            "&is_teacher=" +
            escape(this.SetTeacher) +
            "&is_active=" +
            escape(this.SetActive)
        )
        .then(res => {
          console.log(res);
          if (res.data.status != "OK") {
            this.error = res.data.status;
          }
        });
      this.update();
    },
    CheckEmail() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return reg.test(this.email);
    }
  }
};
</script>
