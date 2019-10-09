<template>
  <v-card
    :to="{'name': 'Contest', params: {'id': uid}}"
    style="width: 90%;"
    class="mb-6 animated fadeInLeft"
    @mouseenter="gao($event)"
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
      default: null
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
  methods: {
    go(e) {
      window.location.href = e;
    },
    gao(event) {
      console.log(event.target);
      console.log(event.target.classList);
      // event.target.classList.remove("fadeInLeft");
      // event.target.classList.add("bounce");
      // event.target.classList.add("infinite");
      // event.target.addEventListener(
      //   "animationend",
      //   function handleAnimationEnd() {
      //     event.target.classList.remove("infinite");
      //     event.target.classList.remove("bounce");
      //   }
      // );
    }
  }
};
</script>
<style scoped>
</style>