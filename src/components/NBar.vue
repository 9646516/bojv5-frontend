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
      <v-dialog v-if="!this.$store.getters.isLogin" v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-layout>
              <v-list-item-action>
                <v-icon>mdi-rocket</v-icon>
              </v-list-item-action>
              <v-card-text>Login</v-card-text>
            </v-layout>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-container>
            <v-form>
              <v-text-field
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
                autocomplete="username"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                autocomplete="new-password"
              />
            </v-form>
            <v-flex sm12>
              <v-card-text>
                <router-link :to="{ name: 'Register' }">Register</router-link>
                <div style="color:red;">{{error}}</div>
              </v-card-text>
            </v-flex>
          </v-container>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
import router from "@/plugins/router.js";
export default {
  data() {
    return {
      dialog: false,
      width: 250,
      username: "",
      password: "",
      error: ""
    };
  },
  computed: {
    Active: function() {
      return this.contents.filter(function(x) {
        return (
          !(x.text == "Login" && Store.getters.isLogin) &&
          !(x.text == "Logout" && !Store.getters.isLogin) &&
          !(x.text == "Profile" && !Store.getters.isLogin) &&
          !(x.text == "Add" && !Store.getters.IsStaff)
        );
      });
    },
    contents: function() {
      return [
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
          text: "Profile",
          image: "mdi-delta",
          router: "/user/" + this.$store.getters.uid
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
        },
        {
          text: "Contest",
          image: "mdi-beta",
          router: "/contests"
        },
        {
          text: "Ranklist",
          image: "mdi-beta",
          router: "/ranklist"
        },
        {
          text: "AddUser",
          image: "mdi-github-circle",
          router: "/adduser"
        },
        {
          text: "Class",
          image: "mdi-github-circle",
          router: "/classlist"
        }
      ];
    }
  },

  mounted() {
    try {
      this.error = this.$route.params.text;
    } catch (e) {
      this.error = "";
    }
  },
  methods: {
    enlarge() {
      this.width = 250;
    },
    decay() {
      this.width = 70;
    },
    login() {
      if (this.check()) {
        var form =
          "user_name=" +
          escape(this.username) +
          "&password=" +
          escape(this.password);
        this.axios
          .post("http://10.105.242.94:23336/v1/user/login", form)
          .then(res => {
            if (res.data.code == 0) {
              Store.dispatch("initState", res.data).then(() => {
                router.push("/");
                this.dialog = false;
              });
            } else {
              this.error = "Wrong Password or Username";
            }
          });
      }
    },
    check() {
      if (this.username == "") {
        this.error = "Username cannot be empty";
        return false;
      } else if (this.password == "") {
        this.error = "Password cannot be empty";
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style scoped>
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
