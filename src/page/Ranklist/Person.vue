<template>
  <v-container>
    <v-card style="margin-bottom:3em;">
      <v-card-text class="headlines">
        <h1>Profile</h1>
      </v-card-text>
      <v-divider />
      <v-layout class="curtain" align-center justify-center>
        <v-flex style="margin-left:5em;margin-top:2em;">
          <v-card-text>username:{{user_name}}</v-card-text>
          <v-card-text>nickname:{{nick_name}}</v-card-text>
          <v-card-text>gender:{{gender}}</v-card-text>
          <v-card-text>Problems solved:{{tried.length}}</v-card-text>
          <v-card-text>Problems tried:{{solved.length}}</v-card-text>
          <v-card-text>motto:{{motto}}</v-card-text>
          <v-card-text>email:{{email}}</v-card-text>
          <v-card-text>avatar:{{avatar}}</v-card-text>
          <v-card-text>last_login:{{last_login}}</v-card-text>
          <v-btn
            large
            color="primary"
            :to="{'name': 'Setting', params: {'id': pk}}"
            v-if="(this.$store.getters.IsStaff)||(this.$store.getters.uid==pk)"
          >
            <v-icon left>mdi-github-circle</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-flex style="margin-top:2em;">
          <v-badge :color="done?'blue':'white'" overlap>
            <v-img :src="avatar" height="256" width="256">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="purple"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <template v-slot:badge>
              <div v-if="isStaff">
                <b>Admin</b>
                <v-icon dark>mdi-check</v-icon>
                <v-icon dark>mdi-check</v-icon>
              </div>
              <div v-if="isTeacher">
                <b>Teacher</b>
                <v-icon dark>mdi-check</v-icon>
              </div>
            </template>
          </v-badge>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card>
      <v-card-text class="headlines">
        <h1>Problems Solving</h1>
      </v-card-text>
      <v-divider />
      <v-progress-circular v-if="!done" indeterminate color="blue" />
      <v-card-title v-if="!mp.hasOwnProperty()">There is Nothing Here</v-card-title>
      <template v-for="(stat,index) in mp">
        <v-chip
          :key="index"
          class="ma-2"
          :color="stat==0?'orange':'green'"
          label
          outlined
          :to="'/problem/'+String(index)"
        >{{index}}</v-chip>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import Router from "@/plugins/router";
import md5 from "js-md5";
import Store from "@/plugins/store.js";
export default {
  created() {
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
        console.log(res);
        self.isStaff = is_staff;
        self.isTeacher = is_teacher;
        self.pk = res.data.id;
        self.email = res.data.email;
        self.gender = res.data.gender;
        self.last_login = res.data.last_login;
        self.motto = res.data.motto;
        self.nick_name = res.data.nick_name;
        self.tried = res.data.tried_problems;
        self.solved = res.data.success_problems;
        self.user_name = res.data.user_name;
        self.avatar =
          "https://secure.gravatar.com/avatar/" +
          md5(self.email.toLowerCase()) +
          "?s=512";
        for (var i = 0; i < self.solved.length; i++) {
          self.mp[self.solved[i]] = 1;
        }
        for (var i = 0; i < self.tried.length; i++) {
          self.mp[self.tried[i]] = 0;
        }
        self.done = true;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      done: false,
      isStaff: false,
      isTeacher: false,
      pk: 114514,
      avatar: "",
      email: "asd",
      gender: "1",
      last_login: "",
      motto: "",
      nick_name: "",
      user_name: "",
      solved: [],
      tried: [],
      mp: {}
    };
  },
  methods: {
    Delete() {}
  }
};
</script>