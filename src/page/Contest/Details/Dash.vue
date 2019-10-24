<template>
  <v-card>
    <v-toolbar>
      <v-card-text class="headline">{{name}}</v-card-text>
      <v-toolbar-items>
        <v-btn text :to="'/contest/'+$route.params.id+'/dash'">Problems</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/submission'">My Submission</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/clari'">Clarification</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/rank'">Ranking</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-divider/>
    <v-toolbar
      v-for="i in problems"
      v-bind:key="i.id"
      flat
      :style="'background:'+(my[i.id]==2?'#fff3e0':my[i.id]==1?'#b0ffb0':'none')"
    >
      <v-card-text>
        <router-link
          class="title"
          :to="'/contest/'+$route.params.id+'/problem/'+String(i.id)"
          style="text-decoration:none;color:black"
        >{{i.title}}</router-link>
      </v-card-text>
      <v-toolbar-items>
        <v-card-text>{{my[i.id]}}</v-card-text>
        <v-card-text>{{i.time_limit}}ms</v-card-text>
        <v-card-text>{{i.memory_limit}}KB</v-card-text>
        <v-card-text>{{i.id}}</v-card-text>
        <v-card-text>{{solved[i.id]}}/{{tried[i.id]}}</v-card-text>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  components: {},
  mounted() {
    this.axios
      .get("v1/contest/" + String(this.$route.params.id) + "/problem-list", {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Token
        }
      })
      .then(res => {
        console.log(res.data);
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

    this.axios
      .get("v1/contest/" + String(this.$route.params.id) + "/submission-list", {
        params: {
          page: 1,
          "page-size": 1111111111111111
        },
        headers: {
          Authorization: "Bearer " + this.$store.getters.Refresh_Token
        }
      })
      .then(res => {
        console.log(res);
        for (var _i of this.problems) {
          this.$set(this.tried, _i.id, 0);
          this.$set(this.solved, _i.id, 0);
          this.$set(this.my, _i.id, 0);
        }
        for (var i of res.data.submissions) {
          this.$set(this.tried, i.problem_id, this.tried[i.problem_id] + 1);
          if (i.status === 0) {
            this.$set(this.solved, i.problem_id, this.solved[i.problem_id] + 1);
          }
          if (i.user_id === this.$store.getters.uid) {
            if (i.status === 0) {
              this.$set(this.my, i.problem_id, 1);
            } else if (this.my[i.problem_id] === 0) {
              this.$set(this.my, i.problem_id, 2);
            }
          }
        }
        // for (var _ of this.problems) {
        //   console.log(_);
        // }
      });
  },
  data() {
    return {
      tried: {},
      solved: {},
      my: {},
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