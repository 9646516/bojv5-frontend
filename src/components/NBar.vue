<template>
  <v-navigation-drawer
    :width="width"
    style=" background: rgba(255, 255, 255, 0.9);"
    enable-resize-watcher
    app
  >
    <v-toolbar flat class="primary lighten-3">
        <v-avatar>
          <img v-bind:src="this.$store.getters.gravatar(512)" @click.stop="enlarge" />
        </v-avatar>
        <v-card-text>{{this.$store.getters.username}}</v-card-text>
        <v-btn icon text @click.stop="decay">
          <v-icon>mdi-windows</v-icon>
        </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item v-for="i in Active" :key="i.text" :to="i.router">
        <v-layout>
          <v-list-item-action>
            <v-icon>{{i.image}}</v-icon>
          </v-list-item-action>
            <v-card-text>{{i.text}}</v-card-text>
        </v-layout>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>




<script>
import Store from "@/plugins/store.js";
export default {
  data() {
    return {
      width: 250,
      contents: [
        {
          text: "Login",
          image: "mdi-rocket",
          router: "/login"
        },
        {
          text: "Logout",
          image: "mdi-home",
          router: "/logout"
        },
        {
          text: "Home",
          image: "mdi-spa",
          router: "/"
        },
        {
          text: "Setting",
          image: "mdi-delta",
          router: "/setting"
        },
        {
          text: "Problem",
          image: "mdi-coffin",
          router: "/problems"
        },
        {
          text: "About",
          image: "mdi-alpha",
          router: "/about"
        },
        {
          text: "Status",
          image: "mdi-beta",
          router: "/status"
        },
        {
          text: "Add",
          image: "mdi-beta",
          router: "/add"
        }
      ]
    };
  },
  methods: {
    enlarge() {
      this.width = 250;
    },
    decay() {
      this.width = 70;
    }
  },
  computed: {
    Active: function() {
      return this.contents.filter(function(x) {
        return (
          !(x.text == "Login" && Store.getters.isLogin) &&
          !(x.text == "Logout" && !Store.getters.isLogin) &&
          !(x.text == "Setting" && !Store.getters.isLogin) &&
          !(x.text == "Add" && !Store.getters.IsStaff)
        );
      });
    }
  }
};
</script>
<style>
html,
*,
:after,
:before {
  box-sizing: border-box;
}
button {
  border-style: none;
}
* {
  font-family: "Fira Code", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
