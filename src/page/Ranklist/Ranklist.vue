<template>
  <v-container>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="data"
      loading-text="Loading... Please wait"
      :items-per-page="20"
      hide-default-footer
      disable-sort
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <router-link
          :to="{'name': 'Person', params: {'id': item.id}}"
          :style="{'cursor': 'pointer'}"
          tag="tr"
        >
          <td>{{ item.rank }}</td>
          <td class="text-xs-center">
            <v-avatar>
              <img :src="'https://secure.gravatar.com/avatar/' +item.emailmd5 +'?s=512'" />
            </v-avatar>
            <span
              class="ml-2 font-weight-medium"
              :style="'color:'+get_color(item.rank)"
            >{{ item.user_name }}</span>
          </td>
          <td>{{ item.solved_problems }}</td>
          <td>{{ item.tried_problems }}</td>
          <td>{{ item.motto }}</td>
        </router-link>
      </template>
    </v-data-table>
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
  components: {},
  watch: {
    page: {
      handler(val, oldVal) {
        var self = this;
        this.axios
          .get("v1/user-list?page=" + String(val) + "&page-size=20")
          .then(res => {
            self.data = res.data.users;
            for (var i in self.data) {
              self.data[i]["rank"] = Number(i) + Number(self.page - 1) * 20 + 1;
            }
            console.log(self.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      immediate: true
    }
  },
  created() {
    var self = this;
    this.axios
      .get("v1/user-count", {
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
      data: [],
      maxlen: 10,
      search: "",
      headers: [
        { text: "Rank", value: "rank" },
        { text: "User", value: "user_name" },
        { text: "Solved", value: "solved_problems" },
        { text: "Tried", value: "tried_problems" },
        { text: "Motto", value: "motto" }
      ]
    };
  },
  methods: {
    get_color(rank) {
      if (rank <= 20) {
        return "red";
      } else if (rank <= 40) {
        return "orange";
      } else if (rank <= 60) {
        return "purple";
      } else if (rank <= 80) {
        return "blue";
      } else {
        return "black";
      }
    }
  }
};
</script>

      