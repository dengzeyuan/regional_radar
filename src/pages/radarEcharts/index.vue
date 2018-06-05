<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      let option = {
        radar: {
          z: 1,
          // scale:true,
          splitNumber: 3,
          shape: "circle",
          radius: "100%",
          // silent:true,
          triggerEvent: {
            // 组件类型，xAxis, yAxis, radiusAxis, angleAxis
            // // 对应组件类型都会有一个属性表示组件的 index，例如 xAxis 就是 xAxisIndex
            // componentType: string,
            // 未格式化过的刻度值, 点击刻度标签有效
            value: "0",
            // 坐标轴名称, 点击坐标轴名称有效
            name: "总销售"
          },
          indicator: [
            { name: "目标销", min: -40, max: 40, color: "black" },
            { name: "总销售", min: -40, max: 40, color: "black" },
            {
              name: "管理（Administration）",
              min: -40,
              max: 40,
              color: "black"
            },
            {
              name: "信息技术（Information Techology）",
              min: -40,
              max: 40,
              color: "black"
            },
            {
              name: "客服（Customer Support）",
              min: -40,
              max: 40,
              color: "black"
            },
            { name: "研发（Development）", min: -40, max: 40, color: "black" }
          ]
        },
        series: [
          {
            itemStyle: {
              borderWidth: 1,
              borderType: "solid",
              borderColor: "black"
            },
            name: "内圈",
            type: "pie",
            z: 1,
            hoverAnimation: false,
            radius: ["0", "50%"],
            label: {
              normal: {
                position: "inner",
                color: "black"
              }
            },
            color: "#fff",
            data: [
              { value: 3, name: "直达" },
              { value: 3, name: "营销广告" },
              { value: 3, name: "搜索引擎" }
            ]
          },

          {
            name: "外圈",
            type: "pie",
            z: 0,
            labelLine: {
              show: true
            },
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["0", "100%"],
            label: {
              normal: {
                position: "inner",
                color: "black"
              }
            },
            color: "#fff",
            data: [{ value: 6 }, { value: 3 }, { value: 1 }]
          },
          {
            type: "radar",
            data: [
              {
                value: [0, 0, 0, 0, 0, 0]
              }
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>

