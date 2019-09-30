<template>
  <v-container>
    <v-card style="margin-bottom:2em;">
      <v-card-title class="headline">Details</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="time" clearable label="Time Limit" type="number" />
          </v-col>
          <v-col>
            <v-text-field v-model="mem" clearable label="Memory Limit" type="number" />
          </v-col>
        </v-row>
        <v-btn large color="primary" @click="save">
          <v-icon left>mdi-book</v-icon>Save
        </v-btn>
      </v-container>
    </v-card>
    <v-card style="margin-bottom:2em;">
      <v-card-title class="headline">Special Judge</v-card-title>
      <v-divider />
      <v-card-text
        style="color:red; font-size:larger;"
      >Attention!! If you do not Know What does SPJ Mean,Keep it as Default</v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="spj" clearable label="Special Judge Name" type="text" />
          </v-col>
          <v-col>
            <v-switch
              v-model="interactive"
              :label="`InterActive Problem: ${interactive.toString()}`"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card style="margin-bottom:2em;">
      <v-card-title class="headline">Upload TestCase</v-card-title>
      <v-divider />
      <v-container>
        <v-file-input
          v-model="files"
          counter
          chips
          label="File input"
          color="deep-purple accent-4"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
        />
        <v-btn large color="primary" @click="upload">
          <v-icon left>mdi-book</v-icon>Upload Files
        </v-btn>
      </v-container>
    </v-card>
    <v-card style="margin-bottom:2em;">
      <v-card-title class="headline">TestCases</v-card-title>
      <v-divider />
      <div v-for="i in has" :key="i.name">
        <v-row>
          <v-col>
            <v-card-text>{{i.name}}</v-card-text>
          </v-col>
          <v-col>
            <v-btn large color="error" @click="remove(i.name)">
              <v-icon left>mdi-delete</v-icon>Delete
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
      </div>
    </v-card>
  </v-container>
</template>
<script>
import MdLoader from "@/components/MdLoader";
import Store from "@/plugins/store.js";
export default {
  components: {
    MdLoader
  },
  data: () => ({
    time: 1,
    mem: 1,
    interactive: false,
    spj: "Default",
    files: [],
    has: []
  }),
  mounted() {
    this.update();
  },
  methods: {
    save() {},
    remove(name) {
      this.axios
        .delete(
          "http://10.105.242.94:23336/v1/problem/" +
            String(this.$route.params.id) +
            "/problemfs/rm?path=/test/" +
            String(name),
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.has = res.data.result;
          console.log(res.data.result);
          this.update();
        });
    },
    update() {
      this.axios
        .get(
          "http://10.105.242.94:23336/v1/problem/" +
            String(this.$route.params.id) +
            "/problemfs/ls?path=/test",
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.has = res.data.result;
          console.log(res.data.result);
        });
    },
    upload() {
      var formData = new FormData();
      this.files.forEach(function(file) {
        formData.append("upload", file, file.name);
      });
      this.axios
        .post(
          "http://10.105.242.94:23336/v1/problem/" +
            String(this.$route.params.id) +
            "/problemfs/writes/testcase",
          formData,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          console.log(res.data);
          this.update();
        });
    }
  }
};
</script>
<style>
</style>
