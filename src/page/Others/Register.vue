<template>
  <v-layout justify-center>
    <v-flex xs12 md6>
      <v-card>
        <v-container>
          <div align="center" justify="center">
            <v-flex xs12>
              <img v-bind:src="this.$store.getters.gravatar(256)" class="wpd_gravatar" />
            </v-flex>
            <v-divider />
          </div>
          <v-text-field v-model="username" label="Username" />
          <v-text-field v-model="password" label="Password" type="password" />
          <v-text-field v-model="password2" label="Repeat Password" type="password" />
          <v-text-field v-model="nickname" label="Nickname" />
          <v-text-field v-model="email" label="Email" />
          <div>
            <v-select
              v-model="gender"
              :items="genderList"
              item-text="abbr"
              item-value="status"
              prepend-icon="mdi-account-multiple-outline"
              return-object
            />
          </div>
          <v-alert :value="true" class="mb-3" type="info" outlined>
            <span>Your Avatar is Bind With Your Email In</span>
            <a href="https://cn.gravatar.com/">
              <strong>
                <span>Gravatar</span>
              </strong>
            </a>
          </v-alert>
          <v-btn block @click="submit">Submit</v-btn>
          <v-card-text style="color:red;">{{error}}</v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import router from "@/plugins/router.js";
import Store from "@/plugins/store.js";
export default {
  data: () => ({
    username: "",
    password: "",
    password2: "",
    email: "",
    error: "",
    nickname: "",
    genderList: [
      { state: 0, abbr: "Secret" },
      { state: 1, abbr: "Female" },
      { state: 2, abbr: "Male" }
    ],
    gender: { state: 0, abbr: "Male" }
  }),
  methods: {
    submit() {
      if (this.check()) {
        this.axios
          .post("v1/user/register", {
            user_name: this.username,
            password: this.password,
            nick_name: this.nickname,
            email: this.email,
            gender: String(this.gender.state)
          })
          .then(res => {
            if (res.data.status == "OK") {
              router.push({
                name: "Login",
                params: { text: "Register succeed,Please Login First" }
              });
            } else {
              this.error = res.data.status;
            }
          });
      }
    },
    check() {
      if (this.username == "") {
        this.error = "Username cannot be Empty";
        return false;
      } else if (this.password == "") {
        this.error = "Password cannot be Empty";
        return false;
      } else if (this.password2 == "") {
        this.error = "Repeat your Password";
        return false;
      } else if (this.email == "") {
        this.error = "Email cannot be Empty";
        return false;
      } else if (this.password.length < 6) {
        this.error = "Password should at least 6 characters";
        return false;
      } else if (!this.CheckEmail()) {
        this.error = "Email is not valid";
        return false;
      } else if (this.password != this.password2) {
        this.error = "Confirmation mismatched";
        return false;
      } else if (this.gender == "") {
        this.error = "Gender is Empty";
        return false;
      } else if (this.nickname == "") {
        this.error = "Nickname is Empty";
        return false;
      } else {
        return true;
      }
    },
    CheckEmail() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return reg.test(this.email);
    }
  }
};
</script>
