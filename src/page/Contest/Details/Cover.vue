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
            <div>Participator {{number}}</div>
            <div>Start Time {{start}}</div>
            <div>Contest Type {{type}}</div>
            <div>Number of Problemset {{problem}}</div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text class="headline">Global Announcement</v-card-text>
          <MdLoader :text="description" html></MdLoader>
        </v-card>
      </div>
      <div class="flex-col ml-10" style="width:25%">
        <TimeDash :endDate="start" :url="'/contest/'+String(this.$route.params.id)+'/dash'" />
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
  data() {
    return {
      name: "123",
      start: new Date("Thu Oct 11 2019 00:22:51 GMT+0800 (中国标准时间)"),
      number: 1,
      problem: 13,
      type: "ACM",
      description: "dfbnoiwerfniorn"
    };
  },
  computed: {},
  methods: {}
};
</script>