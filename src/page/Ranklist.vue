<template>
  <v-container>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-row v-for="j in data" :key="j">
      <v-col v-for="i in j" :key="i.pk" :offset="i.pk==j[0].pk?0:5">
        <UserCard
          :src="'https://secure.gravatar.com/avatar/' +i.emailmd5 +'?s=512'"
          :pk="i.pk"
          :nickname="i.nickname"
          :solved="i.solved"
          :tried="i.tried"
        />
      </v-col>
    </v-row>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="options.page" :length="maxlen"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Router from "@/plugins/router";
import md5 from "js-md5";
import UserCard from "@/components/UserCard";
export default {
  components: {
    UserCard
  },
  created() {
    this.options.page = 1;
    var jaren = {
      emailmd5: md5("zyq855@gmail.com".toLowerCase()),
      pk: 1,
      nickname: "zyq855",
      solved: 1,
      tried: 233
    };
    this.data = [];
    for (var i = 0; i < 10; i++) {
      this.data.push([jaren, jaren]);
    }
    console.log(this.data);
  },
  data() {
    return {
      options: {},
      data: [[{}, {}]],
      maxlen: 1,
      search: ""
    };
  },
  methods: {}
};
</script>