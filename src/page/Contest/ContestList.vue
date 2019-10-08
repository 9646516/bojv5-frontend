<template>
  <div>
    <v-btn large color="blue" v-if="this.$store.getters.IsStaff" to="/addcontest">
      <v-icon left>mdi-delete</v-icon>Add
    </v-btn>
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
          :to="{'name': 'Contest', params: {'id': item.id}}"
          :style="{'cursor': 'pointer'}"
          tag="tr"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.start_at }}</td>
          <td>{{ item.end_duration }}</td>
        </router-link>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="page" :length="max_page"></v-pagination>
    </div>
    <ContestCard
      v-for="i in desserts"
      v-bind:key="Number(i.id)"
      :name="i.title"
      :uid="i.id"
      :len="i.end_duration"
      :date="new Date(i.start_at)"
    />
  </div>
</template>
<script>
import ContestCard from "@/components/ContestCard";

export default {
  components: {
    ContestCard
  },
  watch: {
    page: {
      handler(val, oldVal) {
        this.axios
          .get("v1/contest-list?page=" + String(val) + "&page-size=20", {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          })
          .then(res => {
            console.log(res.data);
            this.desserts = res.data.contests;
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
      max_page: 1,
      headers: [
        { text: "UID", align: "left", sortable: false, value: "uid" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Author", sortable: false, value: "author" },
        { text: "Start", sortable: false, value: "start_at" },
        { text: "Duration", sortable: false, value: "end_duration" }
      ],
      desserts: []
    };
  },
  computed: {},
  methods: {}
};
</script>