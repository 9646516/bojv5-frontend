<template>
  <div>
    <v-row>
      <div class="flex-col" style="width:65%">
        <v-card class="mb-6">
          <v-card-text class="headline">Info</v-card-text>
          <v-card-text class="title">
            <div style="font-size:250%;font-weight:bord;">{{name}}</div>
          </v-card-text>
          <v-card-text class="title">
            <tr>
              <td style="width:25%">Participator</td>
              <td>
                {{number}}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      dark
                      v-on="on"
                      icon
                      :to="{'name': 'contest_reg', params: {'id': $route.params.id}}"
                    >
                      <v-icon>mdi-github-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>See Who are They</span>
                </v-tooltip>
              </td>
            </tr>
            <tr>
              <td style="width:25%">Start Time</td>
              <td>{{start}}</td>
            </tr>
            <tr>
              <td style="width:25%">End Time</td>
              <td>{{end}}</td>
            </tr>
            <tr>
              <td style="width:25%">Contest Type</td>
              <td>{{type}}</td>
            </tr>
            <tr>
              <td style="width:25%">Problemset</td>
              <td>{{problem}}</td>
            </tr>
            <tr>
              <td style="width:25%">Author</td>
              <td>{{author}}</td>
            </tr>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text class="headline">Global Announcement</v-card-text>
          <MdLoader :text="description" html></MdLoader>
        </v-card>
      </div>
      <div class="flex-col ml-10" style="width:25%">
        <TimeDash :start="start" :end="end" />
        <div align="center" justify="center" class="mt-6">
          <v-btn
            :disabled="!started"
            color="info"
            :to="'/contest/'+String(this.$route.params.id)+'/dash'"
          >Enter</v-btn>
        </div>
      </div>
    </v-row>
  </div>
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
      .get("v1/contest/" + String(this.$route.params.id), {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Refresh_Token
        }
      })
      .then(res => {
        console.log(res);
        this.author = res.data.author;
        this.start = new Date(res.data.start_at);
        this.end = new Date(res.data.end_at);
        this.description = res.data.description;
        this.name = res.data.name;
        this.type = res.data.contest_type;
      });
  },
  data() {
    return {
      name: "123",
      start: new Date("Sun Oct 13 2019 00:47:11 GMT+0800 (中国标准时间)"),
      end: new Date("Sun Oct 13 2019 00:47:11 GMT+0800 (中国标准时间)"),
      participator: [],
      problem: 13,
      type: "ACM",
      description: "dfbnoiwerfniorn",
      author: {},
      number: 1,
      headers: [{ text: "UID", value: "uid" }, { text: "Name", value: "rank" }]
    };
  },
  computed: {
    started() {
      return new Date() > this.start;
    }
  },
  methods: {}
};
</script>