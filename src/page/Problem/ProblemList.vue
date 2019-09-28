<template>
  <div>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      loading-text="Loading... Please wait"
      :items-per-page="12"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <router-link
          :to="{name: 'Problem', params: {id: 'item.uid'}}"
          :style="{cursor: 'pointer',background:item.solved?  'peachpuff;':'none'}"
          tag="tr"
        >
          <td>{{ item.uid }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.time_limit }}</td>
          <td>{{ item.memory_limit }}</td>
          <td>{{ item.superadmin}}</td>
        </router-link>
      </template>
    </v-data-table>
    <v-btn large color="blue" v-if="this.$store.getters.IsStaff" to="/addproblem">
      <v-icon left>mdi-delete</v-icon>Add
    </v-btn>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="options.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Problems",
  mounted() {
    this.axios.defaults.withCredentials = true;
    var vm = this;
    vm.axios
      .get("http://10.105.242.94:23333/rinne/GetProblemList/")
      .then(response => {
        vm.desserts = response.data.problem;
        vm.options.totalItems = vm.desserts.length;
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      done: true,
      search: "",
      options: {},
      headers: [
        { text: "UID", align: "left", sortable: false, value: "uid" },
        { text: "Name", sortable: false, value: "name" },
        { text: "Time Limit", sortable: false, value: "time_limit" },
        { text: "Memory Limit", sortable: false, value: "memory_limit" },
        { text: "Owner", sortable: false, value: "superadmin" }
      ],
      desserts: [{}]
    };
  },
  computed: {
    pages() {
      if (this.options.rowsPerPage == null || this.options.totalItems == null)
        return 0;
      else return Math.ceil(this.options.totalItems / this.options.rowsPerPage);
    }
  },
  methods: {}
};
</script>