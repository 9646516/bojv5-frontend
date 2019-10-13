<template>
  <v-container>
    <v-card style="margin-bottom:2em;">
      <v-card-title class="headline">Special Judge</v-card-title>
      <v-divider />
      <v-card-text
        style="color:red; font-size:larger;"
      >Attention!! If you do not Know What does SPJ Mean,Keep it as Default</v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="judge_type"
              :items="judge_list"
              item-text="abbr"
              item-value="status"
              label="Select Judge Type"
              return-object
            />
          </v-col>
          <v-col>
            <v-select v-model="type" :items="type_list" label="Select Contest Type" />
          </v-col>
        </v-row>
        <v-file-input
          v-if="judge_type.state!==0"
          v-model="spj_source"
          counter
          chips
          label="File input"
          color="deep-purple accent-4"
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          :show-size="1000"
        />
        <v-card style="margin-bottom:2em;">
          <v-card-title class="headline">SPJ</v-card-title>
          <v-divider />
          <div v-for="j in spj_has" :key="j.name">
            <v-row>
              <v-col>
                <v-card-text>{{j.name}}</v-card-text>
              </v-col>
              <v-col>
                <v-btn large color="error" @click="remove('/spj/'+j.name)">
                  <v-icon left>mdi-delete</v-icon>Delete
                </v-btn>
              </v-col>
            </v-row>
            <v-divider />
          </div>
        </v-card>
        <v-btn
          large
          color="primary"
          @click="upload([spj_source],'/spj/');spj='/spj/'+spj_source.name;spj_source=[];save();"
          v-if="judge_type.state!==0"
          :disabled="spj_source.length===0"
        >
          <v-icon left>mdi-book</v-icon>Upload Files
        </v-btn>
        <v-btn large color="primary" @click="save">
          <v-icon left>mdi-book</v-icon>Save
        </v-btn>
      </v-container>
    </v-card>

    <v-card>
      <v-container>
        <v-container>
          <v-toolbar light>
            <v-btn absolute dark fab top left color="pink" @click="add">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-tabs v-model="tabs" centered>
              <v-tab v-for="i in TabList" :key="i">{{i}}</v-tab>
            </v-tabs>
          </v-toolbar>
        </v-container>

        <v-tabs-items v-model="tabs">
          <v-tab-item v-for="i in task.length" :key="i">
            <v-btn large color="warning" @click="Delete(i-1)" v-if="task.length>1">
              <v-icon left>mdi-delete</v-icon>Delete
            </v-btn>
            <v-card style="margin-bottom:2em;">
              <v-card-title class="headline">Details</v-card-title>
              <v-divider />
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="task[i-1]['time-limit']"
                      clearable
                      label="Time Limit"
                      type="number"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="task[i-1]['memory-limit']"
                      clearable
                      label="Memory Limit"
                      type="number"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="task[i-1]['score']"
                      clearable
                      label="Score"
                      type="number"
                    />
                  </v-col>
                </v-row>
                <v-btn large color="primary" @click="save">
                  <v-icon left>mdi-book</v-icon>Save
                </v-btn>
              </v-container>
            </v-card>
            <v-card style="margin-bottom:2em;">
              <v-card-title class="headline">Upload TestCase</v-card-title>
              <v-divider />
              <v-container>
                <v-file-input
                  v-model="files[i-1]"
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
                <v-btn
                  large
                  color="primary"
                  @click="upload(files[i-1],'/'+task[i-1]['input-path']+'/');files[i-1]=[];"
                  :disabled="!files[i-1]||files[i-1].length===0"
                >
                  <v-icon left>mdi-book</v-icon>Upload Files
                </v-btn>
              </v-container>
            </v-card>
            <v-card style="margin-bottom:2em;">
              <v-card-title class="headline">TestCases</v-card-title>
              <v-divider />
              <div v-for="j in has[i-1]" :key="j.name">
                <v-row>
                  <v-col>
                    <v-card-text>{{j.name}}</v-card-text>
                  </v-col>
                  <v-col>
                    <v-btn large color="error" @click="remove('/'+String(i)+'/'+j.name)">
                      <v-icon left>mdi-delete</v-icon>Delete
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider />
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  components: {},
  data: () => ({
    type: "acm",
    type_list: ["acm", "oi"],

    judge_type: { state: 0, abbr: "Normail Judge" },
    judge_list: [
      { state: 0, abbr: "Normail Judge" },
      { state: 1, abbr: "Special Judge" },
      { state: 2, abbr: "Interactive Judge" }
    ],
    spj_source: [],
    spj: "",
    spj_has: [],

    tabs: null,
    TabList: [],
    task: [],

    has: [1],
    files: []
  }),
  mounted() {
    this.get_config();
  },
  watch: {
    has: {
      handler(val, oldVal) {
        console.log("from", oldVal);
        console.log("to", val);
      },
      immediate: true
    }
  },
  methods: {
    save() {
      this.axios
        .put(
          "v1/problem/" + String(this.$route.params.id) + "/problemfs/config",
          {
            config: {
              judge: {
                "judge-type": this.type,
                tasks: this.task
              },
              "special-judge": {
                enable: this.judge_type.state,
                "file-path": this.spj
              }
            }
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.get_config();
        });
    },
    add() {
      this.TabList.push("TASK" + String(this.TabList.length + 1));
      this.task.push({
        "time-limit": 1000,
        "memory-limit": 65536,
        score: 100,
        "input-path":
          "/" + this.$route.params.id + "/" + String(new Date().getTime()),
        "output-path":
          "/" + this.$route.params.id + "/" + String(new Date().getTime())
      });
      this.has.length = this.TabList.length;
      this.files.length = this.TabList.length;
      this.save();
    },
    get_config() {
      this.axios
        .get(
          "v1/problem/" + String(this.$route.params.id) + "/problemfs/config",
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.type = res.data.config.judge["judge-type"];
          this.judge_type = this.judge_list[
            res.data.config["special-judge"].enable
          ];
          this.task = res.data.config.judge.tasks;
          this.TabList = [];
          for (var i in this.task) {
            this.TabList.push("TASK" + String(Number(i) + 1));
          }
          this.has.length = this.TabList.length;
          this.files.length = this.TabList.length;
          this.update_test();
        });
    },
    Delete(i) {
      let jb = this.task[i]["input-path"];
      this.remove(jb);
      this.task.splice(i, 1);
      this.save();
    },
    remove(path) {
      console.log(path);
      this.axios
        .delete(
          "v1/problem/" +
            String(this.$route.params.id) +
            "/problemfs/rm?path=/" +
            String(path),
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.update_spj();
          this.update_test();
        });
    },
    update_single_test(i) {
      this.axios
        .get(
          "v1/problem/" +
            String(this.$route.params.id) +
            "/problemfs/ls?path=/" +
            this.task[i]["input-path"],
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.$set(this.has, i, res.data.result);
        });
    },
    update_spj() {
      this.axios
        .get(
          "v1/problem/" +
            String(this.$route.params.id) +
            "/problemfs/ls?path=/spj",
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.spj_has = res.data.result;
        });
    },
    update_test() {
      for (var i in this.TabList) {
        this.update_single_test(Number(i));
      }
    },
    upload(files, path) {
      if (files.length == 0) {
        return;
      }
      var formData = new FormData();
      files.forEach(function(file) {
        formData.append("upload", file, file.name);
      });
      formData.append("path", path);
      this.axios
        .post(
          "v1/problem/" + String(this.$route.params.id) + "/problemfs/writes",
          formData,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.Token
            }
          }
        )
        .then(res => {
          this.update_test();
          this.update_spj();
        });
    }
  }
};
</script>
<style>
</style>
