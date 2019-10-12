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
      <v-toolbar v-for="i in problems" v-bind:key="i.uid">
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
            :to="'/contest/'+$route.params.id+'/problem/'+String(i.uid)"
            style="text-decoration:none;color:black"
          >{{i.title}}</router-link>
        </v-card-text>
        <v-toolbar-items>
          <v-card-text>Time:{{i.time}}ms</v-card-text>

          <v-card-text>Memory:{{i.mem}}Mbytes</v-card-text>
          <v-card-text>{{i.uid}}</v-card-text>
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
  data() {
    return {
      color: ["green", "orange"],
      hint: ["Solved", "Tried"],
      name: "123",
      start: new Date("Sun Oct 13 2019 00:47:11 GMT+0800 (中国标准时间)"),
      end: new Date("Sun Oct 13 2019 10:47:11 GMT+0800 (中国标准时间)"),
      problems: [
        {
          title: "1",
          time: "1",
          mem: 1,
          uid: 1,
          tried: 1,
          solved: 2,
          status: 0
        },
        {
          title: "2",
          time: "1",
          mem: 1,
          uid: 2,
          tried: 1,
          solved: 2,
          status: 1
        },
        {
          title: "3",
          time: "1",
          mem: 1,
          uid: 3,
          tried: 1,
          solved: 2,
          status: 2
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>