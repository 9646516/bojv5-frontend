<template>
  <v-flex>
    <v-progress-circular v-if="!done" indeterminate />
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Details</v-card-title>
      <v-card-text>
        is_sticky:{{data.is_sticky}}
        <v-divider />
        update_time:{{data.updated_time}}
        <v-divider />
        author:{{data.author}}
        <v-divider />
        last_update_user:{{data.last_update_user}}
        <v-divider />
        created_at:{{data.created_at}}
        <v-divider />
        id:{{data.id}}
      </v-card-text>
    </v-card>
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">{{data.title}}</v-card-title>
      <v-divider />
      <MdLoader v-if="done" :text="data.content" html></MdLoader>
    </v-card>
    <v-btn
      large
      color="primary"
      v-if="this.$store.getters.IsStaff"
      :to="'/editannouncement/'+String(this.$route.params.id)"
    >
      <v-icon left>mdi-book</v-icon>Edit
    </v-btn>

    <v-bottom-sheet v-model="sheet" v-if="this.$store.getters.IsStaff">
      <template v-slot:activator="{ on }">
        <v-btn color="red" large v-on="on">
          <v-icon left>mdi-delete</v-icon>Delete
        </v-btn>
      </template>
      <v-sheet class="text-center" height="200px">
        <v-row align="center" justify="center">
          <v-card-title class="text-center">Sure to Delete This Announcement?</v-card-title>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn class="mt-6" flat color="red" @click="Delete">Yes</v-btn>
          <v-btn class="mt-6" flat color="blue" @click="sheet=!sheet">No</v-btn>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
    <v-divider />
  </v-flex>
</template>

<script>
import MdLoader from "@/components/MdLoader";
import Router from "@/plugins/router";
export default {
  name: "Problem",
  components: {
    MdLoader
  },
  mounted() {
    this.axios
      .get(
        "v1/announcement/" +
          String(this.$route.params.id) +
          "/"
      )
      .then(res => {
        console.log(res);
        this.data = res.data.announcement;
        this.done = true;
        if (res.data.code != 0) {
          Router.push({
            name: "Error",
            params: { text: "404 Not Found" }
          });
        }
      })
      .catch(res => {
        Router.push({
          name: "Error",
          params: { text: res }
        });
      });
  },
  data() {
    return {
      done: false,
      data: {},
      sheet: false
    };
  },
  methods: {
    edit() {},
    Delete() {
      this.axios
        .delete(
          "v1/announcement/" +
            String(this.$route.params.id) +
            "/",
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          if (res.data.code == 0) {
            Router.push("/");
          } else {
            alert("Failed");
          }
        });
    }
  }
};
</script>