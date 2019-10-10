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
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="12"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <router-link
          :to="{'name': 'Submission', params: {'id': item.id}}"
          :style="{'cursor': 'pointer'}"
          tag="tr"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.problem_id }}</td>
          <td>{{ item.running_time }}</td>
          <td>{{ item.running_memory }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.user_id }}</td>
          <td>{{ item.language }}</td>
          <td>{{ item.created_at }}</td>
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      name: "123",
      headers: [
        { text: "UID", align: "left", sortable: false, value: "uid" },
        { text: "Problem", sortable: false, value: "problem" },
        { text: "Time", sortable: false, value: "time" },
        { text: "Memory", sortable: false, value: "memory" },
        { text: "Status", sortable: false, value: "status" },
        { text: "User", sortable: false, value: "user" },
        { text: "Lang", sortable: false, value: "language" },
        { text: "Submit Time", sortable: false, value: "submittime" }
      ],
      desserts: []
    };
  },
  computed: {},
  methods: {}
};
</script>