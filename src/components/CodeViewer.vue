<template>
  <v-container fluid>
    <codemirror
      ref="editor"
      v-model="code"
      :options="{
      tabSize: 4,
      indentUnit: 4,
      mode: this.mode,
      theme: 'idea',
      lineNumbers: true,
      matchBrackets: true,
      styleActiveLine: true,
      readOnly: true
    }"
      class="code"
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
import "codemirror/theme/idea.css";
export default {
  components: {
    codemirror
  },
  props: {
    code: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "text/x-c++src"
    }
  }
};
</script>
<style>
.CodeMirror {
  height: 600px;
}
</style>

