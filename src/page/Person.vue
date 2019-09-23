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
            v-if="this.$store.getters.username"
          >
            <v-icon left>mdi-github-circle</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-flex style="margin-top:2em;">
          <v-img :src="data.avatar" height="256" width="256" />
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
        <v-chip :key="index" class="ma-2" :color="stat==0?'orange':'green'" label outlined>{{index}}</v-chip>
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
    this.data.pk = 1;
    this.data.username = 1;
    this.data.gender = 1;
    this.data.email = 1;
    this.data.solved = [];
    this.data.tried = [];
    for (var i = 0; i < 999; i++) {
      if (i % 2 == 1) {
        this.data.solved.push(i);
      } else {
        this.data.tried.push(i);
      }
    }
    this.data.nickname = 1;
    this.data.email = "zyq855@gmail.com";
    this.data.avatar =
      "https://secure.gravatar.com/avatar/" +
      md5(this.data.email.toLowerCase()) +
      "?s=512";
    for (var i = 0; i < this.data.solved.length; i++) {
      this.mp[this.data.solved[i]] = 1;
    }
    for (var i = 0; i < this.data.tried.length; i++) {
      this.mp[this.data.tried[i]] = 0;
    }
    this.done = true;
  },
  data() {
    return {
      done: false,
      data: {},
      mp: {}
    };
  },
  methods: {}
};
</script>