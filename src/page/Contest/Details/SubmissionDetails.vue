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
import Router from "@/plugins/router";
export default {
  name: "Problem",
  components: {
    CodeViewer
  },
  mounted() {},
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