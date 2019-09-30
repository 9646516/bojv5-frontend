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
      <v-pagination v-model="page" :length="maxlen"></v-pagination>
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
  watch: {
    page: {
      handler(val, oldVal) {
        var self = this;
        this.axios
          .get(
            "http://10.105.242.94:23336/v1/user-list?page=" +
              String(val) +
              "&page-size=20"
          )
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
      immediate: true
    }
  },
  created() {
    var self=this;
    this.axios
      .get("http://10.105.242.94:23336/v1/user-count", {
        headers: {
          Authorization: "Bearer " + self.$store.getters.Token
        }
      })
      .then(res => {
        this.maxlen = Math.ceil(res.data.count / 20);
      });
  },
  data() {
    return {
      page: 1,
      data: [[{}, {}]],
      maxlen: 10,
      search: ""
    };
  },
  methods: {}
};
</script>
