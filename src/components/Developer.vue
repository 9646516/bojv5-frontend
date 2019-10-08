<template>
  <v-hover v-slot:default="{ hover }">
    <v-img v-bind:src="src" height="250px" width="250px" aspect-ratio="1">
      <v-expand-transition>
        <div
          v-if="hover"
          class="d-flex transition-fast-in-fast-out lighten-1 v-card--reveal display-3 white--text"
          style="height: 100%;background-image: -webkit-linear-gradient(top,rgba(38,50,56,0.6) 0%,rgba(38,50,56,1) 100%);"
        >
          <v-row >
            <div class="headline white--text text-left">{{ text }}</div>
          </v-row>
        <v-row class="fill-height ma-0" align="center" justify="center">
            <v-btn
              :class="{ 'show-btns': hover }"
              color="rgba(255, 255, 255, 0)"
              icon
              @click="go(url)"
            >
              <v-icon>mdi-github-circle</v-icon>
            </v-btn>
          </v-row>
        </div>
      </v-expand-transition>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="red"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-hover>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    }
  },
  data: () => ({}),
  methods: {
    go(e) {
      window.location.href = e;
    }
  }
};
</script>
<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>