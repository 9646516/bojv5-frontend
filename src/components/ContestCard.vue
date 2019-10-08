<template>
  <v-card :to="{'name': 'Contest', params: {'id': uid}}" style="width: 90%" class="mb-6">
    <v-row class="ml-6">
      <div class="flex-row">
        <div style="color:#ABABAB;">
          <div style="font-size:30px;">{{beta[date.getMonth()]}} {{date.getDay()}}</div>
          <div style="font-size:40px;">{{1900+date.getYear()}}</div>
        </div>
      </div>
      <div class="flex-row ml-12">
        <v-card-text class="text-left">
          <div style="font-size:40px;">{{name}}</div>
        </v-card-text>
        <v-card-text>len: {{len}}</v-card-text>
      </div>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    // year: {
    //   type: Number,
    //   default: 2019
    // },
    // mon: {
    //   type: Number,
    //   default: 1
    // },
    // day: {
    //   type: Number,
    //   default: 1
    // },
    date: {
      type: Date,
      default:null
    },
    name: {
      type: String,
      default: "rgergerg"
    },
    uid: {
      type: Number,
      default: 1
    },
    len: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    beta: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  }),
  methods: {
    go(e) {
      window.location.href = e;
    },
    get_color() {
      var idx = Math.round(Math.random() * 11);
      return this.color[idx];
    }
  }
};
</script>
<style scoped>
</style>