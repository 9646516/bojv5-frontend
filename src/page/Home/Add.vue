<template>
  <v-card>
    <v-container>
      <v-text-field v-model="title" clearable label="Title" type="text" />
      <MarkdownWriter ref="md" />
      <v-toolbar height="48" flat>
        <v-btn large color="primary" @click="submit">
          <v-icon left>mdi-target</v-icon>Submit
        </v-btn>
      </v-toolbar>
      <h2 style="color:red;">
        {{message}}
        <v-fade-transition>
          <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
        </v-fade-transition>
      </h2>
    </v-container>
  </v-card>
</template>
<script>
import Store from "@/plugins/store.js";
import MarkdownWriter from "@/components/MarkdownWriter";

export default {
  components: {
    MarkdownWriter
  },
  data: () => ({
    title: "",
    message: "",
    loading: false
  }),
  methods: {
    submit() {
      console.log(this.$refs);
      if (this.check()) {
        this.loading = true;
        this.message = "Waiting for it...";
        this.axios
          .post(
            "v1/announcement",
            {
              title: String(this.title),
              content: String(this.$refs.md.doc)
            },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.Token
              }
            }
          )
          .then(res => {
            this.loading = false;
            this.message = res.data;
          });
      }
    },
    check() {
      if (this.title == "") {
        this.message = "Title cannot be empty";
        return false;
      } else if (this.content == "") {
        this.message = "Content cannot be empty";
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style>
</style>
