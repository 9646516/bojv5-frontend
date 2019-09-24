<template>
  <v-container fluid>
    <codemirror v-model="code" :options="defaultOption" class="code" :key="(SelMode,ThemeList)" />
    <v-row align="center">
      <v-col>
        <v-subheader>Custom Theme</v-subheader>
      </v-col>
      <v-col>
        <v-select v-model="SelTheme" :items="ThemeList" />
      </v-col>
      <v-col>
        <v-subheader>Custom Language</v-subheader>
      </v-col>
      <v-col>
        <v-select
          v-model="SelMode"
          :items="ModeList"
          item-text="abbr"
          item-value="status"
          return-object
        />
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/go/go.js";
import "codemirror/mode/rust/rust.js";
import "codemirror/mode/python/python.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/twilight.css";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
export default {
  components: {
    codemirror
  },
  data: () => ({
    SelMode: { state: "text/x-csrc", abbr: "GNU" },
    ModeList: [
      { state: "text/x-csrc", abbr: "GNU" },
      { state: "text/x-c++src", abbr: "G++" },
      { state: "text/x-java", abbr: "JAVA" },
      { state: "text/x-go", abbr: "Go" },
      { state: "text/x-python", abbr: "Python" },
      { state: "text/x-cython", abbr: "Cython" },
      { state: "text/x-rustsrc", abbr: "Rust" }
    ],
    SelTheme: "monokai",
    ThemeList: ["monokai", "idea", "eclipse", "neo", "twilight"],
    code:
      "#include<bits/stdc++.h>\nusing namespace std;\nvoid main(){\n\treturn 0;\n}"
  }),
  created() {},
  methods: {},
  computed: {
    defaultOption: function() {
      return {
        tabSize: 2,
        mode: this.SelMode.state,
        theme: this.SelTheme,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldgutter: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ],
        lineWrapping: true,
        foldGutter: true,
        matchBrackets: true,
        autoCloseBrackets: true
      };
    }
  }
};
</script>
<style>
</style>

