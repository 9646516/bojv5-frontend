<template>
  <v-hover v-slot:default="{ hover }">
    <v-img :src="src" height="250px" width="250px">
      <v-expand-transition>
        <div
          v-if="hover"
          class="d-flex transition-fast-in-fast-out blue lighten-1 v-card--reveal display-3 white--text"
          style="height: 100%;"
        >
          <v-card-text class="headline white--text text-left">{{ text }}</v-card-text>
          <v-btn
            :class="{ 'show-btns': hover }"
            color="rgba(255, 255, 255, 0)"
            icon
            @click="go(url)"
          >
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
        </div>
      </v-expand-transition>
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