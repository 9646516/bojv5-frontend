<template>
  <v-container>
    <v-toolbar light>
      <v-tabs v-model="tabs" centered>
        <v-tab v-for="n in 5" :key="n">{{TabList[n]}}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-container>
          <v-card style="margin-block-end: 1em;">
            <v-card-text class="text-center headline">{{data.name}}</v-card-text>
            <v-progress-linear color="light-blue" height="10" :value="calc_time" striped></v-progress-linear>
            <v-card-text>
              begin time:{{data.begin}}
              <v-divider />
              end time:{{data.end}}
              <v-divider />
              Length:{{data.length}}
              <v-divider />
              Status:{{status}}
              <v-divider />
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-title>Info</v-card-title>
            <v-divider />
            <MdLoader :text="info" html></MdLoader>
          </v-card>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-card max-width="1000" class="mx-auto">
            <v-list subheader>
              <v-list-item v-for="item in items" :key="item.title">
                <v-list-item-icon>
                  <v-icon :color="item.solved ? 'deep-purple accent-4' : 'grey'">mdi-shield-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="text-right">
                  <v-list-item-title>time 1s</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="text-right">
                  <v-list-item-title>memory 1mb</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content class="text-right">
                  <v-list-item-title>123/123</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-layout align="center">
            <v-col class="d-flex" sm="3">
              <v-select :items="items2" label="Problem"></v-select>
            </v-col>
            <v-col class="d-flex" sm="3">
              <v-select :items="items2" label="Status"></v-select>
            </v-col>
            <v-col class="d-flex" sm="3">
              <v-select :items="items2" label="Language"></v-select>
            </v-col>
          </v-layout>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>a</v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>a</v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import Router from "@/plugins/router";
import Store from "@/plugins/store.js";
import MdLoader from "@/components/MdLoader";
export default {
  mounted() {
    this.data.name = "q23";
    this.data.begin = "q23";
    this.data.end = "q23";
  },
  components: {
    MdLoader
  },
  data: () => ({
    info: "# aduisfbud",
    tabs: null,
    TabList: [
      "",
      "Information",
      "Probelm",
      "My Submissions",
      "Discuss",
      "Standing"
    ],
    data: {},
    items: [
      {
        solved: true,
        title: "Jason Oner",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      },
      {
        solved: true,
        title: "Ranee Carlson",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
      },
      {
        title: "Cindy Baker",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
      },
      {
        title: "Ali Connors",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
      }
    ],
    items2: ["Foo", "Bar", "Fizz", "Buzz"]
  }),

  methods: {},
  computed: {
    calc_time() {
      return 1;
    }
  }
};
</script>
