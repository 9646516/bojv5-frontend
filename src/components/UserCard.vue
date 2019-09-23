<template>
  <v-card
    style="margin-block-end: 2em;margin-block-right: 2em;"
    :to="{'name': 'Person', params: {'id': pk}}"
  >
    <v-row>
      <v-col>
        <v-img :src="src" height="250px" width="250px"></v-img>
      </v-col>
      <v-col>
        <v-card-text class="text-left">Nickname: {{nickname}}</v-card-text>
        <v-card-text class="text-left">Solved: {{solved}}</v-card-text>
        <v-card-text class="text-left">Tried: {{tried}}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: "https://avatars3.githubusercontent.com/u/38785664?s=460&v=4"
    },
    pk: {
      type: Number,
      default: 0
    },
    nickname: {
      type: String,
      default: "1"
    },
    solved: {
      type: Number,
      default: 0
    },
    tried: {
      type: Number,
      default: 0
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