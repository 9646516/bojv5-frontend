<template>
  <v-card>
    <v-toolbar>
      <v-card-text class="headline">{{name}}</v-card-text>
      <v-toolbar-items>
        <v-btn text :to="'/contest/'+$route.params.id+'/dash'">Problems</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/submission'">My Submission</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/rank'">Ranking</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/clari'">Clarification</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      name: "123"
    };
  },
  computed: {},
  methods: {}
};
</script>