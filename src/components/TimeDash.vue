<template>
  <v-card style="padding-bottom:15%">
    <v-card-text class="headline" style="text-align:center;">Before Contest</v-card-text>
    <div style="text-align:center;">
      <h2>{{showTimeLeft}}</h2>
    </div>
    <v-row align="center" justify="center" class="mt-6">
      <v-btn color="info" :disabled="!started" :to="url"></v-btn>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "timeCountDown",
  props: {
    endDate: Date,
    url: String
  },
  data() {
    return {
      timeLeft: 0,
      bundleIntervalEvent: ""
    };
  },
  computed: {
    showTimeLeft() {
      if (this.timeLeft <= 0) {
        this.$emit("handle-done", true);
        return "Started";
      } else {
        let day = Math.floor(this.timeLeft / 86400);
        let hour = Math.floor((this.timeLeft % 86400) / 3600);
        let min = Math.floor(((this.timeLeft % 86400) % 3600) / 60);
        let sec = Math.floor(((this.timeLeft % 86400) % 3600) % 60);
        return (
          (day > 0 ? day + "Days " : "") +
          (hour < 10 ? "0" : "") +
          hour +
          ": " +
          (min < 10 ? "0" : "") +
          min +
          ": " +
          (sec < 10 ? "0" : "") +
          sec
        );
      }
    },
    started() {
      return this.timeLeft <= 0;
    }
  },
  methods: {
    initSecondsLeft() {
      let currentDate = new Date();
      let toEndDate = this.endDate;
      if (toEndDate > currentDate) {
        this.timeLeft = Math.floor(
          (toEndDate.getTime() - currentDate.getTime()) / 1000
        );
      } else {
        this.timeLeft = 0;
      }
    },
    intervalEvent() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.bundleIntervalEvent);
      }
    }
  },
  created() {
    this.initSecondsLeft();
    this.bundleIntervalEvent = setInterval(this.intervalEvent, 1000);
  },
  beforeDestroy() {
    clearInterval(this.bundleIntervalEvent);
  }
};
</script>