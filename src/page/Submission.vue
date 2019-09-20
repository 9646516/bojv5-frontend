<template>
  <v-flex>
    <v-progress-circular v-if="!done" indeterminate />
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Details</v-card-title>
      <v-card-text>
        create_time:{{data.create_time}}
        <v-divider />
        score:{{data.score}}
        <v-divider />
        pk:{{data.pk}}
        <v-divider />
        user:{{data.user}}
        <v-divider />
        status:{{data.status}}
        <v-divider />
        running_time:{{data.running_time}}
        <v-divider />
        running_memory:{{data.running_memory}}
        <v-divider />
        length:{{data.length}}
        <v-divider />
        language:{{data.language}}
        <v-divider />
        problem:{{data.problem}}
        <v-divider />
        info:{{data.info}}
        <v-divider />
      </v-card-text>
    </v-card>
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Code</v-card-title>
      <MdLoader v-if="done" :text="data.code_file" html></MdLoader>
    </v-card>
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
    this.axios.defaults.withCredentials = true;
    this.axios
      .get(
        "http://10.105.242.94:23333/rinne/GetSubmissionDetails/?index=" +
          this.$route.params.id
      )
      .then(res => {
        this.data = res.data;
        this.done = true;
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
      data: {}
    };
  },
  methods: {}
};
</script>