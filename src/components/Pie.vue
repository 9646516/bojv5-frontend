<template>
  <div>
    <div id="__sbwyxdsmjb__" :style="'width: '+String(width)+'px;height: '+String(height)+'px;'" />
  </div>
</template>
 
<script>
var echarts = require("echarts");

export default {
  props: {
    data1: {
      type: Array,
      default: () => {}
    },
    name: {
      type: String,
      default: "xjb"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data: () => ({
    data: [
      {
        value: 335,
        name: "直接访问"
      },
      {
        value: 310,
        name: "邮件营销"
      },
      {
        value: 234,
        name: "联盟广告"
      },
      {
        value: 135,
        name: "视频广告"
      },
      {
        value: 1548,
        name: "搜索引擎"
      }
    ]
  }),
  mounted() {
    var myChart = echarts.init(document.getElementById("__sbwyxdsmjb__"));
    myChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },

      series: [
        {
          name: this.name,
          type: "pie",
          selectedMode: "single",
          selectedOffset: 10,
          radius: ["40%", "60%"],
          avoidLabelOverlap: true,
          itemStyle: {
            normal: {
              borderWidth: 4,
              borderColor: "#ffffff"
            },
            emphasis: {
              shadowBlur: 6,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: this.data
        }
      ]
    });
  }
};
</script>
