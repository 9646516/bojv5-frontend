<template>
  <v-card style="padding-bottom:15%">
    <v-card-text class="headline" style="text-align:center;">Contest Status</v-card-text>
    <div style="text-align:center;">
      <h2>{{showStatus}}</h2>
      <h2>{{showTimeLeft}}</h2>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "timeCountDown",
  props: {
    start: Date,
    end: Date
  },
  data() {
    return {
      time: new Date(),
      bundleIntervalEvent: ""
    };
  },
  computed: {
    showStatus() {
      if (this.time >= this.end) {
        return "Ended";
      } else if (this.time <= this.end && this.time >= this.start) {
        return "Running";
      } else {
        return "Before";
      }
    },
    showTimeLeft() {
      if (this.time >= this.end) {
        return "";
      } else if (this.time <= this.end && this.time >= this.start) {
        let timeLeft = (this.end.getTime() - this.time.getTime()) / 1000;
        let day = Math.floor(timeLeft / 86400);
        let hour = Math.floor((timeLeft % 86400) / 3600);
        let min = Math.floor(((timeLeft % 86400) % 3600) / 60);
        let sec = Math.floor(((timeLeft % 86400) % 3600) % 60);
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
      } else {
        let timeLeft = (this.start.getTime() - this.time.getTime()) / 1000;
        let day = Math.floor(timeLeft / 86400);
        let hour = Math.floor((timeLeft % 86400) / 3600);
        let min = Math.floor(((timeLeft % 86400) % 3600) / 60);
        let sec = Math.floor(((timeLeft % 86400) % 3600) % 60);
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
    intervalEvent() {
      let t = new Date();
      if (this.end < t) {
        clearInterval(this.bundleIntervalEvent);
      } else {
        this.time = t;
      }
    }
  },
  created() {
    this.bundleIntervalEvent = setInterval(this.intervalEvent, 1000);
  },
  beforeDestroy() {
    clearInterval(this.bundleIntervalEvent);
  }
};
</script>