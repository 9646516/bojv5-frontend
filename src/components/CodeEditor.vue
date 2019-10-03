<template>
  <v-container fluid>
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
    <codemirror
      ref="editor"
      v-model="code"
      :options="defaultOption"
      class="code"
      :key="(SelMode,SelTheme)"
    />
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
import "codemirror/keymap/sublime.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import { myhint } from "@/plugins/hint.js";
export default {
  components: {
    codemirror
  },
  data: () => ({
    SelMode: { state: "text/x-c++src", abbr: "G++", idx: 1 },
    ModeList: [
      { state: "text/x-csrc", abbr: "GCC", idx: 0 },
      { state: "text/x-c++src", abbr: "G++", idx: 1 },
      { state: "text/x-java", abbr: "JAVA", idx: 4 },
      { state: "text/x-python", abbr: "Python", idx: 6 },
      { state: "text/x-rustsrc", abbr: "Rust", idx: 7 }
    ],
    SelTheme: "monokai",
    ThemeList: ["monokai", "idea", "eclipse", "neo", "twilight"],
    code: ""
  }),
  created() {},
  mounted() {
    var editor = this.$refs.editor.codemirror;
    editor.on("cursorActivity", function() {
      editor.showHint();
    });
  },
  methods: {},
  computed: {
    defaultOption: function() {
      return {
        tabSize: 4,
        indentUnit: 4,
        mode: this.SelMode.state,
        theme: this.SelTheme,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keymap: "sublime",
        foldgutter: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ],
        lineWrapping: true,
        foldGutter: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        hintOptions: {
          hint: myhint,
          completeSingle: false,
          closeOnUnfocus: true,
          alignWithWord: true
        }
      };
    }
  }
};
</script>
<style>
.CodeMirror {
  height: 600px;
}
</style>

