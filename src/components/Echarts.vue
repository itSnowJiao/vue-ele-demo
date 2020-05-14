<template>
  <div ref="myChart" id="chart" :style="{width: chartWidth, height: chartHeight}"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["chartData", "chartType"],
  data() {
    return {
      chartWidth: "",
      chartHeight: ""
    };
  },
  created() {
    this.initWidthAndHeight();
  },
  methods: {
    //  图表生成宽度和高度
    initWidthAndHeight() {
      this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
      this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
    },
    // 绘制折线图
    initLineOption() {
      return {
        title: {
          text: "line折线图",
          subtext: "折线图",
          x: "center"
        },
        xAxis: {
          type: "category",
          data: this.chartData.xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.chartData.yAxisData,
            type: "line",
            smooth: true
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        }
      };
    },
    // 绘制柱状图
    initBarOption() {
      return {
        title: {
          text: "bar柱状图",
          subtext: "柱状图",
          x: "center"
        },
        xAxis: {
          type: "category",
          data: this.chartData.xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.chartData.yAxisData,
            type: "bar",
            barWidth: "20%"
          }
        ],
        color: ["#339897"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        }
        // grid: {
        //     left: '30%',
        //     right: '40%',
        //     bottom: '50%'
        // }
      };
    },
    // 绘制饼图
    initPieOption() {
      // 处理数据
      let pieData = [];
      for (const index in this.chartData.xAxisData) {
        pieData.push({
          value: this.chartData.yAxisData[index],
          name: this.chartData.xAxisData[index]
        });
      }
      return {
        title: {
          text: "pie饼图",
          subtext: "饼图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: 10,
          top: 20,
          bottom: 20,
          data: this.chartData.xAxisData
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    drawChart() {
      // 实例echarts对象
      let chart = echarts.init(this.$refs.myChart);
      // 判断是否为undefined
      if (chart == undefined) {
        this.$message({
          message: "图表未实例化",
          type: "success"
        });
        return;
      }
      // 判断图表类型
      switch (this.chartType) {
        case "line":
          chart.setOption(this.initLineOption());
          break;
        case "bar":
          chart.setOption(this.initBarOption());
          break;
        case "pie":
          chart.setOption(this.initPieOption());
          break;
        default:
          this.$message({
            message: `${this.chartType}不合法`,
            type: "success"
          });
          break;
      }
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="scss" scoped>
</style>