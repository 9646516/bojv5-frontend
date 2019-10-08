<template>
  <v-card>
    <v-container>
      <v-text-field v-model="title" clearable label="Title" type="text" />
      <v-textarea v-model="content" v-if="!preview" auto-grow clearable rows="10" label="Content" />
      <MdLoader v-if="preview" :text="content"></MdLoader>
      <v-toolbar height="48">
        <v-col>
          <v-switch v-model="preview" :label="`Preview: ${preview.toString()}`"></v-switch>
        </v-col>
        <v-col>
          <v-btn large color="primary" @click="submit">
            <v-icon left>mdi-target</v-icon>Submit
          </v-btn>
        </v-col>
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
import MdLoader from "@/components/MdLoader";
import Store from "@/plugins/store.js";
export default {
  components: {
    MdLoader
  },
  data: () => ({
    title: "",
    content: "",
    message: "",
    loading: false,
    preview: false
  }),
  mounted() {
    this.axios
      .get("v1/announcement/" + String(this.$route.params.id))
      .then(res => {
        console.log(res);
        this.title = res.data.announcement.title;
        this.content = res.data.announcement.content;
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
  methods: {
    submit() {
      if (this.check()) {
        this.loading = true;
        this.message = "Waiting for it...";
        this.axios
          .put(
            "v1/announcement/" + String(this.$route.params.id),
            {
              title: String(this.title),
              content: String(this.content)
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
