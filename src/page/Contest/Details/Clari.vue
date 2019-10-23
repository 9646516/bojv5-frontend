<template>
  <v-row>
    <div class="flex-col" style="width:70%">
      <v-toolbar>
        <v-card-text class="headline">{{name}}</v-card-text>
        <v-toolbar-items>
          <v-btn text :to="'/contest/'+$route.params.id+'/dash'">Problems</v-btn>
          <v-btn text :to="'/contest/'+$route.params.id+'/submission'">My Submission</v-btn>
          <v-btn text :to="'/contest/'+$route.params.id+'/clari'">Clarification</v-btn>
          <v-btn text :to="'/contest/'+$route.params.id+'/rank'">Ranking</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div class="flex-col ml-4" style="width:25%">
      <TimeDash :start="start" :end="end" />
    </div>
  </v-row>
</template>
<script>
import TimeDash from "@/components/TimeDash";

export default {
  components: {
    TimeDash
  },
  mounted() {
    this.axios
      .get("v1/contest/" + String(this.$route.params.id), {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Refresh_Token
        }
      })
      .then(res => {
        this.name = res.data.name;
      });
  },
  data() {
    return {
      start: new Date("Sun Oct 13 2019 00:47:11 GMT+0800 (中国标准时间)"),
      end: new Date("Sun Oct 13 2019 10:47:11 GMT+0800 (中国标准时间)"),
      name: "123"
    };
  },
  computed: {},
  methods: {}
};
</script>