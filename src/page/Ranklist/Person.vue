<template>
  <v-container>
    <v-card class="mb-3">
      <v-card-text class="headlines">
        <h1>{{user_name}}</h1>
      </v-card-text>
      <v-divider />
      <v-row class="curtain ml-2">
        <v-col>
          <v-card-text>
            <tr>
              <td>NickName:</td>
              <td align="right">{{nick_name}}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td align="right">{{gender}}</td>
            </tr>
            <tr>
              <td>Solved:</td>
              <td align="right">{{tried.length}}</td>
            </tr>
            <tr>
              <td>Tried:</td>
              <td align="right">{{solved.length}}</td>
            </tr>
            <tr>
              <td>Last Seen:</td>
              <td align="right">{{last_login}}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td align="right">{{email}}</td>
            </tr>
            <tr>
              <td>Avatar:</td>
              <td align="right">{{avatar}}</td>
            </tr>
            <tr>
              <td>Motto:</td>
              <td align="right">{{motto}}</td>
            </tr>
          </v-card-text>
          <v-btn
            large
            color="primary"
            :to="{'name': 'Setting', params: {'id': pk}}"
            v-if="(this.$store.getters.IsStaff)||(this.$store.getters.uid==pk)"
          >
            <v-icon left>mdi-github-circle</v-icon>Edit
          </v-btn>
        </v-col>
        <v-col>
          <v-badge :color="done?'blue':'white'" overlap>
            <v-img :src="avatar" height="256" width="256">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="purple"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <template v-slot:badge v-if="isStaff||isTeacher">
              <div v-if="isStaff">
                <b>Admin</b>
              </div>
              <div v-if="!isStaff&&isTeacher">
                <b>Teacher</b>
              </div>
            </template>
          </v-badge>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mb-4">
      <v-card-text class="headlines">
        <h1>Problems Solved</h1>
      </v-card-text>
      <v-divider />
      <v-progress-circular v-if="!done" indeterminate color="green" class="mt-4 ml-4 mb-4" />
      <v-chip
        v-for="i in solved"
        :key="i"
        class="ma-2"
        color="green"
        label
        outlined
        :to="'/problem/'+i"
      >{{i}}</v-chip>
    </v-card>
    <v-card>
      <v-card-text class="headlines">
        <h1>Problems Tried</h1>
      </v-card-text>
      <v-divider />
      <v-progress-circular v-if="!done" indeterminate color="purple" class="mt-4 ml-4 mb-4" />
      <v-chip
        v-for="i in tried"
        :key="i"
        class="ma-2"
        color="orange"
        label
        outlined
        :to="'/problem/'+i"
      >{{i}}</v-chip>
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
      .get("v1/user/" + String(self.$route.params.id) + "/details", {
        headers: {
          Authorization: "Bearer " + self.$store.getters.Token
        }
      })
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
        self.isStaff = is_staff;
        self.isTeacher = is_teacher;
        self.pk = res.data.id;
        self.email = res.data.email;
        self.gender = res.data.gender;
        self.last_login = res.data.last_login;
        self.motto = res.data.motto;
        self.nick_name = res.data.nick_name;
        self.user_name = res.data.user_name;
        self.avatar =
          "https://secure.gravatar.com/avatar/" +
          md5(self.email.toLowerCase()) +
          "?s=512";
        this.tried =
          res.data.tried_problems === null ? [] : res.data.tried_problems;
        this.solved =
          res.data.success_problems === null ? [] : res.data.success_problems;
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
      tried: [],
      solved: [],
      nick_name: "",
      user_name: ""
    };
  },
  methods: {
    Delete() {}
  }
};
</script>