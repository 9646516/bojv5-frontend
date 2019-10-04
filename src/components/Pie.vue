<template>
  <div id="__sbwyxdsmjb__" :style="'width: '+String(width)+'px;height: '+String(height)+'px;'" />
</template>
 
<script>
var echarts = require("echarts");

export default {
  props: {
    data: {
      type: Array,
      default: () => {}
    },
    color: {
      type: Array,
      default: () => {}
    },
    name: {
      type: String,
      default: "xjb"
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("__sbwyxdsmjb__"));

    myChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        textStyle: {
          fontSize: "16"
        }
      },
      color: this.color,
      series: [
        {
          name: this.name,
          type: "pie",
          selectedMode: "single",
          selectedOffset: 10,
          radius: ["40%", "57%"],
          center: "50%",
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              borderWidth: 3,
              borderColor: "#ffffff"
            }
          },
          label: {
            textStyle: {
              fontSize: "18",
              fontFamily: "monospace"
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                width: 2
              }
            }
          },
          data: this.data
        }
      ]
    });
  }
};
</script>
