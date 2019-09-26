<template>
  <v-container>
    <v-card style="margin-bottom:3em;">
      <v-card-text class="headlines">
        <h1>Profile</h1>
      </v-card-text>
      <v-divider />
      <v-layout class="curtain" align-center justify-center>
        <v-flex style="margin-left:5em;margin-top:2em;">
          <v-card-text>username:{{data.username}}</v-card-text>
          <v-card-text>nickname:{{data.nickname}}</v-card-text>
          <v-card-text>gender:{{data.gender}}</v-card-text>
          <v-card-text>Problems solved:{{data.tried.length}}</v-card-text>
          <v-card-text>Problems tried:{{data.solved.length}}</v-card-text>
          <v-btn
            large
            color="primary"
            :to="{'name': 'Setting', params: {'id': data.pk}}"
            v-if="(this.$store.getters.IsStaff)||(this.$store.getters.uid==data.pk)"
          >
            <v-icon left>mdi-github-circle</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-flex style="margin-top:2em;">
          <v-badge color="blue" overlap>
            <v-img :src="data.avatar" height="256" width="256" />
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate :color="get_color()"></v-progress-circular>
              </v-row>
            </template>
            <template v-slot:badge>
              <div v-if="data.isStaff">
                <b>Admin</b>
                <v-icon dark>mdi-check</v-icon>
                <v-icon dark>mdi-check</v-icon>
              </div>
              <div v-if="data.isTeacher">
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
        self.data.isStaff = is_staff;
        self.data.isTeacher = is_teacher;
        self.data.pk = res.data.id;
        self.data.email = res.data.email;
        self.data.gender = res.data.gender;
        self.data.last_login = res.data.last_login;
        self.data.motto = res.data.motto;
        self.data.nick_name = res.data.nick_name;
        self.data.tried = res.data.tried_problems;
        self.data.solved = res.data.success_problems;
        self.data.user_name = res.data.user_name;
        console.log(self.data);
        self.data.avatar =
          "https://secure.gravatar.com/avatar/" +
          md5(self.data.email.toLowerCase()) +
          "?s=512";
        for (var i = 0; i < self.data.solved.length; i++) {
          self.mp[self.data.solved[i]] = 1;
        }
        for (var i = 0; i < self.data.tried.length; i++) {
          self.mp[self.data.tried[i]] = 0;
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
      data: { solved: [], tried: [] },
      mp: {}
    };
  },
  methods: {
    Delete() {}
  }
};
</script>