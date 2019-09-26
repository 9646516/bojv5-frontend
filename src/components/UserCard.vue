<template>
  <v-card
    style="margin-block-end: 2em;margin-block-right: 2em;"
    :to="{'name': 'Person', params: {'id': pk}}"
  >
    <v-row>
      <v-col>
        <v-img :src="src" height="250px" width="250px">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate :color="get_color()"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col>
        <v-card-text class="text-left">Nickname: {{nick_name}}</v-card-text>
        <v-card-text class="text-left">Solved: {{solved}}</v-card-text>
        <v-card-text class="text-left">Tried: {{tried}}</v-card-text>
        <v-card-text class="text-left">motto: {{motto}}</v-card-text>
        <v-card-text class="text-left">gender: {{gender}}</v-card-text>
        <v-card-text class="text-left">email: {{email}}</v-card-text>
        <v-card-text class="text-left">last_login: {{last_login}}</v-card-text>
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
    nick_name: {
      type: String,
      default: "1"
    },
    motto: {
      type: String,
      default: "1"
    },
    last_login: {
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
    },
    gender: {
      type: Number,
      default: 0
    },
    email: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    color: [
      "red",
      "pink",
      "purple",
      "indigo",
      "blue",
      "cyan",
      "teal",
      "green",
      "lime",
      "yellow darken-4",
      "amber",
      "orange"
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
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>