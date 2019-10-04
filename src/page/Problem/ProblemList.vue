<template>
  <div>
    <v-btn large color="blue" v-if="this.$store.getters.IsStaff" to="/addproblem">
      <v-icon left>mdi-delete</v-icon>Add
    </v-btn>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      loading-text="Loading... Please wait"
      :items-per-page="20"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <router-link
          :to="{'name': 'Problem', params: {'id': item.id}}"
          :style="{'cursor': 'pointer'}"
          tag="tr"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
        </router-link>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="page" :length="max_page"></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    page: {
      handler(val, oldVal) {
        this.axios
          .get(
            "v1/problem-list?page=" +
              String(val) +
              "&page-size=20",
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.Token
              }
            }
          )
          .then(res => {
            console.log(res.data);
            this.desserts = res.data.problems;
          });
      },
      immediate: true
    }
  },
  created() {
    // var self=this;
    // this.axios
    //   .get("v1/user-count", {
    //     headers: {
    //       Authorization: "Bearer " + self.$store.getters.Token
    //     }
    //   })
    //   .then(res => {
    //     this.maxlen = Math.ceil(res.data.count / 20);
    //   });
  },
  data() {
    return {
      done: true,
      search: "",
      page: 1,
      max_page: 11,
      headers: [
        { text: "UID", align: "left", sortable: false, value: "uid" },
        { text: "Name", sortable: false, value: "name" }
      ],
      desserts: []
    };
  },
  computed: {},
  methods: {}
};
</script>