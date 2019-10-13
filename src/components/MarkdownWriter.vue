<template>
  <editor v-model="doc" previewStyle="vertical" mode="markdown" :options="conf" height="600px" />
</template>
<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import { Editor } from "@toast-ui/vue-editor";
export default {
  components: {
    editor: Editor
  },
  data() {
    return {
      doc: "",
      conf: {
        language: "zh_CN",
        previewDelayTime: "50"
      }
    };
  }
};
</script>