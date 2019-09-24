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
          :to="{'name': 'Submission', params: {'id': item.pk}}"
          :style="{'cursor': 'pointer'}"
          tag="tr"
        >
          <td>{{ item.uid }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.owner }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.class }}</td>
          <td>{{ item.type }}</td>
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
      headers: [
        { text: "UID", align: "left", sortable: false, value: "uid" },
        { text: "Name", sortable: false, value: "name" },
        { text: "Owner", sortable: false, value: "owner" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Class", sortable: false, value: "class" },
        { text: "Type", sortable: false, value: "type" }
      ],
      desserts: [{}]
    };
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>