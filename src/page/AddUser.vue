<template>
  <v-container>
    <v-card>
      <hot-table
        stretchH="all"
        :data="data"
        fillHandle="horizontal"
        :rowHeaders="true"
        :colHeaders="header"
        licenseKey="non-commercial-and-evaluation"
        :columns="[
        {data: 'username'},
        {data: 'nickname'},
        {data: 'password'},
        {data: 'status',readOnly: true}]"
        :comments="true"
        :renderer=" function(hotInstance, TD, row, col, prop, value) {
          TD.textContent = value;
          if (prop === 'status') {
              if (typeof value === 'undefined' || value === null || value === '')
                  TD.style.background = '#ffffff';
              else if (value === 'added')
                  TD.style.background = '#aaffaa';
              else
                  TD.style.background = '#ffaaaa';
          }
      }"
        :contextMenu="{items: {
            row_above: {
              name: '上方插入一行'
            },
            row_below: {
              name: '下方插入一行'
            },
            remove_row: {
              name: '删除行'
            },
            copy: {
              name: '复制'
            },
            cut: {
              name: '剪切'
            },
          }
        }"
      ></hot-table>
      <v-row>
        <v-col>
          <v-btn large color="primary" @click="add">
            <v-icon left>mdi-book</v-icon>Add
          </v-btn>
        </v-col>
        <v-col>
          <v-btn large color="primary" @click="shrink">
            <v-icon left>mdi-book</v-icon>Shrink To Fit
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { HotTable } from "@handsontable/vue";
export default {
  data: function() {
    return {
      header: ["Username", "Nickname", "Password", "Status"],
      data: [{}]
    };
  },
  components: {
    HotTable
  },
  methods: {
    add() {},
    shrink() {}
  }
};
</script>

<style src="@/../node_modules/handsontable/dist/handsontable.full.css"></style>