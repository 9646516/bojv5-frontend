<template>
  <v-card>
    <v-layout class="curtain" align-center justify-center>
      <div class="text-xs-center">
        <v-img
          src="@/assets/img/HomeLogo.jpg"
          aspect-ratio="1"
          max-width="500"
          max-height="500"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="blue"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-divider color="white" class="mt-4 mb-4" />
        <div class="headline">Welcome to</div>
        <div class="headline">Excited Online Judge</div>
        <div class="headline">欢迎使用Excited OJ</div>
      </div>
    </v-layout>
    <div class="headline">Announcement</div>
    <v-divider />
    <v-btn large color="blue" v-if="this.$store.getters.IsStaff" to="/addannouncement">
      <v-icon left>mdi-delete</v-icon>Add
    </v-btn>
    <v-progress-circular v-if="!done" indeterminate />
    <v-card v-for="i in data" :key="i.pk" class="mb-4">
      <router-link
        :to="{'name': 'Announcement', params: {'id': i.id}}"
        :style="{cursor: 'pointer'}"
        tag="div"
      >
        <v-container>
          <v-flex>
            <v-layout>
              <v-card-text class="headline">{{i.title}}</v-card-text>
              <v-icon class="mdi-18px" v-if="i.is_sticky">vertical_align_top</v-icon>
            </v-layout>
          </v-flex>
          <v-divider />
          <v-card-text>{{i.content.slice(0,Math.min(30,i.content.length))}}</v-card-text>
          <v-divider />
          <v-card-text>
            <div>Author:{{i.author}}</div>
            <div>Update:{{i.updated_at}}</div>
          </v-card-text>
        </v-container>
      </router-link>
    </v-card>
  </v-card>
</template>
<script>
export default {
  mounted() {
    this.axios
      .get(
        "v1/announcement-list?page=1&page-size=114514"
      )
      .then(r => {
        console.log(r);
        this.data = r.data.announcements;
        this.done = true;
        console.log(r);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      done: false,
      data: []
    };
  }
};
</script>
<style scoped>
.curtain {
  opacity: 0.8;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  height: 600px;
}
</style>