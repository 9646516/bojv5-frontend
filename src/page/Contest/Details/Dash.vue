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
      <v-toolbar v-for="i in problems" v-bind:key="i.id">
        <div style="width:200px">
          <v-chip
            v-if="i.status!==2"
            class="ma-2 text-center"
            :color="color[i.status]"
            text-color="white"
          >{{hint[i.status]}}</v-chip>
        </div>
        <v-card-text>
          <router-link
            class="title"
            :to="'/contest/'+$route.params.id+'/problem/'+String(i.id)"
            style="text-decoration:none;color:black"
          >{{i.title}}</router-link>
        </v-card-text>
        <v-toolbar-items>
          <v-card-text>{{i.time_limit}}ms</v-card-text>
          <v-card-text>{{i.memory_limit}}KB</v-card-text>
          <v-card-text>{{i.tried}}/{{i.solved}}</v-card-text>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div class="flex-col ml-4" style="width:25%">
      <TimeDash :start="start" :end="end" />
    </div>
  </v-row>
</template>
<script>
import MdLoader from "@/components/MdLoader";
import TimeDash from "@/components/TimeDash";

export default {
  components: {
    MdLoader,
    TimeDash
  },
  mounted() {
    this.axios
      .get("v1/contest/" + String(this.$route.params.id) + "/problem-list", {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Token
        }
      })
      .then(res => {
        this.problems = res.data;
      });

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
      color: ["green", "orange"],
      hint: ["Solved", "Tried"],
      name: "123",
      start: new Date("Sun Oct 13 2019 00:47:11 GMT+0800 (中国标准时间)"),
      end: new Date("Sun Oct 13 2019 10:47:11 GMT+0800 (中国标准时间)"),
      problems: []
    };
  },
  computed: {},
  methods: {}
};
</script>