<template>
  <v-flex>
    <v-progress-circular v-if="!done" indeterminate />
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Details</v-card-title>
      <v-card-text>
        id:{{data.id}}
        <v-divider />
        title:{{data.title}}
        <v-divider />
        is_spj:{{data.is_spj}}
        <v-divider />
        time_limit:{{data.time_limit}}
        <v-divider />
        memory_limit:{{data.memory_limit}}
        <v-divider />
        code_length_limit:{{data.code_length_limit}}
        <v-divider />
        create_at:{{data.create_at}}
        <v-divider />
        delete_at:{{data.delete_at}}
        <v-divider />
        author:{{data.author}}
      </v-card-text>
    </v-card>
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Description</v-card-title>
      <MdLoader v-if="done" :text="data.description" html></MdLoader>
    </v-card>

    <v-btn
      large
      color="primary"
      v-if="this.$store.getters.IsStaff"
      :to="'/editproblem/'+this.$route.params.id"
    >
      <v-icon left>mdi-book</v-icon>Edit
    </v-btn>
    <v-btn
      large
      color="primary"
      v-if="this.$store.getters.IsStaff"
      :to="'/files/'+this.$route.params.id"
    >
      <v-icon left>mdi-book</v-icon>Change Test Case
    </v-btn>
    <v-bottom-sheet v-model="sheet" v-if="this.$store.getters.IsStaff">
      <template v-slot:activator="{ on }">
        <v-btn color="red" large v-on="on">
          <v-icon left>mdi-delete</v-icon>Delete
        </v-btn>
      </template>
      <v-sheet class="text-center" height="200px">
        <v-row align="center" justify="center">
          <v-card-title class="text-center">Sure to Delete This Problem?</v-card-title>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn class="mt-6" flat color="red" @click="Delete">Yes</v-btn>
          <v-btn class="mt-6" flat color="blue" @click="sheet=!sheet">No</v-btn>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
    <v-divider />
    <CodeEditor ref="edit" />
    <v-row>
      <v-col>
        <v-btn large color="primary" @click="submit">
          <v-icon left>mdi-delete</v-icon>Submit
        </v-btn>
      </v-col>
      <v-col>
        <v-switch v-model="shared" :label="`Shared Your Solution: ${shared.toString()}`"></v-switch>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
import MdLoader from "@/components/MdLoader";
import Router from "@/plugins/router";
import CodeEditor from "@/components/CodeEditor";

export default {
  name: "Problem",
  components: {
    MdLoader,
    CodeEditor
  },
  mounted() {
    this.axios
      .get(
        "v1/problem/" +
          String(this.$route.params.id) +
          "/",
        {
          headers: {
            Authorization: "Bearer " + this.$store.getters.Token
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.data = res.data.problem;
        this.done = 1;
      });
  },
  data() {
    return {
      done: false,
      data: {},
      sheet: false,
      shared: false
    };
  },
  methods: {
    submit() {
      console.log(this.$refs.edit.code);
      console.log(this.$refs.edit.SelMode.abbr);
      this.axios
        .post(
          "v1/problem/" +
            String(this.$route.params.id) +
            "/submission/",
          {
            language: this.$refs.edit.SelMode.idx,
            code: this.$refs.edit.code,
            info: "",
            shared: this.shared ? 1 : 0
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          if (res.data.code == 0) {
            Router.push("/status");
          } else {
            alert("Failed");
          }
        });
    },
    Delete() {
      this.axios
        .delete(
          "v1/problem/" +
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