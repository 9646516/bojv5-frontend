<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      hide-actions
      :rows-per-page-items="text_per_page"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <router-link
          :to="{'name': 'Submission', params: {'id': props.item.pk}}"
          :style="{'cursor': 'pointer'}"
          tag="tr"
        >
          <td>{{ props.item.pk }}</td>
          <td>{{ props.item.problem }}</td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.language }}</td>
          <td>{{ props.item.user}}</td>
          <td>{{ props.item.create_time }}</td>
          <td>{{ props.item.running_memory}}</td>
          <td>{{ props.item.running_time}}</td>
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
  mounted() {},
  data() {
    return {
      done: true,
      search: "",
      page: 1,
      max_page: 1,
      text_per_page: [10],
      headers: [
        { text: "UID", align: "left", sortable: false, value: "pk" },
        { text: "Problem", sortable: false, value: "problem" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Lang", sortable: false, value: "language" },
        { text: "User", sortable: false, value: "user" },
        { text: "Submit Time", sortable: false, value: "create_time" },
        { text: "running_memory", sortable: false, value: "running_memory" },
        { text: "running_time", sortable: false, value: "running_time" }
      ],
      desserts: [{}]
    };
  },
  computed: {},
  methods: {},
  watch: {
    page: {
      handler(val, oldVal) {
        this.axios.defaults.withCredentials = true;
        this.axios
          .get(
            "http://10.105.242.94:23333/rinne/GetSubmissionList/?page=" +
              String(val)
          )
          .then(response => {
            this.desserts = response.data.data;
            this.max_page = response.data.len;
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      immediate: true
    }
  }
};
</script>