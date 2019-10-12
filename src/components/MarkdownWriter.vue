<template>
  <mavon-editor ref="md" v-model="doc" @imgAdd="$imgAdd"></mavon-editor>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: { mavonEditor },
  data() {
    return {
      doc: ""
    };
  },
  methods: {
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "server url",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        $vm.$img2Url(pos, url);
      });
    }
  }
};
</script>
