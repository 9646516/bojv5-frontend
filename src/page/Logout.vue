<template>
  <v-layout />
</template>
<script>
import Store from "@/plugins/store.js";
import router from "@/plugins/router.js";
export default {
  mounted() {
    var d = new Date(0).toGMTString();
    window.document.cookie = "csrftoken=0;path=/;expires=" + d;
    this.axios.get("http://10.105.242.94:23333/rinne/Logout/").then(res => {
      console.log(res);
    });
    Store.dispatch("logout").then(router.push("home"));
  }
};
</script>
