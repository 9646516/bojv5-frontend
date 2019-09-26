<template>
  <v-container>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-row v-for="j in data" :key="j[0].id">
      <v-col v-for="i in j" :key="i.id">
        <UserCard
          :src="'https://secure.gravatar.com/avatar/' +i.emailmd5 +'?s=512'"
          :pk="i.id"
          :nickname="i.nick_name"
          :solved="i.solved"
          :tried="i.tried"
          :motto="i.motto"
          :last_login="i.last_login"
          :gender="i.gender"
          :email="i.email"
        />
      </v-col>
    </v-row>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="options.page" :length="maxlen"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Router from "@/plugins/router";
import md5 from "js-md5";
import UserCard from "@/components/UserCard";
export default {
  components: {
    UserCard
  },
  mounted() {
    var self = this;
    this.axios
      .get("http://10.105.242.94:23336/v1/user-list?page=1&page-size=20")
      .then(res => {
        console.log(res.data.users);
        self.data = [];
        for (var i = 0; i < 10; i++) {
          var now = [];
          if (i * 2 + 1 <= res.data.users.length) {
            now.push(res.data.users[i * 2]);
          }
          if (i * 2 + 2 <= res.data.users.length) {
            now.push(res.data.users[i * 2 + 1]);
          }
          if (now.length == 0) break;
          else self.data.push(now);
        }
        self.done = true;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      options: {},
      data: [[{}, {}]],
      maxlen: 1,
      search: ""
    };
  },
  methods: {}
};
</script>
