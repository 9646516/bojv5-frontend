<template>
  <v-col cols="12" sm="6" md="3">
    model:{{model}}
    <v-autocomplete :label="label" v-model="model" :items="candidate" />
  </v-col>
</template>
<script>
export default {
//   watch: {
//     model: {
//       handler(val, oldVal) {
//         console.log(this.candidate);
//         if (val === "") this.candidate = [];
//         else {
//           this.axios
//             .get("v1/problem-list-title-like", {
//               params: {
//                 "page-size": 5,
//                 page: 1,
//                 title: val
//               },
//               headers: {
//                 Authorization: "Bearer " + this.$store.getters.Token
//               }
//             })
//             .then(res => {
//               this.candidate = res.data.problems;
//             });
//         }
//       },
//       immediate: false
//     }
//   },
  props: {
    label: {
      type: String,
      default: "123"
    }
  },
  data() {
    return {
      model: "aaa",
      candidate: []
    };
  }
};
</script>