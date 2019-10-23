<template>
  <v-card>
    <v-container>
      <v-text-field v-model="title" clearable label="Title" type="text" />
      <div class="title">Description</div>
      <MarkdownWriter ref="md" />
      <div class="title">开始时间</div>
      <v-text-field
        :value="StartDate+' '+StartTime"
        label="Solo"
        solo
        readonly
        @click="dialog1=!dialog1"
      />
      <div class="title">结束时间</div>
      <v-text-field
        :value="EndDate+' '+EndTime"
        label="Solo"
        solo
        readonly
        @click="dialog2=!dialog2"
      />
      <div class="title">封榜时间</div>
      <v-text-field
        :value="FrozenDate+' '+FrozenTime"
        label="Solo"
        solo
        readonly
        @click="dialog3=!dialog3"
      />

      <v-dialog v-model="dialog1" width="700px">
        <v-card>
          <v-row align="center" justify="space-around">
            <div class="flex-col mt-4">
              <v-date-picker v-model="StartDate"></v-date-picker>
            </div>
            <div class="flex-col mt-4">
              <v-time-picker use-seconds v-model="StartTime"></v-time-picker>
            </div>
          </v-row>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="dialog1 = false">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" width="700px">
        <v-card>
          <v-row align="center" justify="space-around">
            <div class="flex-col mt-4">
              <v-date-picker v-model="EndDate"></v-date-picker>
            </div>
            <div class="flex-col mt-4">
              <v-time-picker use-seconds v-model="EndTime"></v-time-picker>
            </div>
          </v-row>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="dialog2 = false">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" width="700px">
        <v-card>
          <v-row align="center" justify="space-around">
            <div class="flex-col mt-4">
              <v-date-picker v-model="FrozenDate"></v-date-picker>
            </div>
            <div class="flex-col mt-4">
              <v-time-picker use-seconds v-model="FrozenTime"></v-time-picker>
            </div>
          </v-row>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="dialog3 = false">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="title">语言限制</div>
      <v-select v-model="selectedFruits" :items="fruits" multiple>
        <template v-slot:prepend-item>
          <v-list-item ripple @click="toggle">
            <v-list-item-action>
              <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Select All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>
      <div class="title">选择题目</div>
      <v-list-item>
        <v-btn @click="problemList.push(['',0])" color="primary" class="ml-2" icon>
          <v-icon>mdi-note-plus</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item v-for="i in problemList.length" :key="i">
        <v-btn @click="problemList.splice(i-1,1)" color="error" class="ml-2" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-text-field v-model="problemList[i-1][0]" class="ml-2" @change="gao($event,i-1)" />

        <v-list-item v-if="problemList[i-1][1]==0">
          <v-icon>mdi-emoticon-happy</v-icon>
          <v-list-item-title>{{problemList[i-1][2]}}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="problemList[i-1][1]==1">
          <v-progress-circular color="green" indeterminate />
        </v-list-item>
        <v-list-item v-if="problemList[i-1][1]==2">
          <v-icon>mdi-emoticon-sad</v-icon>
          <v-list-item-title>No Such Problem</v-list-item-title>
        </v-list-item>

        <v-list-item-title>{{problemList[i-1][3]}}</v-list-item-title>
      </v-list-item>

      <v-toolbar height="48" flat>
        <v-btn large color="primary" @click="submit">
          <v-icon left>mdi-target</v-icon>Submit
        </v-btn>
      </v-toolbar>
      <h2 style="color:red;">
        {{message}}
        <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
      </h2>
    </v-container>
  </v-card>
</template>
<script>
import Store from "@/plugins/store.js";
import MarkdownWriter from "@/components/MarkdownWriter";

export default {
  components: {
    MarkdownWriter
  },
  mounted() {
    this.axios
      .get("v1/contest/" + String(this.$route.params.id), {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Refresh_Token
        }
      })
      .then(res => {
        console.log(res);
      });
  },
  computed: {
    likesAllFruit() {
      return this.selectedFruits.length === this.fruits.length;
    },
    likesSomeFruit() {
      return this.selectedFruits.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    getStartDate() {
      return new Date(this.StartDate + " " + this.StartTime);
    },
    getEndDate() {
      return new Date(this.EndDate + " " + this.EndTime);
    },
    getFrozenDate() {
      return new Date(this.FrozenDate + " " + this.FrozenTime);
    }
  },
  data: () => ({
    title: "",
    StartDate: new Date().toISOString().substr(0, 10),
    StartTime: "00:00:00",
    EndDate: new Date().toISOString().substr(0, 10),
    EndTime: "00:00:00",
    FrozenDate: new Date().toISOString().substr(0, 10),
    FrozenTime: "00:00:00",
    dialog1: false,
    dialog2: false,
    dialog3: false,
    message: "",
    loading: false,
    fruits: ["G++", "GCC", "CLANG", "CLANG++", "PYTHON2", "PYTHON3", "RUST"],
    selectedFruits: ["G++"],
    problemList: [["", 0, "", ""]]
    /// uid , status , title ,info
  }),
  methods: {
    /// 0=> OK
    /// 1=> Searching....
    /// 2=> not found
    gao(a, idx) {
      this.problemList[idx][1] = 1;
      this.axios
        .get("/v1/problem/" + String(a), {
          headers: {
            Authorization: "Bearer " + this.$store.getters.Token
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.problemList[idx][2] = res.data.problem.title;
            this.$set(this.problemList[idx], 1, 0);
          } else {
            this.problemList[idx][2] = "";
            this.$set(this.problemList[idx], 1, 2);
          }
        });
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
    },
    submit() {
      if (this.check()) {
        this.loading = true;
        this.message = "Waiting for it...";
        this.axios
          .post(
            "/v1/contest",
            {
              title: String(this.title),
              description: String(this.$refs.md.doc),
              "start-at": this.getStartDate,
              "end-duration":
                this.getEndDate.getTime() - this.getStartDate.getTime(),
              "board-frozen-duration":
                this.getFrozenDate.getTime() - this.getStartDate.getTime()
            },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.Token
              }
            }
          )
          .then(res => {
            this.loading = false;
            this.message = res.data;
            if (res.data.code === 0) {
              for (var i in this.problemList) {
                this.upload(i, res.data.id);
              }
            }
          });
      }
    },
    upload(uid, cid) {
      let id = this.problemList[uid][0];
      if (id === null || id === "") {
        return;
      } else {
        this.axios
          .post(
            "/v1/contest/" + String(cid) + "/problem/" + String(id),
            {},
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.Token
              }
            }
          )
          .then(res => {
            console.log(res);
            this.$set(this.problemList[uid], 3, res.data);
          });
      }
    },
    check() {
      if (this.title == "") {
        this.message = "Title cannot be empty";
        return false;
      } else if (this.$refs.md.doc == "") {
        this.message = "Content cannot be empty";
        return false;
      } else if (this.getStartDate.getTime() >= this.getEndDate.getTime()) {
        this.message = "EndTime is illegal";
        return false;
      } else if (this.getStartDate.getTime() >= this.getFrozenDate.getTime()) {
        this.message = "FrozenTime is illegal";
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style>
</style>

 