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
    Store.dispatch("logout").then(router.push("/"));
  }
};
</script>
