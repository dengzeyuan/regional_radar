<template>
<div class="radra">
  <!-- 日期联动组件（宁家鲜生项目里） -->
  <!-- <curvspreDate class = 'topmgn' @change="datachange" :single="true"/> -->
  <div class="svgbg" v-loading="loading">
    <svg ref="svgs" :width="svgwidths" :height="svgheight"></svg>
  </div>
  <!-- 根据雷达图分区点击，查询对应的详细子类图标 -->
  <!-- <div class="partgarpha" v-for="(item,index) in graphelist" :key="index" >
      <h2>{{item.title}}</h2>
      <div class ='col-gruy'  v-loading="itemchild.loading"  v-for="(itemchild,childindex) in item.childlists" :key="childindex" v-show="itemchild.show">
        <h4>{{itemchild.title}}</h4>
        <div :id="itemchild.id" :style="{width:tabwidths,height: '300px'}"  v-loading="true" > </div>
      </div>
    </div> -->
</div>
</template>
<script>
// import srvicedataRada from "./servicedataRada.js";   //根据雷达图分区，查询详细子类图形
import drawRadar from "./drawRadar.js";
// import curvspreDate from "../../components/curvspreDate";      //日期联动组件

export default {
  components: {
    // curvspreDate
  },
  data() {
    return {
       loading:true,
      svgwidths: 0,
      svgheight: "600px",
      timedata:"",
      origin: "", //雷达图所需要的数据
      // graphelist: "" //获得展示列表数据
    };
  },
  computed: {
    tabwidths: function(e, t, a) {
      let w = 0;
      if (document.body.clientWidth > 750) {
        w =
          Math.round(
            document.body.clientWidth * 0.8 -
              document.body.clientWidth * 0.8 * 0.14
          ) - 10;
      } else {
        w = document.body.clientWidth - 10;
      }
      return w + "px";
    }
  },
  mounted() {
    this.$nextTick(function() {
      drawRadar(this.timedata, this); //雷达图数据加载完毕
    });
  },
  methods: {
    //日期改变事件
    // datachange: function(message) {
    //   this.time = message;
    // },
    initrada: function(data) {
      //雷达图数据回调函数
      this.origin = data; //复制给origin用来展示字列表
    },
    //雷达图分区的子类元素加载完毕，回调事件
    clickrada: function(datatype) {
      alert("初始化点击扇形事件")
      // this.graphelist = srvicedataRada(this.timedata, this, datatype);
    },
    //画柱形图
    drawbar(data) {
      // debugger
      // servicedata(id,title);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(data.id));
      // 绘制图表
      let option = {
        color: ["#03a8e0", "#99cc01"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        xAxis: {
          type: "category",
          data: data.xAxis
        },
        series: [
          {
            name: "当周",
            type: "bar",
            data: data.dataCurrentWeek
          }
        ]
      };

      myChart.setOption(option);
    },
    // 线图
    drawline(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(data.id));
      // 绘制图表
      let option = {
        color: ["#03a8e0", "#99cc01"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.xAxis
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "当周",
            type: "line",
            data: data.dataCurrentWeek
          }
        ]
      };
      myChart.setOption(option);
    },
    // 仪表盘
    drawpie(data, ley) {
      // debugger
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(data.id));
      // 绘制图表
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: [
          {
              splitNumber:5,
            radius: '80%',
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            title: {
              fontWeight: "bolder",
              fontSize: 12,
              fontStyle: "italic"
            },
            pointer: {
              length: "60%",
              width: "4"
            },
            startAngle: 180,
            endAngle: 0,
            max: data.max,
            // name: data.title,
            type: "gauge",
            detail: { formatter: data.dataCurrentWeek[0] },
            data: [{ value: data.dataCurrentWeek[0] }]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.grahpe {
  margin: 0 auto;
  background: #fff;
  margin-bottom: 10px;
}
.radra {
  width: 100%;
  background: #ddd;
  padding: 10px 0;
  .svgbg {
    box-sizing: border-box;
    background: #fff;
    margin: 10px 5px;
    border-radius: 4px;
    svg {
      // transform: scale(0.8);
      overflow: visible;
    }
  }
  .partgarpha {
    background: #fff;
    margin: 10px 5px;
    box-sizing: border-box;
    border-radius: 4px;
    h2 {
      padding-left: 20px;
      font-size: 20px;
      line-height: 60px;
    }
    .col-gruy {
      padding-bottom: 20px;
      h4 {
        font-size: 16px;
        font-weight: normal;
        padding-left: 20px;
        padding-top: 20px;
      }
    }
  }
}
.container {
  margin: 30px auto;
  width: 600px;
  height: 300px;
  border: 1px solid #000;
}

.areas {
  polygon {
    fill-opacity: 0.5;
    stroke-width: 3;
  }
  circle {
    fill: white;
    stroke-width: 3;
  }
}
.webs {
  polygon {
    fill: white;
    fill-opacity: 0.5;
    stroke: gray;
    stroke-dasharray: 10 5;
  }
}
</style>

