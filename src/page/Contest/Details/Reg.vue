<template>
  <div>
    <v-btn large color="blue" v-if="this.$store.getters.IsStaff">
      <v-icon left>mdi-delete</v-icon>Add
    </v-btn>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      loading-text="Loading... Please wait"
      :items-per-page="20"
      hide-default-footer
      loading="true"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.nick_name }}</td>
          <td>{{ item.email }}</td>
        </tr>
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
      handler(val) {
        this.axios
          .get("v1/contest/" + String(this.$route.params.id) + "/user-list", {
            params: {
              "page-size": 20,
              page: val
            },
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          })
          .then(res => {
            console.log(res.data);
            this.desserts = res.data.users;
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
        { text: "UID", value: "id" },
        { text: "Name", value: "nick_name" },
        { text: "Email", value: "email" }
      ],
      desserts: []
    };
  },
  computed: {},
  methods: {}
};
</script>