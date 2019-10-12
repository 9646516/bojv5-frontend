<template>
  <v-card>
    <v-toolbar>
      <v-card-text class="headline">{{name}}</v-card-text>
      <v-toolbar-items>
        <v-btn text :to="'/contest/'+$route.params.id+'/dash'">Problems</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/submission'">My Submission</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/clari'">Clarification</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/rank'">Ranking</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table disable-sort :headers="headers" :items="data" hide-default-footer></v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      name: "123",
      headers: [
        { text: "Rank", value: "Rank" },
        { text: "Name", value: "Name" },
        { text: "Score", value: "Score" },
        { text: "Penalty", value: "Penalty" },
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        { text: "C", value: "C" },
        { text: "D", value: "D" }
      ],
      data: [{ Name: "234", A: "A", B: "B", C: "C", D: "D" }]
    };
  },
  computed: {},
  methods: {}
};
</script>