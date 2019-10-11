<template>
  <v-card
    :to="{'name': 'contest_cover', params: {'id': uid}}"
    style="width: 90%;"
    class="mb-6 animated fadeInLeft"
    ref="card"
  >
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
        <v-card-text>Len: {{len}} Author: {{author}}</v-card-text>
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
      default: () => new Date()
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
    },
    author: {
      type: String,
      default: "jwbi"
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
  mounted() {},
  methods: {
    go(e) {
      window.location.href = e;
    },
    // gao() {
    //   this.$refs.card.$el.classList.remove("animated", "fadeInLeft");
    //   this.$refs.card.$el.classList.add("animated", "bounce");
    // },
    // gao2() {
    //   this.$refs.card.$el.classList.remove("animated", "bounce");
    // }
  }
};
</script>
<style scoped>
</style>