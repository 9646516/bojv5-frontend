<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      loading-text="Loading... Please wait"
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
            "http://10.105.242.94:23336/v1/submission-list?page=" +
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
            this.desserts = res.data.submissions;
          });
      },
      immediate: true
    }
  },
  created() {
    // var self=this;
    // this.axios
    //   .get("http://10.105.242.94:23336/v1/user-count", {
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
        { text: "Problem", sortable: false, value: "problem" },
        { text: "Time", sortable: false, value: "time" },
        { text: "Memory", sortable: false, value: "memory" },
        { text: "Status", sortable: false, value: "status" },
        { text: "User", sortable: false, value: "user" },
        { text: "Lang", sortable: false, value: "language" },
        { text: "Submit Time", sortable: false, value: "submittime" },
      ],
      desserts: []
    };
  },
  computed: {},
  methods: {}
};
</script>