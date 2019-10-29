<template>
  <v-flex>
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Details</v-card-title>
      <v-card-text>
        code_length:{{data.code_length}}
        <v-divider />
        created_at:{{data.created_at}}
        <v-divider />
        id:{{data.id}}
        <v-divider />
        language:{{data.language}}
        <v-divider />
        problem_id:{{data.problem_id}}
        <v-divider />
        running_memory:{{data.running_memory}}
        <v-divider />
        running_time:{{data.running_time}}
        <v-divider />
        score:{{data.score}}
        <v-divider />
        shared:{{data.shared}}
        <v-divider />
        status:{{data.status}}
        <v-divider />
        user_id:{{data.user_id}}
        <v-divider />
      </v-card-text>
    </v-card>
    <v-card style="margin-block-end: 2em;">
      <v-card-title class="headline">Code</v-card-title>
      <v-divider />
      <CodeViewer :code="code"></CodeViewer>
    </v-card>
  </v-flex>
</template>

<script>
import CodeViewer from "@/components/CodeViewer";
export default {
  name: "Problem",
  components: {
    CodeViewer
  },
  mounted() {
    this.axios
      .get(
        "v1/contest/" +
          String(this.$route.params.id) +
          "/submission/" +
          String(this.$route.params.uid) +
          "/content",
        {
          headers: {
            Authorization: "Bearer " + this.$store.getters.Token
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.code = String(res.data);
      });

    this.axios
      .get(
        "v1/contest/" +
          String(this.$route.params.id) +
          "/submission/" +
          String(this.$route.params.uid),
        {
          headers: {
            Authorization: "Bearer " + this.$store.getters.Token
          }
        }
      )
      .then(res => {
        console.log(res.data.submission);
        this.data = res.data.submission;
      });
  },
  data() {
    return {
      done: false,
      data: {},
      code: ""
    };
  },
  methods: {}
};
</script>