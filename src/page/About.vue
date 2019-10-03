<template>
  <div>
    <v-carousel style="margin-block-end: 2em;">
      <v-carousel-item>
        <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
          <v-col style="margin-left:4em;margin-top:4em;">
            <h1 class="headlines mb-2">About</h1>
            <v-divider />
            <h1 class="display-2 font-weight-thin mb-4">BOJv5</h1>
            <h4 class="headline mb-4">Supported By Vue, Rust and Golang</h4>
            <h4 class="headline mb-4">Developped And Maintained By BUPT ACM Team</h4>
            <h4 class="headline mb-4">Contact Admin: buptacm@qq.com</h4>
          </v-col>
        </v-parallax>
      </v-carousel-item>

      <v-carousel-item>
        <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
          <v-col style="margin-left:4em;margin-top:4em;">
            <h1 class="headlines mb-2">About</h1>
            <v-divider />
            <h1 class="display-2 font-weight-thin mb-4">BOJv5</h1>
            <h4 class="headline mb-4">Supported By Vue, Rust and Golang</h4>
            <h4 class="headline mb-4">Developped And Maintained By BUPT ACM Team</h4>
            <h4 class="headline mb-4">Contact Admin: buptacm@qq.com</h4>
          </v-col>
        </v-parallax>
      </v-carousel-item>
      
    </v-carousel>
    <v-card style="margin-block-end: 2em;">
      <v-card-text>
        <v-card-title class="headline">BOJv5 Developping Team</v-card-title>
        <v-divider />
        <v-row>
          <v-col align="middle" justify="middle">
            <Developer
              src="https://avatars2.githubusercontent.com/u/38785664?s=400"
              text="9646516"
              url="https://github.com/9646516"
            />
          </v-col>

          <v-col>
            <Developer
              src="https://avatars2.githubusercontent.com/u/35292584?s=400"
              text="Myriad-Dreamin"
              url="https://github.com/Myriad-Dreamin"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card style="margin-block-end: 2em;">
      <v-card-text>
        <v-card-title class="headline">Copyright 2019-2019 BUPT ACM Team.All Rights Reserved</v-card-title>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Developer from "@/components/Developer";
export default {
  components: {
    Developer
  },
  data: () => ({}),
  computed: {}
};
</script>