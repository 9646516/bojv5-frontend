<template>
  <v-card>
    <v-container>
      <v-text-field v-model="title" clearable label="Title" type="text" />
      <v-text-field v-model="owner" clearable label="Owner" type="text" />
      <v-textarea
        v-model="content"
        v-if="!preview"
        auto-grow
        clearable
        rows="10"
        label="Description"
      />
      <MdLoader v-if="preview" :text="content"></MdLoader>
      <v-toolbar height="48" flat>
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
    owner: "",
    message: "",
    loading: false,
    preview: false
  }),
  mounted() {
    this.axios
      .get(
        "http://10.105.242.94:23336/v1/sugar/class/group/" +
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
        this.title = res.data.name;
        this.content = res.data.description;
        this.owner = res.data.owner.username;
      });
  },
  methods: {
    submit() {
      if (this.check()) {
        this.loading = true;
        this.message = "Waiting for it...";
        this.axios
          .put(
            "http://10.105.242.94:23336/v1/sugar/class/group/" +
              String(this.$route.params.id) +
              "/",
            {
              name: String(this.title),
              description: String(this.content),
              owner_id: String(this.owner)
            },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.Token
              }
            }
          )
          .then(res => {
            console.log(res);
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
