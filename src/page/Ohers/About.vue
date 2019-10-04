<template>
  <div>
    <v-carousel style="margin-block-end: 2em;">
      <v-carousel-item>
        <v-parallax dark src="@/assets/img/banner1.jpg">
          <v-col style="margin-left:4em;margin-top:4em;">
            <h1 class="headlines mb-2">About</h1>
            <v-divider />
            <h1 class="display-2 font-weight-thin mb-4">BOJv5</h1>
            <h4 class="headline mb-4">Developped And Maintained By BUPT ACM Team</h4>
            <h4 class="headline mb-4">Contact Admin: buptacm@qq.com</h4>
          </v-col>
        </v-parallax>
      </v-carousel-item>

      <v-carousel-item>
        <v-parallax dark src="@/assets/img/banner2.jpg">
          <v-layout>
            <Pie v-bind:data="data" name="Source statistics" :color="color" />
            <v-card-title style="font-size:250%">Supported By Vue, Rust and Golang</v-card-title>
          </v-layout>
        </v-parallax>
      </v-carousel-item>

      <v-carousel-item>
        <v-parallax dark src="@/assets/img/banner3.jpg">
          <v-card-text>
            <v-card-title style="font-size:250%">BOJv5 Developping Team</v-card-title>
            <v-divider />
            <v-row class="justify-center">
              <v-col>
                <Developer
                  :src="require('@/assets/img/9646516.jpg')"
                  text="9646516"
                  url="https://github.com/9646516"
                />
              </v-col>

              <v-col>
                <Developer
                  :src="require('@/assets/img/myriad.jpg')"
                  text="Myriad-Dreamin"
                  url="https://github.com/Myriad-Dreamin"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-parallax>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet color="blue" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div>
              <v-card-title class="headline">Copyright 2019-2019 BUPT ACM Team</v-card-title>
              <v-card-title class="headline">All Rights Reserved</v-card-title>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import Developer from "@/components/Developer";
import Pie from "@/components/Pie";

export default {
  components: {
    Developer,
    Pie
  },
  data: () => ({
    color: ["#3366ff", "#9900ff", "#669999", "#33cc33", "#ff33cc"],

    data: [
      {
        value: 7546,
        name: "Golang"
      },
      {
        value: 3907,
        name: "Vuejs"
      },
      {
        value: 642,
        name: "JavaScript"
      },
      {
        value: 866,
        name: "Rust"
      },
      {
        value: 214,
        name: "C"
      }
    ]
  }),
  computed: {}
};
</script>